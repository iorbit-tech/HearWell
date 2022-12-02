import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { getTellusQuestions } from '../../actions';
import SubmitButton from '../../Components/SubmitButton';
import { getHeight, getWidth } from '../../Components/utils';
import { START } from '../../Constants/appconstants';

const TellUs = ({ navigation }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTellusQuestions());
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 20 }}>
                <Text>Take the survey to help us understand your lifestyle and how it may be affected by your hearing</Text>
            </View>
            <View style={{ width: getWidth() / 1.2, alignSelf: 'center', marginTop: getHeight() / 1.3, position: 'absolute' }}>
                <SubmitButton
                    text={START}
                    btnStyle={{ backgroundColor: 'blue', padding: 20, borderRadius: 10 }}
                    textStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    submit={() => navigation.navigate('Hearing test')}
                />
            </View>
        </View>
    )
};

export default TellUs;