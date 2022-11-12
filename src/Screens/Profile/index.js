import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { View, Image, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Input from '../../Components/Field/Input';
import ProfilePhoto from '../../assets/profile.png'
import SubmitButton from '../../Components/SubmitButton';
import Checkbox from '../../Components/Field/CheckBox';

const Profile = () => {

    const submit = (value) => {
        console.log(value, 'value');
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName='Name'
                            />
                            <Field
                                name='yearofbirth'
                                label="yearofbirth *"
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName='Year of birth'
                            />
                            <Field
                                name='currenthealthstatistics'
                                label="currenthealthstatistics *"
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName='Current Health Statistics'
                            />
                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                <Field
                                    name='diabetes'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20 }}>Diabetes</Text>
                                <Field
                                    name='hyperTension'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20 }}>HyperTension</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                <Field
                                    name='dementia'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20 }}>Dementia</Text>
                                <Field
                                    name='hearingLoss'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20 }}>HearingLoss</Text>
                            </View>
                            <View style = {{marginTop: 20}}>
                            <Field
                                name='other'
                                label="currentheotheralthstatistics *"
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName='Other'
                            />
                            </View>
                            <View style = {{flexDirection: 'row', marginTop: 10}}>
                            <Field
                                    name='hearingaiduser'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20, alignSelf: 'center' }}>Hearing aid user</Text>
                                </View>
                            <SubmitButton
                                        submit={handleSubmit}
                                        text={'Submit'}
                                        textStyle={{ fontWeight: 'bold', }}
                                    />
                        </View>
                    )}
                />
            </View>
        </View>
    )
};

export default Profile;