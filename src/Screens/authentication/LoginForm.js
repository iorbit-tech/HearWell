import React, { useEffect, useRef } from 'react';
import { View, Text, Platform, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Form, Field } from 'react-final-form';
import { required, email, length } from 'redux-form-validators';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { get } from 'lodash';

import Input from '../../Components/Field/Input';
import SubmitButton from '../../Components/SubmitButton';
import { checkRegistered, setToken, setUser, submitLogin } from '../../actions';
import { FORGOT_PASSWORD, LOGIN, NEW_ACCOUNT, NEW_USER, PASSWORD, USER_NAME } from '../../Constants/appconstants';
import { showToast } from '../../Components/utils';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginForm = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.user);
    const isInitialMount = useRef(true);

    const submit = value => {
        dispatch(submitLogin(value));
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (get(data, 'message') == 'Authentication Success') {
                showToast('Logged In Successfully!');
                Alert.alert(
                    "LOGIN SUCCESS",
                    "Logged In Successfully!",
                )
                dispatch(setToken(get(data, 'token'), (get(data.user, 'userId'))));
                dispatch(checkRegistered("REGISTERED"));
            }
            else if (get(data, 'code') == 'ERR_BAD_REQUEST') {
                showToast(get(data, 'response.data.message'));
                Alert.alert(
                    "LOGIN FAILED",
                    get(data, 'response.data.message')
                )
                // navigation.navigate('Register');
                console.log("USER Exist", get(data, 'response.data.message'))
            }
        }

    }, [data]);

    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ alignItems: 'center', backgroundColor: '#fff' }}>
                <Form onSubmit={submit}
                    render={({ handleSubmit, invalid }) => (
                        <View>
                            <Field
                                name='email'
                                label="Email *"
                                validate={composeValidators(required(), email())}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={USER_NAME}
                            />
                            <Field
                                name='password'
                                label="Password *"
                                // validate={composeValidators(required(), length({ min: 8 }))}
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={PASSWORD}
                                righticon={true}
                                isSecure={true}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#000', marginLeft: 10, opacity: invalid !== true ? 1 : 0.5, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                                    <SubmitButton
                                        disabled={invalid == true && true}
                                        submit={handleSubmit}
                                        text={LOGIN}
                                        textStyle={{ color: '#fff' }}
                                    />
                                </View>
                                <View style={{ position: 'absolute', right: 10 }}>
                                    <SubmitButton
                                        text={FORGOT_PASSWORD}
                                        textStyle={{ textDecorationLine: 'underline', fontWeight: '400' }}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
                                <Text>{NEW_ACCOUNT}</Text>
                                <SubmitButton
                                    text={NEW_USER}
                                    textStyle={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
                                    submit={() => navigation.navigate('Register')}
                                >
                                </SubmitButton>
                            </View>
                        </View>
                    )
                    }
                />
            </ScrollView>
        </SafeAreaView>
    )
};

export default LoginForm;