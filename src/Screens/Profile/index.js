import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { View, Image, Text, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Input from '../../Components/Field/Input';
import ProfilePhoto from '../../assets/profile.png'
import SubmitButton from '../../Components/SubmitButton';
import Checkbox from '../../Components/Field/CheckBox';
import { AID_USER, DEMENTIA, DIABETES, DOB, HEALTH_STATS, HEARING_LOSS, HYPER_TENSION, NAME, OTHER, SUBMIT } from '../../Constants/appconstants';

const Profile = ({ navigation }) => {
    const submit = (value) => {
        console.log(value, 'value');
    }
    console.log('Profile');
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
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={NAME}
                            />
                            <Field
                                name='yearOfBirth'
                                label="yearofbirth *"
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={DOB}
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
                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
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
                            </View>
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
                                submit={() => navigation.navigate('Hearing aid details')}
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