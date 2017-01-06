package com.applozic;

import com.applozic.mobicomkit.api.notification.MobiComPushReceiver;
import com.evollu.react.fcm.MessagingService;
import com.google.firebase.messaging.RemoteMessage;

/**
 * Created by akshat on 06-Jan-17.
 */

public class ApplozicMessagingService extends MessagingService {
public void onMessageReceived(RemoteMessage remoteMessage){
        if (MobiComPushReceiver.isMobiComPushNotification(remoteMessage.getData())) {
                MobiComPushReceiver.processMessageAsync(this, remoteMessage.getData());
                return;
        }
        super.onMessageReceived(remoteMessage);
}
}
