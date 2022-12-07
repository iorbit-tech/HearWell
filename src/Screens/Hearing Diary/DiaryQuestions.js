import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Checkbox from '../../Components/Field/CheckBox';
import Radiobutton from '../../Components/Field/RadioButton';
import SubmitButton from '../../Components/SubmitButton';
import { NEXT } from '../../Constants/appconstants';

const DiaryQuestions = ({ navigation }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [value, setValue] = useState(0);
    const { questions } = useSelector((state) => state.hearing);
    const [optionsList, setOptionsList] = useState([]);

    const submit = (value) => {
        console.log(value, 'value');
    }

    useEffect(() => {
        if (questionIndex < questions.length) {
            let dataList = [];
            dataList = questions[questionIndex].options.map((option, i) => (
                {
                    label: option, value: i
                }
            )
            )
            setOptionsList(dataList);
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