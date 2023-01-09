import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';

import SubmitButton from '../../Components/SubmitButton';
import { compare, getHeight, getWidth } from '../../Components/utils';
import { NEXT } from '../../Constants/appconstants';
import Input from '../../Components/Field/Input';
import { submitTellusAnswer } from '../../actions';
import { get } from 'lodash';
import Checkbox from '../../Components/Field/CheckBox';
import Radiobutton from '../../Components/Field/RadioButton';

const Survey = ({ navigation }) => {
    const [values, setValues] = useState();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [optionsList, setOptionsList] = useState([]);
    const { questions } = useSelector((state) => state.tellus);
    const { user } = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    let question = questions[questionIndex];
    const [arrayvalues, setArrayvalues] = useState([]);
    questions.sort(compare);

    const submit = (value, form) => {
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
                dispatchAns(value[questionIndex + 'radio']);
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
        form.reset();
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
        dispatch(submitTellusAnswer(answerData));
    }

    useEffect(() => {
        let dataList = [];
        dataList = questions[questionIndex].options.map((option, i) => (
            {
                label: option, value: option
            }
        )
        )
        setOptionsList(dataList);
    }, [questionIndex]);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <View style={{ padding: 20 }}>
                    <Text>Help us understand your lifestyle and how it may be affected by your hearing</Text>
                </View>
                <View style={{ padding: 20, marginTop: 10 }}>
                    <Form onSubmit={submit}
                        render={({ handleSubmit, form }) => (
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600', color: '#51B3FF' }}>{questions[questionIndex] !== undefined && questions[questionIndex].order}: </Text>
                                    <Text style={{ fontSize: 20, fontWeight: '600', color: '#51B3FF' }}>{questions[questionIndex].question}</Text>
                                </View>
                                {questions[questionIndex].answerType == 'multiplechoice' &&
                                    <View style={{ padding: 20, }}>
                                        {questions[questionIndex].options.map((option, index) => (
                                            <View key={index}>
                                                <View>
                                                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                                        <Field
                                                            name={"checkbox" + option} //need to change
                                                            component={Checkbox}
                                                            // value={option}
                                                            questionIndex={questionIndex}
                                                            label={option}
                                                            setArrayvalues={setArrayvalues}
                                                            arrayvalues={arrayvalues}
                                                        />
                                                        <Text style={{ marginHorizontal: 10, fontSize: 18, alignSelf: 'center', color: '#000', fontSize: 18, }}>{option}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        ))
                                        }
                                    </View>
                                }
                                {questions[questionIndex].answerType == 'singlechoice' &&
                                    <View style={{ padding: 20 }}>
                                        <View>
                                            <View>
                                                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                                    <Field
                                                        name={questionIndex + 'radio'} //need to change
                                                        component={Radiobutton}
                                                        Questions={optionsList}
                                                        questionIndex={questionIndex}
                                                        labelStyle={{ fontSize: 18, color: '#000' }}
                                                    />
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                }
                                {questions[questionIndex].answerType == 'textinput' &&
                                    <View style={{ paddingTop: 20 }}>
                                        <Field
                                            name={`textinput.${questionIndex}`}
                                            label="Textinput *"
                                            keyboardType={'default'}
                                            autoCapitalize={'none'}
                                            component={Input}
                                            placeholderName={'Enter your input here...'}
                                            multiline={true}
                                            style={{ backgroundColor: '#fff', fontSize: 18, paddingBottom: 150, paddingHorizontal: 15, borderRadius: 10, width: 300, marginBottom: 15, borderColor: '#000', borderWidth: 1 }}
                                        />
                                    </View>
                                }
                                <SubmitButton
                                    btnStyle={{ alignSelf: 'center', width: 100, backgroundColor: '#000', padding: 20, borderRadius: 10, marginTop: 50 }}
                                    textStyle={{ color: '#fff', textAlign: 'center' }}
                                    text={NEXT}
                                    submit={() => handleSubmit({ form: form })}
                                />
                            </View>

                        )}

                    />
                </View>
            </View >
        </ScrollView >
    )
};

export default Survey;