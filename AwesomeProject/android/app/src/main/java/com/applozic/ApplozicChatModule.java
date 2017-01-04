
package com.applozic;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import com.applozic.mobicomkit.api.account.register.RegistrationResponse;
import com.applozic.mobicomkit.api.account.user.MobiComUserPreference;
import com.applozic.mobicomkit.api.account.user.User;
import com.applozic.mobicomkit.api.account.user.UserClientService;
import com.applozic.mobicomkit.api.account.user.UserLoginTask;
import com.applozic.mobicomkit.api.conversation.database.MessageDatabaseService;
import com.applozic.mobicomkit.uiwidgets.conversation.ConversationUIService;
import com.applozic.mobicomkit.uiwidgets.conversation.activity.ConversationActivity;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;


public class ApplozicChatModule extends ReactContextBaseJavaModule implements ActivityEventListener {

public ApplozicChatModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
}

@Override
public String getName() {
        return "ApplozicChat";
}

@ReactMethod
public void login(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
                cancelCallback.invoke("Activity doesn't exist");
                return;
        }

        UserLoginTask.TaskListener listener = new UserLoginTask.TaskListener() {

                @Override
                public void onSuccess(RegistrationResponse registrationResponse, Context context) {
                        //After successful registration with Applozic server the callback will come here
                        successCallback.invoke("success");
                }

                @Override
                public void onFailure(RegistrationResponse registrationResponse, Exception exception) {
                        //If any failure in registration the callback  will come here
                        cancelCallback.invoke("failure");

                }
        };

        User user = new User();
        user.setUserId(config.getString("userId")); //userId it can be any unique user identifier
        user.setDisplayName(config.getString("displayName")); //displayName is the name of the user which will be shown in chat messages
        user.setEmail(config.getString("email")); //optional
        user.setAuthenticationTypeId(User.AuthenticationType.APPLOZIC.getValue());  //User.AuthenticationType.APPLOZIC.getValue() for password verification from Applozic server and User.AuthenticationType.CLIENT.getValue() for access Token verification from your server set access token as password
        user.setPassword(config.getString("password")); //optional, leave it blank for testing purpose, read this if you want to add additional security by verifying password from your server https://www.applozic.com/docs/configuration.html#access-token-url
        user.setImageLink("");//optional,pass your image link
        user.setApplicationId("applozic-sample-app");
        new UserLoginTask(user, listener, currentActivity).execute((Void) null);

}

@ReactMethod
public void openChat(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
                cancelCallback.invoke("Activity doesn't exist");
                return;
        }

        Intent intent = new Intent(currentActivity, ConversationActivity.class);
        currentActivity.startActivity(intent);
}

@ReactMethod
public void initiateChat(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
                cancelCallback.invoke("Activity doesn't exist");
                return;
        }

        Intent intent = new Intent(currentActivity, ConversationActivity.class);
        if (config != null && config.hasKey("userId")) {
                intent.putExtra(ConversationUIService.USER_ID, config.getString("userId"));
        }
        if (config != null && config.hasKey("displayName")) {
                intent.putExtra(ConversationUIService.DISPLAY_NAME, config.getString("displayName")); //put it for displaying the title.
        }
        currentActivity.startActivity(intent);
}

@ReactMethod
public void logoutUser(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
                cancelCallback.invoke("Activity doesn't exist");
                return;
        }

        new UserClientService(currentActivity).logout();
        successCallback.invoke("true");
}

@ReactMethod
public void contactUnreadCount(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
                cancelCallback.invoke("Activity doesn't exist");
                return;
        }
        if (config != null && config.hasKey("userId")) {
                int contactUnreadCount = new MessageDatabaseService(currentActivity).getUnreadMessageCountForContact(config.getString("userId"));
                successCallback.invoke(contactUnreadCount);
        }
}

@ReactMethod
public void channelUnreadCount(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
                cancelCallback.invoke("Activity doesn't exist");
                return;
        }
        if (config != null && config.hasKey("channelKey")) {
                int channelUnreadCount = new MessageDatabaseService(currentActivity).getUnreadMessageCountForChannel((Integer.parseInt(config.getString("channelKey"))));
                successCallback.invoke(channelUnreadCount);
        }
}

@ReactMethod
public void totalUnreadCount(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
                cancelCallback.invoke("Activity doesn't exist");
                return;
        }
        if (config != null) {
                int totalUnreadCount = new MessageDatabaseService(currentActivity).getTotalUnreadCount();
                successCallback.invoke(totalUnreadCount);
        }
}

@ReactMethod
public void isUserLogIn(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
        Activity currentActivity = getCurrentActivity();
        MobiComUserPreference mobiComUserPreference=MobiComUserPreference.getInstance(currentActivity);
        successCallback.invoke(mobiComUserPreference.isLoggedIn());
}

@Override
public void onActivityResult(Activity activity, final int requestCode, final int resultCode, final Intent intent) {
}

@Override
public void onNewIntent(Intent intent) {
}

}
