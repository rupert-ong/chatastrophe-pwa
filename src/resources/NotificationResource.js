export default class NotificationResource {
  constructor(messaging) {
    this.messaging = messaging;
    
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

    // Log device token
    this.messaging.getToken()
      .then(res => {
        console.log(res);
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
    // Look for existing token
    // If it exists, replace it
    // If not, create a new one
  }
}