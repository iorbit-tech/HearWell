import React, { useState, useEffect } from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Import Google Signin
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Dashboard from '../Dashboard';
// import { Form, Field } from 'react-final-form';
// import { required, email, length } from 'redux-form-validators';
// import { appleAuth, appleAuthAndroid, AppleButton } from '@invertase/react-native-apple-authentication';
// import AppleLogo from './assets/apple-logo.png'
// import Input from './components/Field/input';
// import SubmitButton from './components/SubmitButton';

const GoogleAuth = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      //   scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: '74675969131-094ovgkc4o2qvqk8rh2t8datpm6rto4a.apps.googleusercontent.com',
    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);

  // need to handle in Home Screen
  useEffect(() => {
    if (userInfo !== null) {
      console.log('LoggedIn');
    }
  }, [userInfo]);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  if (gettingLoginStatus) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.container}>
            {/* {
              (
                // <>
                //   <Image
                //     source={{uri: userInfo.user.photo}}
                //     style={styles.imageStyle}
                //   />
                //   <Text style={styles.text}>
                //     Name: {userInfo.user.name}
                //   </Text>
                //   <Text style={styles.text}>
                //     Email: {userInfo.user.email}
                //   </Text>
                //   <TouchableOpacity
                //     style={styles.buttonStyle}
                //     onPress={_signOut}>
                //     <Text>Logout</Text>
                //   </TouchableOpacity>

                //   <TouchableOpacity
                //     style={styles.buttonStyle}
                //     onPress={_signOut}>
                //     <Text>Logout</Text>
                //   </TouchableOpacity>           
                // </>
                <View>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={_signOut}>
                    <Text>Logout</Text>
                  </TouchableOpacity>
                  <Dashboard />
                </View>
              )} */}

            <GoogleSigninButton
              style={{ width: 250, height: 48, marginBottom: 10 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={_signIn}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={_signOut}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default GoogleAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});