import React from 'react';
import { View } from 'react-native';
import AppleAuth from './authentication/AppleAuth';
import Form from './authentication/Form';
import GoogleAuth from './authentication/GoogleAuth';

const Home = () => {

    // useEffect(() => {
    //     if(userInfo !== null) {
    //        // need to navigate to Dashboard screen
    //     }
    // }, [ userInfo]);

    return (
        <View style = {{flex:1}}>
            <GoogleAuth />
            {/* <AppleAuth /> */}
            <Form />
        </View>
    )
};

export default Home;