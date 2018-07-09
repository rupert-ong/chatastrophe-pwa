export default class NotificationResource {
  allTokens = [];
  tokensLoaded = false;
  user = null;

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

    // Listen to all updates to firebase store /fcmTokens
    this.database
      .ref('/fcmTokens')
      .on('value', snapshot => {
        // Get all tokens
        this.allTokens = snapshot.val();
        this.tokensLoaded = true;
        console.log(this.allTokens, this.tokensLoaded);
      });
  };

  // Listener for token changes (a new token is generated)
  setupTokenRefresh() {
    this.messaging.onTokenRefresh(() => {
      this.saveTokenToServer();
    })
  };

  saveTokenToServer() {
    // Get token
    this.messaging.getToken().then(res => {
      console.log('Device token: ', res, 'Tokens loaded: ', this.tokensLoaded);
      if (this.tokensLoaded) {
        // Look for existing token
        const existingToken = this.findExistingToken(res);
        // If it exists, replace it
        if (existingToken) {
          console.log('Replace existing token: ', res);
          this.database
            .ref(`/fcmTokens/${existingToken}`)
            .set({
              token: res,
              user_id: this.user.uid
            });
        // If not, create a new one
        } else {
          this.registerToken(res);
          console.log('Saving new token to store');
        }
      }
    });
  }

  findExistingToken(tokenToSave) {
    for (let tokenKey in this.allTokens) {
      const token = this.allTokens[tokenKey].token;
      console.log('find existing token check for', token);
      if (token === tokenToSave) {
        return tokenKey;
      }
    }
    return false;
  }

  // Save token key and user id to store
  registerToken(token) {
    this.database
      .ref('fcmTokens/')
        .push({
          token: token,
          user_id: this.user.uid
        });
  }

  changeUser(user) {
    console.log('changeUser called');
    this.user = user;
    this.saveTokenToServer();
  }
}