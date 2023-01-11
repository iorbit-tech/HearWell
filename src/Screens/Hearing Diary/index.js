import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { getHearingQuestions } from '../../actions';
import SubmitButton from '../../Components/SubmitButton';
import { getHeight, getWidth } from '../../Components/utils';
import { START } from '../../Constants/appconstants';
import { ThemeContext } from "../../themes/theme-context";

const HearingDiary = ({ navigation }) => {
    const dispatch = useDispatch();
    const theme = useContext(ThemeContext);
    useEffect(() => {
        dispatch(getHearingQuestions());
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: theme.blackColor }}>
            <View style={{ padding: 20 }}>
                <Text style={{ color: theme.text}}>Take some questions about hearing device...</Text>
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