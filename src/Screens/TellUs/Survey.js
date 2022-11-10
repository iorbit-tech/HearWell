import React, { useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import SubmitButton from '../../Components/SubmitButton';
import { getHeight, getWidth } from '../../Components/utils';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const Questions = [
    { id: 0, question: 1, name: "I have worn a hearing device", },
    { id: 1, question: 2, name: "I have worn a hearing device 2", },
    { id: 2, question: 3, name: "I have worn a hearing device 3", },
    { id: 3, question: 4, name: "I have worn a hearing device 4", },
];

const Survey = ({ navigation }) => {
    const [value, setValue] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    var radio_props = [
        { label: 'Never', value: 0 },
        { label: 'less than month', value: 1 },
        { label: '1 year', value: 2 },
        { label: 'more than 1 year', value: 3 }
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 20 }}>
                <Text>Help us understand your lifestyle and how it may be affected by your hearing</Text>
            </View>
            <View style={{ padding: 20 }}>
                <Text>Question{Questions[questionIndex].question}:</Text>
                <Text>{Questions[questionIndex].name}:</Text>
            </View>
            <View style = {{ padding: 20, marginTop: 10}}>
            <RadioForm>
                {
                    radio_props.map((obj, i) => (
                        <RadioButton labelHorizontal={true} key={i} >
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                initial={0}
                                onPress={(value) => { setValue(value) }}
                                buttonSize={10}
                                isSelected={setValue === i}
                                buttonOuterColor={value === i ? '#9B9B9B' : 'grey'}
                                buttonStyle={{backgroundColor: value === i ?  '#0E96FF' : '#fff'}}
                            />
                            <RadioButtonLabel
                                obj={obj}
                                index={i}
                                initial={0}
                                labelHorizontal={true}
                                onPress={(value) => { setValue(value) }}
                                labelStyle={{ fontSize: 20, color: 'grey' }}
                                labelWrapStyle={{marginLeft: 10}}
                            />
                        </RadioButton>
                    ))
                }
            </RadioForm>
            </View>
            <View style={{ width: getWidth() / 1.2, alignSelf: 'center', marginTop: getHeight() / 1.2, position: 'absolute' }}>
                <SubmitButton
                    text={'Next'}
                    btnStyle={{ backgroundColor: 'blue', padding: 20, borderRadius: 10 }}
                    textStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    submit={() => (questionIndex< (Questions.length-1)) ? setQuestionIndex(questionIndex + 1): setQuestionIndex(questionIndex)}
                />
            </View>
        </View>
    )
};

export default Survey;