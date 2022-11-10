import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Form, Field } from 'react-final-form';
import { required, email, length } from 'redux-form-validators';

import Input from '../../Components/Field/Input';
import SubmitButton from '../../Components/SubmitButton';
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {

    const navigation = useNavigation();

    const submit = value => {
        console.log(value, 'value');
        if(Platform.OS == 'ios') {
            navigation.navigate('Dashboard');
        }
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
                            placeholderName='UserName'
                        />
                        <Field
                            name='password'
                            label="Password *"
                            validate={composeValidators(required(), length({ min: 8 }))}
                            keyboardType={'default'}
                            autoCapitalize={'none'}
                            component={Input}
                            placeholderName='Password'
                            secureTextEntry = {true}
                        />
                        <View style={{ backgroundColor: '#000', opacity: invalid !== true ? 1 : 0.5, padding: 10, borderRadius: 5, alignSelf: 'center', flexDirection: 'row' }}>
                            {/* <SubmitButton
                                disabled={invalid == true && true}
                                submit={() => navigation.navigate('Register')}
                                text='Register'
                                textStyle={{ color: '#fff' }}
                            /> */}
                            <SubmitButton
                                disabled={invalid == true && true}
                                submit={handleSubmit}
                                text='Login'
                                textStyle={{ color: '#fff' }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Text>New User </Text>
                            <SubmitButton
                                text={'Register'}
                                textStyle={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
                                submit={() => navigation.navigate('Register')}
                            >
                            </SubmitButton>
                        </View>
                        {/* <View>
                            <Text>Forgot Password</Text>
                        </View> */}
                    </View>
                )
                }
            />
        </View>
    )
};

export default LoginForm;