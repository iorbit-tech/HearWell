import React from 'react';
import { View, Text, useWindowDimensions  } from 'react-native';
import SubmitButton from '../../Components/SubmitButton';
import { getHeight, getWidth } from '../../Components/utils';

const Questions = [
    { id: 0, question: 1, name: "I have worn a hearing device", input1: "Never", input2: "less than month", input3: "1 year", input4: "more than 1 year"},
    { id: 1,  question: 2, name: "Notebook",},
    { id: 2,  question: 3, name: "Eraser", },
    { id: 3,  question: 4, name: "Sharpener", },
  ];

const Survey = ({navigation}) => {
    const Dimensions = useWindowDimensions();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <View style={{ padding: 20 }}>
                <Text>Help us understand your lifestyle and how it may be affected by your hearing</Text>
            </View>
            <View style={{ padding: 20 }}>
                <Text>Question{Questions[0].question}:</Text>
                <Text>{Questions[0].name}:</Text>
            </View>
            <View style={{ width: getWidth()/1.2, alignSelf: 'center', marginTop: getHeight()/1.2, position: 'absolute' }}>
                <SubmitButton
                    text={'Next'}
                    btnStyle={{ backgroundColor: 'blue', padding: 20, borderRadius: 10 }}
                    textStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    submit={() => ''}
                />
            </View>
        </View>
    )
};

export default Survey;