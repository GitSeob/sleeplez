package com.pro;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.emekalites.react.alarm.notification.ANPackage;
import com.sensors.RNSensorsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import pro.equinoxstudio.react_native_alarm_clock.RNAlarmClockPackage;
import com.calendarevents.CalendarEventsPackage;
import com.horcrux.svg.SvgPackage;
import com.wheelpicker.WheelPickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
//import com.oblador.vectoricons.VectorIconsPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ANPackage(),
            new RNSensorsPackage(),
            new ReactNativePushNotificationPackage(),
            new RNFirebasePackage(),
            new RNAlarmClockPackage(),
            new CalendarEventsPackage(),
            new SvgPackage(),
            new WheelPickerPackage(),
            new RNFirebaseMessagingPackage()
          //new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    String id = "12345";					// The id of the channel. 
    CharSequence name = "sleeplz";			// The user-visible name of the channel. 
    String description = "sleeplz";	// The user-visible description of the channel. 
 
  }
}
