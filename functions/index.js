const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotifications = functions.database
  .ref('/messages/{messageId}')
    .onWrite(change => {
      // Exit early if event triggered by delete or update (has a before value)
      if (change.before.exists() || !change.after.exists() ) {
        console.log('Message edited or deleted - skip');
        return;
      }
      // Get current document
      const message = change.after.val();

      // Define payload
      const payload = {
        notification: {
          title: `${message.author}`,
          body: `${message.msg}`,
          icon: '/assets/icon.png',
          click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com`
        }
      };

      // Get a one-time lookup of all tokens
      return admin.database()
        .ref('/fcmTokens')
        .once('value')
          .then(allTokens => {
            const tokens = [];
            // Filter tokens to get those not belonging to message author
            if (allTokens.val()) {
              for (let fcmTokenKey in allTokens.val()) {
                const fcmToken = allTokens.val()[fcmTokenKey];
                if (fcmToken.user_id !== message.user_id) {
                  tokens.push(fcmToken.token);
                }
              }
            }
            // Send notification to devices
            if (tokens.length > 0) {
              return admin
                .messaging()
                .sendToDevice(tokens, payload)
                .then(response => {
                  // Remove tokens that are invalid or unregistered from db
                  const tokensToRemove = [];

                  response.results.forEach((result, index) => {
                    const error = result.error;
                    if(error) {
                      console.error(`Failed to send notification to ${tokens[index]}: ${error}`);

                      if(error.code === 'messaging/invalid-registration-token' || error.code === 'messaging/registration-token-not-registered') {
                        tokensToRemove.push(allTokens.ref.child(tokens[index])).remove();
                      }
                    }
                  });
                  return Promise.all(tokensToRemove);
                });
            }
            throw new Error('No tokens found');
          });
    });
