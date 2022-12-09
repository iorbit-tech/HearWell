import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Checkbox from '../../Components/Field/CheckBox';
import Input from '../../Components/Field/Input';
import Radiobutton from '../../Components/Field/RadioButton';
import SubmitButton from '../../Components/SubmitButton';
import { NEXT } from '../../Constants/appconstants';

const DiaryQuestions = ({ navigation }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [values, setValues] = useState('');
    const [arrayvalues, setArrayvalues] = useState([]);
    const { questions } = useSelector((state) => state.hearing);
    const [optionsList, setOptionsList] = useState([]);

    const submit = (value) => {
        console.log("valueABCD", value);
        if (questionIndex < (questions.length - 1)) {
            setQuestionIndex(questionIndex + 1);
        } else {
            navigation.navigate('Dashboard')
        }
        if (questions[questionIndex].answerType == 'multiplechoice') {
            // API with newData
            console.log(arrayvalues, 'arrayvalues');
        } else if (questions[questionIndex].answerType == 'singlechoice') {
            setValues(value);
            console.log("value", values);
            // API with value
        }
    }
    console.log(values, 'values');

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
    }, [questionIndex]);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Form onSubmit={submit}
                render={({ handleSubmit, invalid }) => (
                    <View>
                        {questionIndex < questions.length && questions[questionIndex].answerType == 'multiplechoice' &&
                            <View style={{ padding: 20, }}>
                                <Text>{questions[questionIndex].question}</Text>
                                {questions[questionIndex].options.map((option, index) => (
                                    <View>
                                        <View>
                                            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                                <Field
                                                    // name={option} //need to change
                                                    name={"checkbox" + option} //need to change
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
                                <Text>{questions[questionIndex].question}</Text>
                                <View>

                                    <View>
                                        <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                            <Field
                                                name={questionIndex} //need to change
                                                component={Radiobutton}
                                                Questions={optionsList}
                                                questionIndex={questionIndex}
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
                                    name='textinput'
                                    label="Textinput *"
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    component={Input}
                                    placeholderName={'Enter your input here...'}
                                />
                            </View>
                        }
                        <SubmitButton
                            btnStyle={{ alignSelf: 'center', width: 100, backgroundColor: '#000', padding: 20, borderRadius: 10, marginTop: 50 }}
                            textStyle={{ color: '#fff', textAlign: 'center' }}
                            text={NEXT}
                            submit={() => handleSubmit()}
                        />
                    </View>
                )}
            />
        </View>

    )
};

export default DiaryQuestions;