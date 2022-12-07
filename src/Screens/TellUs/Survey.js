import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SubmitButton from '../../Components/SubmitButton';
import { getHeight, getWidth } from '../../Components/utils';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { NEXT } from '../../Constants/appconstants';
import { useSelector } from 'react-redux';

const Survey = ({ navigation }) => {
    const [value, setValue] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [optionsList, setOptionsList] = useState([]);
    const { questions } = useSelector((state) => state.tellus);

    useEffect(() => {
        let dataList = [];
        dataList = questions[questionIndex].options.map((option, i) => (
            {
                label: option, value: i
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
            </View>
            <View style={{ width: getWidth() / 1.2, alignSelf: 'center', marginTop: getHeight() / 1.3, position: 'absolute' }}>
                <SubmitButton
                    text={NEXT}
                    btnStyle={{ backgroundColor: 'blue', padding: 20, borderRadius: 10 }}
                    textStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    submit={() => (questionIndex < (questions.length - 1)) ? setQuestionIndex(questionIndex + 1) : navigation.navigate('Dashboard')}

                />
            </View>
        </View>
    )
};

export default Survey;