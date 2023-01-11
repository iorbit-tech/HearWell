import React, { useContext } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import AppleAuth from './authentication/AppleAuth';
import Form from './authentication/LoginForm';
import GoogleAuth from './authentication/GoogleAuth';
import { ThemeContext } from "../themes/theme-context";

const Home = () => {
    const theme = useContext(ThemeContext);
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'} style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: theme.blackColor, justifyContent: 'center' }}>
                <GoogleAuth />
                {/* <AppleAuth /> */}
                <Form />
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default Home;