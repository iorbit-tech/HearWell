import React from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import AppleAuth from './authentication/AppleAuth';
import Form from './authentication/LoginForm';
import GoogleAuth from './authentication/GoogleAuth';

const Home = () => {

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
            <GoogleAuth />
            {/* <AppleAuth /> */}
            <Form />
        </ScrollView>
    )
};

export default Home;