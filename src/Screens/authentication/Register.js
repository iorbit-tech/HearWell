import React, { useEffect, useRef } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Form, Field } from 'react-final-form';
import { required, email, length } from 'redux-form-validators';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Input from '../../Components/Field/Input';
import SubmitButton from '../../Components/SubmitButton';
import { submitSignup } from '../../actions';
import { LOGIN, OLD_USER, PASSWORD, REGISTER, USER_NAME } from '../../Constants/appconstants';

const Register = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { data } = useSelector((state) => state.user);
    const isInitialMount = useRef(true);

    const submit = value => {
        dispatch(submitSignup(value));
    }

    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (data.message == 'User registration successfull') {
                navigation.navigate('Home');
            }
        }
    }, [data]);

    return (
        <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1}}
    >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', }}>
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
                        <View style={{ backgroundColor: '#000', opacity: invalid !== true ? 1 : 0.5, padding: 10, borderRadius: 5, alignSelf: 'center', flexDirection: 'row' }}>
                            <SubmitButton
                                disabled={invalid == true && true}
                                submit={handleSubmit}
                                text={REGISTER}
                                textStyle={{ color: '#fff' }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Text>{OLD_USER}</Text>
                            <SubmitButton
                                text={LOGIN}
                                textStyle={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
                                submit={() => navigation.navigate('Home')}
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
        </KeyboardAvoidingView>
    )
};

export default Register;