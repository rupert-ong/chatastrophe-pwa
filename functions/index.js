const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// Listen for onWrite (new message) events of messages store
exports.sendNotifications = functions.database
  .ref('/messages/{messageId}')
  .onWrite(event => {
    const snapshot = event.data;

    // No support for updated/edited messages
    if (snapshot.previous.val()) {
      return;
    }

    // Notification object
    const payload = {
      notification: {
        title: `${snapshot.val().author}`,
        body: `${snapshot.val().msg}`,
        icon: 'assets/icon.png',
        click_action: `https://${functions.config().firebase.authDomain}`
      }
    }
  });