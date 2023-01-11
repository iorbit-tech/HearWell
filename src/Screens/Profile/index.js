import React, { useEffect, useRef, useState, useContext } from 'react';
import { Field, Form } from 'react-final-form';
import { View, Image, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { required, email } from 'redux-form-validators';

import Input from '../../Components/Field/Input';
import ProfilePhoto from '../../assets/profile.png'
import SubmitButton from '../../Components/SubmitButton';
import { AID_USER, CANCEL, DIABETES, DOB, HEALTH_STATS, HYPER_TENSION, NAME, OTHER, SAVE, SUBMIT, UPDATE } from '../../Constants/appconstants';
import { clearResponse, fetchVitals, submitVitals, updateVitals } from '../../actions';
import ProfileCheckBox from '../../Components/Field/ProfileCheckBox';
import { ThemeContext } from "../../themes/theme-context";

const Profile = ({ navigation }) => {

    const { data, vitals } = useSelector((state) => state.user);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const theme = useContext(ThemeContext);

    const submit = value => {
        console.log(vitals, 'vitals')
        if (vitals) {
            if (Object.keys(vitals).length === 0) {
                dispatch(submitVitals(value, get(data, 'user.userId')))
            }
            else {
                dispatch(updateVitals(value, get(data, 'user.userId'), get(vitals, 'vitalId', '')));
            }
        }
        else {
            dispatch(submitVitals(value, get(data, 'user.userId')))
        }
    }

    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    useEffect(() => {
        dispatch(fetchVitals(get(data, 'user.userId')));
    }, []);
    useEffect(() => {
        if (user.response.status === 200 && user.response.data.message === 'updated successfully') {
            navigation.navigate('Dashboard');
            dispatch(clearResponse());
        }
    }, [user]);

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
                    render={({ handleSubmit, pristine }) => (
                        <View>
                            <Field
                                name='name'
                                label="name *"
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={NAME}
                                initValue={vitals ? get(vitals, 'name', '') : ''}
                            />
                            <Field
                                name='yearOfBirth'
                                label="yearofbirth *"
                                keyboardType={'number-pad'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={DOB}
                                initValue={vitals ? get(vitals, 'yearOfBirth', '') : ''}
                            />
                            <Field
                                name='currentHealthStatus'
                                label="currenthealthstatistics *"
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={HEALTH_STATS}
                                initValue={vitals ? get(vitals, 'currentHealthStatus', '') : ''}
                            />
                            <View style={{ backgroundColor: theme.inputField, width: 300, flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                <Field
                                    name='diabets'
                                    component={ProfileCheckBox}
                                    initialValue={vitals && get(vitals, 'healthCondition.diabets', false)}
                                />
                                <Text style={{ marginHorizontal: 20 }}>{DIABETES}</Text>
                                <Field
                                    name='hyperTension'
                                    component={ProfileCheckBox}
                                    initialValue={vitals && get(vitals, 'healthCondition.hyperTension', false)}
                                />
                                <Text style={{ marginHorizontal: 20 }}>{HYPER_TENSION}</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Field
                                    name='otherHealthConditions'
                                    label="currentheotheralthstatistics *"
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    component={Input}
                                    placeholderName={OTHER}
                                    initValue={vitals ? get(vitals, 'otherHealthConditions', '') : ''}
                                />
                            </View>
                            <View style={{ backgroundColor: theme.inputField, width: 300, flexDirection: 'row', marginTop: 10 }}>
                                <Field
                                    name='hearingAidUser'
                                    component={ProfileCheckBox}
                                    initialValue={vitals && get(vitals, 'hearingAidUser', false)}
                                />
                                <Text style={{ marginHorizontal: 20, alignSelf: 'center' }}>{AID_USER}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ marginRight: 10 }}>
                                    <SubmitButton
                                        submit={handleSubmit}
                                        disabled={pristine && true}
                                        // text={vitals === null ? SUBMIT : SAVE}
                                        text={SAVE}
                                        textStyle={{ fontWeight: 'bold', color: '#fff' }}
                                        btnStyle={{
                                            alignSelf: 'center', backgroundColor: '#000', paddingVertical: 12, paddingHorizontal: 30,
                                            borderRadius: 10, marginTop: 40, marginBottom: 20, opacity: !pristine ? 1 : 0.5
                                        }}
                                    />
                                </View>
                                <View>
                                    <SubmitButton
                                        submit={() => navigation.goBack()}
                                        // disabled={pristine && true}
                                        text={CANCEL}
                                        textStyle={{ fontWeight: 'bold', color: '#fff' }}
                                        btnStyle={{
                                            alignSelf: 'center', backgroundColor: '#000', paddingVertical: 12, paddingHorizontal: 30,
                                            borderRadius: 10, marginTop: 40, marginBottom: 20
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    )
};

export default Profile;