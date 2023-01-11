import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import { Form, Field } from 'react-final-form';
import { required, email, length } from 'redux-form-validators';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Input from '../../Components/Field/Input';
import SubmitButton from '../../Components/SubmitButton';
import { submitSignup } from '../../actions';
import { CONFIRM_PASSWORD, LOGIN, OLD_USER, PASSWORD, REGISTER, USER_NAME } from '../../Constants/appconstants';
import Radiobutton from '../../Components/Field/RadioButton';
import Datepicker from '../../Components/Field/DatePicker';
import { get } from 'lodash';
import { ThemeContext } from "../../themes/theme-context";

const Gender = [
    { label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }
];

const MaritalStatus = [
    { label: 'Single', value: 'Single' }, { label: 'Married', value: 'Married' }
];

const Register = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { data } = useSelector((state) => state.user);
    const isInitialMount = useRef(true);
    const [value, setValue] = useState(0);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const theme = useContext(ThemeContext);

    useEffect(() => {
        if (password === confirmpassword) {
            setPasswordMatch(true);
        }
        else {
            setPasswordMatch(false);
        }
    }, [confirmpassword, password]);

    const submit = value => {
        dispatch(submitSignup(value));
    }

    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (get(data, 'message') == 'User registration successfull') {
                navigation.navigate('Home');
            }
        }
    }, [data]);

    return (
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === "ios" ? "padding" : "height"}
        //     style={{ flex: 1 }}
        // >
        <KeyboardAvoidingView keyboardVerticalOffset={100} behavior={Platform.OS === 'ios' && 'padding'} style={{ flex: 1 }} enabled>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: theme.blackColor }}>
                <View style={{ marginVertical: 50 }}>
                    <Form onSubmit={submit}
                        render={({ handleSubmit, invalid }) => (
                            <View>
                                {/* <Field
                                    name='userName'
                                    label="Username *"
                                    validate={composeValidators(required())}
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    component={Input}
                                    placeholderName={USER_NAME}
                        /> */}
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
                                    name='password'
                                    label="Password *"
                                    validate={composeValidators(required(), length({ min: 8 }))}
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    component={Input}
                                    placeholderName={PASSWORD}
                                    righticon={true}
                                    isSecure={true}
                                    setPassword={setPassword}
                                />
                                <Field
                                    name='confirmPassword'
                                    label="confirmPassword *"
                                    validate={composeValidators(required(), length({ min: 8 }))}
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    component={Input}
                                    placeholderName={CONFIRM_PASSWORD}
                                    righticon={true}
                                    isSecure={true}
                                    setConfirmPassword={setConfirmPassword}
                                />
                                {passwordMatch === false &&
                                    <Text style={{ fontSize: 14, color: 'red', bottom: 10, width: '100%' }}>Password does not match the confirm password!</Text>
                                }
                                <Text style={{ fontSize: 18 }}>DOB:</Text>
                                <Field
                                    name='dob'
                                    label="dob *"
                                    // validate={composeValidators(required())}
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    component={Datepicker}
                                    placeholderName={'DOB'}
                                />
                                <Text style={{ fontSize: 18, paddingTop: 10, color: theme.placeholderTextColor }}>Gender:</Text>
                                <Field
                                    name='gender'
                                    component={Radiobutton}
                                    Questions={Gender}
                                    questionIndex={0}
                                    value={value}
                                    labelStyle={{ fontSize: 16 }}
                                />
                                <View style={{ padding: 10 }}></View>
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
                                <View style={{ backgroundColor: '#000', opacity: (invalid || !passwordMatch) ? 0.5 : 1, padding: 10, borderRadius: 5, alignSelf: 'center', flexDirection: 'row' }}>
                                    <SubmitButton
                                        disabled={(invalid || !passwordMatch) && true}
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
        </KeyboardAvoidingView >
    )
};

export default Register;