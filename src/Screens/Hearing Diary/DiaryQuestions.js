import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Checkbox from '../../Components/Field/CheckBox';
import Radiobutton from '../../Components/Field/RadioButton';
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
    const { questions } = useSelector((state) => state.hearing);
    const [optionsList, setOptionsList] = useState([]);

    const submit = (value) => {
        console.log(value, 'value');
    }
    console.log(questionIndex, 'questionIndex');
    console.log(questions.length - 1, 'length');
    // console.log(questions[questionIndex].answerType, 'questions')
    useEffect(() => {
        if (questionIndex < questions.length) {
            setOptionsList([{
                label: questions[questionIndex].options[0], value: 0
            },
            {
                label: questions[questionIndex].options[1], value: 1
            },
            {
                label: questions[questionIndex].options[2], value: 2
            },
            {
                label: questions[questionIndex].options[3], value: 3
            },
            ])
        }
    }, [questionIndex]);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {questionIndex < questions.length && questions[questionIndex].answerType !== 'singlechoice' &&
                <View style={{ padding: 20, }}>
                    <Text>{questions[questionIndex].question}</Text>
                    {questions[questionIndex].options.map((option, index) => (
                        <View>
                            <Form onSubmit={submit}
                                render={({ handleSubmit, invalid }) => (
                                    <View>
                                        <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                            <Field
                                                name={"checkbox" + option} //need to change
                                                component={Checkbox}
                                                value={option}
                                            />
                                            <Text style={{ marginHorizontal: 10, alignSelf: 'center' }}>{option}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    ))
                    }
                    {/* <SubmitButton
                        btnStyle={{ alignSelf: 'center', width: 100, backgroundColor: '#000', padding: 20, borderRadius: 10, marginTop: 50 }}
                        textStyle={{ color: '#fff', textAlign: 'center' }}
                        text={NEXT}
                        submit={() => (questionIndex < (Questions.length - 1)) ? setQuestionIndex(questionIndex + 1) : navigation.navigate('Dashboard')}
                    /> */}
                </View>
            }
            {questionIndex < questions.length && questions[questionIndex].answerType == 'singlechoice' &&
                <View style={{ padding: 20 }}>
                    <Text>{questions[questionIndex].question}</Text>
                    <View>
                        <Form onSubmit={submit}
                            render={({ handleSubmit, invalid }) => (
                                <View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                        <Field
                                            name={questionIndex} //need to change
                                            component={Radiobutton}
                                            Questions={optionsList}
                                            questionIndex={questionIndex}
                                            value={value}
                                        />
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>
            }
            <SubmitButton
                btnStyle={{ alignSelf: 'center', width: 100, backgroundColor: '#000', padding: 20, borderRadius: 10, marginTop: 50 }}
                textStyle={{ color: '#fff', textAlign: 'center' }}
                text={NEXT}
                submit={() => (questionIndex < (questions.length - 1)) ? setQuestionIndex(questionIndex + 1) : navigation.navigate('Dashboard')}
            />
        </View>
    )
};

export default DiaryQuestions;