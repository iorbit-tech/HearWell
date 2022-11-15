import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Form, Field } from 'react-final-form';
import { required, email, length } from 'redux-form-validators';

import Input from '../../Components/Field/Input';
import SubmitButton from '../../Components/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import { submitLogin } from '../../actions';
import { FORGOT_PASSWORD, LOGIN, NEW_ACCOUNT, NEW_USER, PASSWORD, USER_NAME } from '../../Constants/appconstants';

const LoginForm = () => {

    const navigation = useNavigation();

    const submit = value => {
        console.log(value, 'value');
        if (Platform.OS == 'ios') {
            navigation.navigate('Dashboard');
        }
        submitLogin(value)
    }

    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    return (
        <View style={{ alignItems: 'center', backgroundColor: '#fff', }}>
            <Form onSubmit={submit}
                render={({ handleSubmit, invalid }) => (
                    <View>
                        <Field
                            name='username'
                            label="Username *"
                            validate={composeValidators(required(), email())}
                            keyboardType={'email-address'}
                            autoCapitalize={'none'}
                            component={Input}
                            placeholderName={USER_NAME}
                        />
                        <Field
                            name='password'
                            label="Password *"
                            validate={composeValidators(required(), length({ min: 8 }))}
                            keyboardType={'default'}
                            autoCapitalize={'none'}
                            component={Input}
                            placeholderName={PASSWORD}
                            secureTextEntry={true}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#000', marginLeft: 10, opacity: invalid !== true ? 1 : 0.5, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                                {/* <SubmitButton
                                disabled={invalid == true && true}
                                submit={() => navigation.navigate('Register')}
                                text='Register'
                                textStyle={{ color: '#fff' }}
                            /> */}
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
        </View>
    )
};

export default LoginForm;