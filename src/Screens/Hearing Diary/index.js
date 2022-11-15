import React from 'react';
import { View, Text } from 'react-native';
import SubmitButton from '../../Components/SubmitButton';
import { getHeight, getWidth } from '../../Components/utils';
import { START } from '../../Constants/appconstants';

const HearingDiary = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 20 }}>
                <Text>Take some questions about hearing device...</Text>
            </View>
            <View style={{ width: getWidth() / 1.2, alignSelf: 'center', marginTop: getHeight() / 1.3, position: 'absolute' }}>
                <SubmitButton
                    text={START}
                    btnStyle={{ backgroundColor: 'blue', padding: 20, borderRadius: 10 }}
                    textStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    submit={() => navigation.navigate('Diary Questions')}
                />
            </View>
        </View>
    )
};

export default HearingDiary;