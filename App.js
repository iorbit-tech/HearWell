import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";

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
import { USER_TOKEN } from './src/Constants/appconstants';


const Stack = createNativeStackNavigator();

const App = () => {
  const { isRegistered } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    RNSecureKeyStore.get(USER_TOKEN).then(
      (accessToken) => {
        if (accessToken) {
          dispatch(setToken(accessToken));
          dispatch(checkRegistered("REGISTERED"));
        }
      },
      (err) => {
        dispatch(checkRegistered("NOT_REGISTERED "));
      }
    );
  }, []);

  return (
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
  );
};

export default App;
