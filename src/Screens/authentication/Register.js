import React, { useEffect, useRef } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
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
        console.log(value, 'value');
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
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{}}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', }}>
                    <View style={{ paddingBottom: 120, paddingTop: 50 }}>
                        <Form onSubmit={submit}
                            render={({ handleSubmit, invalid }) => (
                                <View>
                                    <Field
                                        name='userName'
                                        label="Username *"
                                        validate={composeValidators(required())}
                                        keyboardType={'default'}
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
                                    <Field
                                        name='firstName'
                                        label="firstName *"
                                        validate={composeValidators(required())}
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'First Name'}
                                    />
                                    <Field
                                        name='lastName'
                                        label="lastName *"
                                        validate={composeValidators(required())}
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'Last Name'}
                                    />
                                    <Field
                                        name='dob'
                                        label="dob *"
                                        validate={composeValidators(required())}
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'DOB'}
                                    />
                                    <Field
                                        name='gender'
                                        label="gender *"
                                        validate={composeValidators(required())}
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'Gender'}
                                    />
                                    <Field
                                        name='maritalStatus'
                                        label="maritalStatus *"
                                        validate={composeValidators(required())}
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'Marital Status'}
                                    />
                                    <Field
                                        name='address1'
                                        label="address1 *"
                                        validate={composeValidators(required())}
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'Adderess'}
                                    />
                                    <Field
                                        name='address2'
                                        label="address2 *"
                                        validate={composeValidators(required())}
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'Address2'}
                                    />
                                    <Field
                                        name='city'
                                        label="city *"
                                        validate={composeValidators(required())}
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'City'}
                                    />
                                    <Field
                                        name='country'
                                        label="country *"
                                        validate={composeValidators(required())}
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'Country'}
                                    />
                                    <Field
                                        name='zip'
                                        label="zip *"
                                        validate={composeValidators(required())}
                                        keyboardType={'name-phone-pad'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'Zip'}
                                    />
                                    <Field
                                        name='email'
                                        label="email *"
                                        validate={composeValidators(required(), email())}
                                        keyboardType={'email-address'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'Email'}
                                    />
                                    <Field
                                        name='phone'
                                        label="phone *"
                                        validate={composeValidators(required())}
                                        keyboardType={'number-pad'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'Phone'}
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
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
};

export default Register;