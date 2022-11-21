import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import AppleAuth from './authentication/AppleAuth';
import Form from './authentication/LoginForm';
import GoogleAuth from './authentication/GoogleAuth';

const Home = () => {

    // useEffect(() => {
    //     if(userInfo !== null) {
    //        // need to navigate to Dashboard screen
    //     }
    // }, [ userInfo]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                <GoogleAuth />
                {/* <AppleAuth /> */}
                <Form />
            </View>
        </KeyboardAvoidingView>
    )
};

export default Home;