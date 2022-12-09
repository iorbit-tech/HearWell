import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';

import SubmitButton from '../../Components/SubmitButton';
import { getHeight, getWidth } from '../../Components/utils';
import { NEXT } from '../../Constants/appconstants';
import Input from '../../Components/Field/Input';
import { submitTellusAnswer } from '../../actions';
import { get } from 'lodash';

const Survey = ({ navigation }) => {
    const [value, setValue] = useState();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [optionsList, setOptionsList] = useState([]);
    const { questions } = useSelector((state) => state.tellus);
    const { user } = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    let question = questions[questionIndex];

    const submit = () => {
        var answerData = {
            'questionId': get(question, 'questionId'),
            'userId': get(user, 'userId'),
            'order': parseInt(get(question, 'order')),
            'answerType': get(question, 'answerType'),
            'page': get(question, 'page'),
            'options': value
        };
        dispatch(submitTellusAnswer(answerData));
        console.log(value, 'value');
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
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 20 }}>
                <Text>Help us understand your lifestyle and how it may be affected by your hearing</Text>
            </View>
            <View style={{ padding: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{questions[questionIndex] !== undefined && questions[questionIndex].order}: </Text>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{questions[questionIndex] !== undefined && questions[questionIndex].question}</Text>
            </View>
            <View style={{ padding: 20, marginTop: 10 }}>
                {questions[questionIndex].answerType !== 'textinput' ?
                    <RadioForm>
                        {
                            optionsList.map((obj, i) => (
                                console.log(obj, 'obj'),
                                <RadioButton labelHorizontal={true} key={i} >
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        initial={0}
                                        onPress={(value) => { setValue(value) }}
                                        buttonSize={10}
                                        isSelected={setValue === obj.label}
                                        buttonOuterColor={value === obj.label ? '#9B9B9B' : 'grey'}
                                        buttonStyle={{ backgroundColor: value === obj.label ? '#0E96FF' : '#fff' }}
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
                    :
                    <Form onSubmit={submit}
                        render={({ handleSubmit, invalid }) => (
                            <View>
                                <View>
                                    <Field
                                        name='textinput'
                                        label="Textinput *"
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        component={Input}
                                        placeholderName={'Enter your input here...'}
                                    />
                                </View>
                                {/* <View style={{ backgroundColor: '#000', opacity: invalid !== true ? 1 : 0.5, padding: 10, borderRadius: 5, alignSelf: 'center', flexDirection: 'row' }}>
                                    <SubmitButton
                                        disabled={invalid == true && true}
                                        submit={handleSubmit}
                                        text={'REGISTER'}
                                        textStyle={{ color: '#fff' }}
                                    />
                                </View> */}
                            </View>
                        )}
                    />
                }
            </View>
            <View style={{ width: getWidth() / 1.2, alignSelf: 'center', marginTop: getHeight() / 1.3, position: 'absolute' }}>
                <SubmitButton
                    text={NEXT}
                    btnStyle={{ backgroundColor: 'blue', padding: 20, borderRadius: 10 }}
                    textStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    submit={() => { submit(); (questionIndex < (questions.length - 1)) ? setQuestionIndex(questionIndex + 1) : navigation.navigate('Dashboard') }}

                />
            </View>
        </View>
    )
};

export default Survey;