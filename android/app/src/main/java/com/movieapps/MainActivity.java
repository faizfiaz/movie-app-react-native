package com.movieapps;

import com.facebook.react.ReactActivity;
import in.sriraman.sharedpreferences.RNSharedPreferencesReactPackage;
import com.xebia.reactnative.TabLayoutPackage;
import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import in.sriraman.sharedpreferences.RNSharedPreferencesReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MovieApps";
    }

    //  @Override
    // protected List<ReactPackage> getPackages() {
    //     return Arrays.<ReactPackage>asList(
    //         new MainReactPackage(),
	// 		new RNSharedPreferencesReactPackage(),
    //         new ImagePickerPackage() 
    //     );
    // }
}
