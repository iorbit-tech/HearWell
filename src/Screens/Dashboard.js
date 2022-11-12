import React, { Suspense } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SubmitButton from '../Components/SubmitButton';

const Dashboard = ({ route, navigation }) => {
    // const { _signOut } = route.params;
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
                            text={'Tell us more'}
                            textStyle={{ textAlign: 'center' }} 
                            submit={() => navigation.navigate('Tell us more')}
                            />
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <SubmitButton
                            btnStyle={{ backgroundColor: '#51B3FF', padding: 20 }}
                            text={'Hearing Diary'}
                            textStyle={{ textAlign: 'center' }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                    <View style={{ flex: 0.5 }}>
                        <SubmitButton
                            btnStyle={{ backgroundColor: '#51B3FF', padding: 20, marginRight: 10, }}
                            text={'Profile'}
                            textStyle={{ textAlign: 'center' }} 
                            submit={() => navigation.navigate('Profile')}/>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <SubmitButton
                            btnStyle={{ backgroundColor: '#51B3FF', padding: 20, }}
                            text={'Ask Us'}
                            textStyle={{ textAlign: 'center' }} 
                            submit={() => navigation.navigate('Ask us')}
                            />
                    </View>
                </View>
            </View>
            {/* <SubmitButton
                submit={_signOut? _signOut : ''}
                text={'Logout'}
                btnStyle={{ backgroundColor: 'grey', padding: 10, width: 100, alignItems: 'center', alignSelf: 'center' }}
            /> */}
        </View>
    )
};

export default Dashboard;