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
  }
}