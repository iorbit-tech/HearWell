import { View, Text, TouchableOpacity, Image } from 'react-native';

const Logout = () => {
    return (
        <View>
            <View>
                <TouchableOpacity>
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
        </View>
    )
}

export default Logout;