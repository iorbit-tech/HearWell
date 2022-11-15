import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { View, Text } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import Checkbox from '../../Components/Field/CheckBox';
import SubmitButton from '../../Components/SubmitButton';
import { NEXT } from '../../Constants/appconstants';

const Questions = [
    { value: 0, question: 1, name: "The Situation.", options: ["Restaurant", "Home", "Group conversation at work", "Outside"] },
    { value: 1, question: 2, name: "The Problem.", options: ["Hearing aid ringing", "Could not understand female voices", "Overall difficulty following conversation"] },
    { value: 2, question: 3, name: "Time of day.", options: ["Morning", "Afternoon", "Evening"] },
    { value: 3, question: 4, name: "Hours hearing aid worn when difficulty occurred.", options: [{ label: '1 hour', value: 0 }, { label: '4 hours', value: 1 }, { label: '6 hours', value: 2 }, { label: '8 hours', value: 3 }, { label: 'Greater than 8 hours', value: 4 }], type: 'radio' },
    { value: 4, question: 5, name: "How did you react to the situation?", options: ["I did nothing and listened the best I could", "I did nothing and listened the best I could", "I  adjusted my hearing aid setting", "I removed myself from the situation"] },
    { value: 5, question: 6, name: "Did your reaction help?", options: [{ label: 'Yes', value: 0 }, { label: 'No', value: 1 }], type: 'radio' }
];

const DiaryQuestions = ({ navigation }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [value, setValue] = useState(0);

    const submit = (value) => {
        console.log(value, 'value');
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {Questions[questionIndex].type !== 'radio' &&
                <View style={{ padding: 20, }}>
                    <Text>{Questions[questionIndex].name}</Text>
                    {Questions[questionIndex].options.map((obj, i) => (
                        <View>
                            <Form onSubmit={submit}
                                render={({ handleSubmit, invalid }) => (
                                    <View>
                                        <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                            <Field
                                                name={obj}
                                                component={Checkbox}
                                            />
                                            <Text style={{ marginHorizontal: 10, alignSelf: 'center' }}>{obj}</Text>
                                        </View>
                                    </View>
                                )}
                            />

                        </View>
                    ))
                    }
                    < SubmitButton
                        btnStyle={{ alignSelf: 'center', width: 100, backgroundColor: '#000', padding: 20, borderRadius: 10, marginTop: 50 }}
                        textStyle={{ color: '#fff', textAlign: 'center' }}
                        text={NEXT}
                        submit={() => (questionIndex < (Questions.length - 1)) ? setQuestionIndex(questionIndex + 1) : navigation.navigate('Dashboard')}
                    />

                </View>
            }
            {Questions[questionIndex].type == 'radio' &&
                <View style={{ padding: 20 }}>
                    <Text>{Questions[questionIndex].name}</Text>
                    <RadioForm style={{ marginTop: 10, }}>
                        {
                            Questions[questionIndex].options.map((obj, i) => (
                                <RadioButton style={{ marginTop: 10 }} labelHorizontal={true} key={i} >
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        initial={0}
                                        onPress={(value) => { setValue(value) }}
                                        buttonSize={10}
                                        isSelected={setValue === i}
                                        buttonOuterColor={value === i ? '#9B9B9B' : 'grey'}
                                        buttonStyle={{ backgroundColor: value === i ? '#0E96FF' : '#fff' }}
                                    />
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        initial={0}
                                        labelHorizontal={true}
                                        onPress={(value) => { setValue(value) }}
                                        labelStyle={{ fontSize: 20, color: 'grey' }}
                                        labelWrapStyle={{ marginLeft: 10 }}
                                    />
                                </RadioButton>
                            ))

                        }
                    </RadioForm>
                    <SubmitButton
                        btnStyle={{ alignSelf: 'center', width: 100, backgroundColor: '#000', padding: 20, borderRadius: 10, marginTop: 50 }}
                        textStyle={{ color: '#fff', textAlign: 'center' }}
                        text={NEXT}
                        submit={() => (questionIndex < (Questions.length - 1)) ? setQuestionIndex(questionIndex + 1) : navigation.navigate('Dashboard')}
                    />
                </View>
            }
        </View>
    )
};

export default DiaryQuestions;