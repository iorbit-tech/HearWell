import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SubmitButton from '../../Components/SubmitButton';
import { getHeight, getWidth } from '../../Components/utils';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { NEXT } from '../../Constants/appconstants';
import { useSelector } from 'react-redux';

const Questions = [
    { id: 0, question: 1, name: "I have worn a hearing device?", },
    { id: 1, question: 2, name: "How long do you have any discomfort using the Hearing Device?", },
    { id: 2, question: 3, name: "How long are you using this device?", },
    { id: 3, question: 4, name: "At what age you started using the device?", },
    { id: 4, question: 5, name: "How long you are using this Brand of your Hearing Device?" },
];

const Survey = ({ navigation }) => {
    const [value, setValue] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [optionsList, setOptionsList] = useState([]);
    const { questions } = useSelector((state) => state.tellus);

    console.log(questionIndex)
    useEffect(() => {
        // if (questionIndex < (questions.length - 1)) {
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
        // }
    }, [questionIndex]);
    console.log(questionIndex, 'questionIndex');
    console.log(questions.length - 1, 'length');
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
                {/* {optionsList !== undefined && */}
                <RadioForm>
                    {
                        optionsList.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} >
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
                {/* } */}
            </View>
            <View style={{ width: getWidth() / 1.2, alignSelf: 'center', marginTop: getHeight() / 1.3, position: 'absolute' }}>
                <SubmitButton
                    text={NEXT}
                    btnStyle={{ backgroundColor: 'blue', padding: 20, borderRadius: 10 }}
                    textStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    // submit={() => (questions[questionIndex] !== undefined) ? setQuestionIndex(questionIndex + 1) : navigation.navigate('Dashboard')}
                    submit={() => (questionIndex < (questions.length - 1)) ? setQuestionIndex(questionIndex + 1) : navigation.navigate('Dashboard')}

                />
            </View>
        </View>
    )
};

export default Survey;