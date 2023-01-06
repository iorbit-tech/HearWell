import { View, Text, TouchableOpacity, Image } from 'react-native';

const Logout = ({ submit, notificationSubmit, tint, New, notificationStyle, bell }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View>
                <TouchableOpacity onPress={submit}>
                    <View style={{ alignItems: 'center' }}>
                        <Image tintColor={'#000'} source={require('../assets/logout.png')}
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={notificationSubmit}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 1 }}>
                        <View>
                            <Image tintColor={tint} source={bell}
                                style={{
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        </View>
                        <View>
                            <Text style={notificationStyle}>{New}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Logout;