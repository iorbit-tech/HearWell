import React, { useEffect, useRef } from 'react';
import { View, Text, Platform, Alert } from 'react-native';
import { Form, Field } from 'react-final-form';
import { required, email, length } from 'redux-form-validators';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Input from '../../Components/Field/Input';
import SubmitButton from '../../Components/SubmitButton';
import { setToken, submitLogin } from '../../actions';
import { FORGOT_PASSWORD, LOGIN, NEW_ACCOUNT, NEW_USER, PASSWORD, USER_NAME } from '../../Constants/appconstants';
import { showToast } from '../../Components/utils';
import { get } from 'lodash';

const LoginForm = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.user);
    const isInitialMount = useRef(true);
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzNmY0ZTdiYWFkYzBjMWVhY2ViMjcxMSIsInVzZXJOYW1lIjoicmFodWwiLCJwYXNzd29yZCI6IiQyYiQxMCRqSjFwbDNvOExndFUxTHl3ME03R21lMlpZMWZsSThTMzlyR0toeURMakdjN3M1a1pmQkw2NiIsInVzZXJUeXBlIjoidXNlciIsInN0YXR1cyI6dHJ1ZSwiZmlyc3ROYW1lIjoiUmFodWwiLCJsYXN0TmFtZSI6IktpbmciLCJkb2IiOiIxNC0xMi0xOTk1IiwiZ2VuZGVyIjoibWFsZSIsIm1hcml0YWxTdGF0dXMiOiJzaW5nbGUiLCJhZGRyZXNzMSI6ImFkcmVzcyBsaW5lIDEiLCJhZGRyZXNzMiI6ImFkcmVzcyBsaW5lIDIiLCJjaXR5IjoiVHJpdmFuZHJ1bSIsImNvdW50cnkiOiJJbmRpYSIsInppcCI6IjY5NTU3MSIsImVtYWlsIjoicmFodWxAZ2FtYWlsLmNvbSIsInBob25lIjoiMzQ1NDMzNDU1NDM0IiwidXNlcklkIjoiOGU2NTQ3YjMtNDNkOC00MzVlLWFlNzAtNGI4ZmFjZmQ4MzhkIiwiY3JlYXRlZEF0IjoiMjAyMi0xMS0xMlQwNzo0Mjo1MS4zODJaIiwidXBkYXRlZEF0IjoiMjAyMi0xMS0xNFQxMDozNzowMy4wODBaIiwiX192IjowfSwiaWF0IjoxNjY5MTAyOTY2fQ.zNKdeEbuxC7vZZRDZZdVaUvWqXGt_wxtHxW-PYQqaUA'

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
                navigation.navigate('Dashboard');
                dispatch(setToken(token));
            }
            else if (get(data, 'code') == 'ERR_BAD_REQUEST') {
                showToast(get(data, 'response.data.message'));
                Alert.alert(
                    "LOGIN FAILED",
                    get(data, 'response.data.message')
                )
                console.log(get(data, 'response.data.message'))
            }
        }

    }, [data]);

    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    return (
        <View style={{ alignItems: 'center', backgroundColor: '#fff', }}>
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
                            secureTextEntry={true}
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
                        <View style={{ flexDirection: 'row', alignSelf: 'center', top: 20 }}>
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
            <SubmitButton
                text='Need to revert'
                textStyle={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
                submit={() => navigation.navigate('Dashboard')}
            >
            </SubmitButton>
        </View>
    )
};

export default LoginForm;