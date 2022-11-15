import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { View, Image, Text, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Input from '../../Components/Field/Input';
import ProfilePhoto from '../../assets/profile.png'
import SubmitButton from '../../Components/SubmitButton';
import Checkbox from '../../Components/Field/CheckBox';

const Profile = ({ navigation }) => {
    const submit = (value) => {
        console.log(value, 'value');
    }

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
                            <View style={{ marginTop: 20 }}>
                                <Field
                                    name='other'
                                    label="currentheotheralthstatistics *"
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    component={Input}
                                    placeholderName='Other'
                                />
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Field
                                    name='hearingaiduser'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20, alignSelf: 'center' }}>Hearing aid user</Text>
                            </View>
                            {/* {hearingaiduser === true && */}
                            <SubmitButton
                                submit={() => navigation.navigate('Hearing aid details')}
                                text={'Submit'}
                                textStyle={{ fontWeight: 'bold', color: '#fff' }}
                                btnStyle={{ alignSelf: 'center', backgroundColor: '#000', padding: 10, borderRadius: 10, marginTop: 40 }}
                            />
                            {/* } */}
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    )
};

export default Profile;