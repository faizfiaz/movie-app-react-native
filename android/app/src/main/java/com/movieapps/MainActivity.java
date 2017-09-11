package com.movieapps;

import com.facebook.react.ReactActivity;
import in.sriraman.sharedpreferences.RNSharedPreferencesReactPackage;
import com.xebia.reactnative.TabLayoutPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MovieApps";
    }

     @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
			new RNSharedPreferencesReactPackage()
        );
    }
}
