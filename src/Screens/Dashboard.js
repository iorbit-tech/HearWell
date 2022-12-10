import React, { Suspense } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import { useDispatch } from 'react-redux';

import Logout from '../Components/Logout';
import SubmitButton from '../Components/SubmitButton';
import { AppBarStyle } from '../Components/utils';
import { ASK_US, HEARING_DIARY, PROFILE, TELL_US, USER_TOKEN } from '../Constants/appconstants';
import { clearState } from '../actions';

const Dashboard = ({ route, navigation }) => {
    const dispatch = useDispatch();
    // const { _signOut } = route.params;

    AppBarStyle('#BFBFBF', 'black', '', 'Hearwell', <Logout submit={() => clear()} />, '')

    const clear = () => {
        dispatch(clearState());
        RNSecureKeyStore.set(USER_TOKEN, "", { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY });
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'grey' }}>
                <Text style={{ textAlign: 'center', height: 100 }}>Banner</Text>
            </View>
            <View style={{ alignItems: 'center', marginVertical: 50, }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                    <View style={{ flex: 0.5 }}>
                        <SubmitButton
                            btnStyle={{ backgroundColor: '#51B3FF', padding: 20, marginRight: 10, }}
                            text={TELL_US}
                            textStyle={{ textAlign: 'center' }}
                            submit={() => navigation.navigate('Tell us more')}
                        />
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <SubmitButton
                            btnStyle={{ backgroundColor: '#51B3FF', padding: 20 }}
                            text={HEARING_DIARY}
                            textStyle={{ textAlign: 'center' }}
                            submit={() => navigation.navigate('Hearing Diary')} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                    <View style={{ flex: 0.5 }}>
                        <SubmitButton
                            btnStyle={{ backgroundColor: '#51B3FF', padding: 20, marginRight: 10, }}
                            text={PROFILE}
                            textStyle={{ textAlign: 'center' }}
                            submit={() => navigation.navigate('Profile')} />
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <SubmitButton
                            btnStyle={{ backgroundColor: '#51B3FF', padding: 20, }}
                            text={ASK_US}
                            textStyle={{ textAlign: 'center' }}
                            submit={() => navigation.navigate('Ask us')}
                        />
                    </View>
                </View>
            </View>
            {/* <SubmitButton
                submit={_signOut ? _signOut : ''}
                text={'Logout'}
                btnStyle={{ backgroundColor: 'grey', padding: 10, width: 100, alignItems: 'center', alignSelf: 'center' }}
            /> */}
        </View>
    )
};

export default Dashboard;