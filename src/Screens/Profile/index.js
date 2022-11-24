import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { View, Image, Text, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../Components/Field/Input';
import ProfilePhoto from '../../assets/profile.png'
import SubmitButton from '../../Components/SubmitButton';
import Checkbox from '../../Components/Field/CheckBox';
import { AID_USER, DEMENTIA, DIABETES, DOB, HEALTH_STATS, HEARING_LOSS, HYPER_TENSION, NAME, OTHER, SUBMIT } from '../../Constants/appconstants';
import { submitVitals } from '../../actions';
import { get } from 'lodash';
import { required } from 'redux-form-validators';

const Profile = ({ navigation }) => {

    const { data } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const submit = value => {
        console.log(value, 'value');
        dispatch(submitVitals(value, get(data, 'data.userId')));
    }

    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ marginTop: 10, marginLeft: 10 }}>
                <SubmitButton
                    imageUri={ProfilePhoto}
                    imgStyle={{ width: 80, height: 80, borderRadius: 50, }}
                />
            </View>
            <View style={{ marginLeft: 10, marginTop: 20 }}>
                <Form onSubmit={submit}
                    render={({ handleSubmit, invalid }) => (
                        <View>
                            <Field
                                name='name'
                                label="name *"
                                // validate={composeValidators(required(), email())}
                                validate={composeValidators(required())}
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={NAME}
                            // initValue={data.data.userName}
                            />
                            <Field
                                name='yearOfBirth'
                                label="yearofbirth *"
                                keyboardType={'number-pad'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={DOB}
                            // initValue={data.data.dob}
                            />
                            <Field
                                name='currentHealthStatus'
                                label="currenthealthstatistics *"
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={HEALTH_STATS}
                            />
                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                <Field
                                    name='diabets'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20 }}>{DIABETES}</Text>
                                <Field
                                    name='hyperTension'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20 }}>{HYPER_TENSION}</Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                <Field
                                    name='dementia'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20 }}>{DEMENTIA}</Text>
                                <Field
                                    name='hearingLoss'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20 }}>{HEARING_LOSS}</Text>
                            </View> */}
                            <View style={{ marginTop: 20 }}>
                                <Field
                                    name='otherHealthConditions'
                                    label="currentheotheralthstatistics *"
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    component={Input}
                                    placeholderName={OTHER}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Field
                                    name='hearingAidUser'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20, alignSelf: 'center' }}>{AID_USER}</Text>
                            </View>
                            <SubmitButton
                                // submit={() => navigation.navigate('Hearing aid details')}
                                submit={handleSubmit}
                                text={SUBMIT}
                                textStyle={{ fontWeight: 'bold', color: '#fff' }}
                                btnStyle={{ alignSelf: 'center', backgroundColor: '#000', padding: 10, borderRadius: 10, marginTop: 40 }}
                            />
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    )
};

export default Profile;