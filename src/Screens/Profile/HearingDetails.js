import React from 'react';
import { Field, Form } from 'react-final-form';
import { View, Text, useWindowDimensions, } from 'react-native';
import Checkbox from '../../Components/Field/CheckBox';

import Input from '../../Components/Field/Input';
import { AID_USER, MAKE, MODEL, OTHER_DETAILS } from '../../Constants/appconstants';

const HearingDetails = ({ navigation }) => {

    const window = useWindowDimensions();

    const submit = (value) => {
        console.log(value, 'value');
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <View style={{ marginLeft: 10, marginTop: 20 }}>
                <Form onSubmit={submit}
                    render={({ handleSubmit, invalid }) => (
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 30 }}>
                                <Field
                                    name='hearingaiduser'
                                    component={Checkbox}
                                />
                                <Text style={{ marginHorizontal: 20, alignSelf: 'center' }}>{AID_USER}</Text>
                            </View>
                            <Field
                                name='make'
                                label="make *"
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={MAKE}
                            />
                            <Field
                                name='model'
                                label="model *"
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={MODEL}
                            />
                            <Field
                                name='otherdetails'
                                label="otherdetails *"
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                component={Input}
                                placeholderName={OTHER_DETAILS}
                            />
                        </View>
                    )}
                />
                <View style={{ alignItems: 'center', borderWidth: 1, borderColor: 'grey', marginTop: 20, width: window.width / 1.2 }}>
                    <Text style={{ fontSize: 14, opacity: 0.4, fontWeight: '500', color: 'grey' }}>Behind the ear - BTE</Text>
                    <Text style={{ fontSize: 16, opacity: 0.5, fontWeight: '500', color: 'grey' }}>In the ear - ITE</Text>
                    <Text style={{ fontSize: 18, opacity: 0.7, fontWeight: '500', color: 'grey' }}>Completely in the canal - CIC</Text>
                    <Text style={{ fontSize: 20, opacity: 1, fontWeight: '500' }}>In the canal - ITC</Text>
                </View>
            </View>
        </View>
    )
};

export default HearingDetails;