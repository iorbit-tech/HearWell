import React from 'react';
import { View, Text } from 'react-native';
import { Form, Field } from 'react-final-form';
import { required, email, length } from 'redux-form-validators';

import Input from '../../Components/Field/Input';
import SubmitButton from '../../Components/SubmitButton';

const LoginForm = ({ navigation }) => {

    const submit = value => {
        console.log(value, 'value');
    }

    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    return (
        <View style={{ alignItems: 'center' }}>
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
                            keyboardType={'password'}
                            autoCapitalize={'none'}
                            component={Input}
                            placeholderName='Password'
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
                                // submit={() => navigation.navigate('Register')}
                                submit={() => console.log('Register')}
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