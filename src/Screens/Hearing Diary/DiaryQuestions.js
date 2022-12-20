import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { View, Text, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { submitAnswer } from '../../actions';

import Checkbox from '../../Components/Field/CheckBox';
import Input from '../../Components/Field/Input';
import Radiobutton from '../../Components/Field/RadioButton';
import SubmitButton from '../../Components/SubmitButton';
import { compare } from '../../Components/utils';
import { NEXT } from '../../Constants/appconstants';

const DiaryQuestions = ({ navigation }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [values, setValues] = useState('');
    const [arrayvalues, setArrayvalues] = useState([]);
    const { questions } = useSelector((state) => state.hearing);
    const { user } = useSelector((state) => state.user.data);
    const [optionsList, setOptionsList] = useState([]);
    const dispatch = useDispatch();
    let question = questions[questionIndex];

    questions.sort(compare);

    const submit = (value) => {
        console.log("valueABCD", value);
        if (questionIndex < (questions.length - 1)) {
            setQuestionIndex(questionIndex + 1);
        } else {
            navigation.navigate('Dashboard')
        }
        if (questions[questionIndex].answerType == 'multiplechoice') {
            dispatchAns(arrayvalues);
        } else if (questions[questionIndex].answerType == 'singlechoice') {
            if (value && Object.keys(value).length === 0) {
                dispatchAns([]);
            }
            else {
                setValues(value);
                dispatchAns(value);
            }
        }
        else if (questions[questionIndex].answerType == 'textinput') {
            if (get(value, 'textinput', '') != '') {
                dispatchAns(value.textinput[questionIndex]);
            }
            else {
                dispatchAns([]);
            }
        }
    }

    const dispatchAns = (data) => {
        var answerData = {
            'questionId': get(question, 'questionId'),
            'userId': get(user, 'userId'),
            'order': parseInt(get(question, 'order')),
            'answerType': get(question, 'answerType'),
            'page': get(question, 'page'),
            'options': data
        };
        dispatch(submitAnswer(answerData));
    }

    useEffect(() => {
        if (questionIndex < questions.length) {
            let dataList = [];
            dataList = questions[questionIndex].options.map((option, i) => (
                {
                    label: option, value: option
                }
            )
            )
            setOptionsList(dataList);
        }
        const subscribe = navigation.addListener('beforeRemove', (e) => {
            if (questionIndex < (questions.length - 1)) {
                e.preventDefault();
                Alert.alert('Complete HearingDiary',
                    'Please complete all the questions of HearingDiary!'
                )
            }
        })
        return subscribe
    }, [questionIndex]);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View >
                <View style={{ flexDirection: 'row', margin: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>{questions[questionIndex] !== undefined && questions[questionIndex].order}: </Text>
                    <Text style={{ fontSize: 20, color: 'grey' }}>{questions[questionIndex].question}</Text>
                </View>
                <Form onSubmit={submit}
                    render={({ handleSubmit, invalid }) => (
                        <View>
                            {questionIndex < questions.length && questions[questionIndex].answerType == 'multiplechoice' &&
                                <View style={{ padding: 20, }}>
                                    {questions[questionIndex].options.map((option, index) => (
                                        <View>
                                            <View>
                                                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                                    <Field
                                                        name={"checkbox" + option}
                                                        component={Checkbox}
                                                        // value={option}
                                                        questionIndex={questionIndex}
                                                        label={option}
                                                        setArrayvalues={setArrayvalues}
                                                        arrayvalues={arrayvalues}
                                                    />
                                                    <Text style={{ marginHorizontal: 10, alignSelf: 'center' }}>{option}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                    }
                                </View>
                            }
                            {questionIndex < questions.length && questions[questionIndex].answerType == 'singlechoice' &&
                                <View style={{ padding: 20 }}>
                                    <View>
                                        <View>
                                            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                                <Field
                                                    name={questionIndex}
                                                    component={Radiobutton}
                                                    Questions={optionsList}
                                                    questionIndex={questionIndex}
                                                    labelStyle={{ fontSize: 20, color: 'grey' }}
                                                // value={values}
                                                />
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            }
                            {questionIndex < questions.length && questions[questionIndex].answerType == 'textinput' &&
                                <View style={{ padding: 20 }}>
                                    <Field
                                        name={`textinput.${questionIndex}`}
                                        label="Textinput *"
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'Enter your input here...'}
                                        multiline={true}
                                        style={{ backgroundColor: '#fff', paddingBottom: 150, paddingHorizontal: 15, borderRadius: 10, width: 300, marginBottom: 15, borderColor: '#000', borderWidth: 1 }}
                                    />
                                </View>

                            }
                            <SubmitButton
                                btnStyle={{ alignSelf: 'center', width: 100, backgroundColor: '#000', padding: 20, borderRadius: 10, marginTop: 50, marginBottom: 20 }}
                                textStyle={{ color: '#fff', textAlign: 'center' }}
                                text={NEXT}
                                submit={() => handleSubmit()}
                            />
                        </View>

                    )}
                />
            </View>
        </ScrollView>
    )
};

export default DiaryQuestions;