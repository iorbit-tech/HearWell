import React from 'react';
import { View } from 'react-native';
import AppleAuth from './authentication/AppleAuth';
import GoogleAuth from './authentication/GoogleAuth';

const Home = () => {
    return (
        <View style = {{flex:1}}>
            <GoogleAuth />
            <AppleAuth />
        </View>
    )
};

export default Home;