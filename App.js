import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';

import Home from './src/Screens/Home';
import Register from './src/Screens/authentication/Register';
import Dashboard from './src/Screens/Dashboard';
import TellUs from './src/Screens/TellUs';
import Survey from './src/Screens/TellUs/Survey';
import Chat from './src/Screens/Chat';
import Profile from './src/Screens/Profile';
import HearingDetails from './src/Screens/Profile/HearingDetails';
import HearingDiary from './src/Screens/Hearing Diary';
import DiaryQuestions from './src/Screens/Hearing Diary/DiaryQuestions';
import { checkRegistered, setToken } from './src/actions';
import { USER, USER_TOKEN } from './src/Constants/appconstants';

import { ThemeContext } from './src/themes/theme-context';
import { ThemeColors } from './src/themes';

const Stack = createNativeStackNavigator();

const App = () => {
  const { isRegistered } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    NetInfo.addEventListener(handleConnectivityChange);
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });

    RNSecureKeyStore.get(USER_TOKEN).then(
      (accessToken) => {
        if (accessToken) {
          RNSecureKeyStore.get(USER).then(
            (userdetails) => {
              dispatch(setToken(accessToken, userdetails));
              dispatch(checkRegistered("REGISTERED"));
            }
          )
        }
      },
      (err) => {
        dispatch(checkRegistered("NOT_REGISTERED "));
      }
    );
  }, []);

  const handleConnectivityChange = (state) => {
    if (state.isConnected == true) {
      console.log("Connected to Internet");
    }
    else {
      Alert.alert(
        "No Internet Connection",
        "Please check your network connection!",
        [
          {
            text: "Cancel"
          },
          { text: "OK" }
        ]
      );
    };
  }

  return (
    <ThemeContext.Provider value={ThemeColors()}>
      <NavigationContainer>
        <Stack.Navigator>
          {isRegistered === "REGISTERED" ?
            (
              <>
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Tell us more" component={TellUs} />
                <Stack.Screen name="Hearing test" component={Survey} />
                <Stack.Screen name="Ask us" component={Chat} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Hearing aid details" component={HearingDetails} />
                <Stack.Screen name="Hearing Diary" component={HearingDiary} />
                <Stack.Screen name="Diary Questions" component={DiaryQuestions} />
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Register" component={Register} />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default App;
