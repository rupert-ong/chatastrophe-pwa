export default class NotificationResource {
  allTokens = [];
  tokensLoaded = false;

  constructor(messaging, database) {
    this.messaging = messaging;
    this.database = database;

    // Firebase messaging: Request permission for notifications
    try {
      this.messaging
        .requestPermission()
        .then(res => {
          console.log('Permission granted');
        })
        .catch(err => {
          console.log('No access', err);
        });
    } catch (err) {
      console.log('No notification support.', err);
    }

    this.setupTokenRefresh();

    // Create DB for device tokens
    this.database
      .ref('/fcmTokens')
      .on('value', snapshot => {
        this.allTokens = snapshot.val();
        this.tokensLoaded = true;
        console.log(this.allTokens);
      });
  };

  // Listener for token changes
  setupTokenRefresh() {
    this.messaging.onTokenRefresh(() => {
      this.saveTokenToServer();
    })
  };

  saveTokenToServer() {
    // Get token
    this.messaging.getToken().then(res => {
      console.log('Device token: ', res);
      if (this.tokensLoaded) {
        // Look for existing token
        const existingToken = this.findExistingToken(res);
        // If it exists, replace it
        if (existingToken) {

          // If not, create a new one
        } else {

        }
      }
    });
  }

  findExistingToken(tokenToSave) {
    for (let tokenKey in this.allTokens) {
      const token = this.allTokens[tokenKey].token;
      if (token === tokenToSave) {
        return tokenKey;
      }
    }
    return false;
  }
}