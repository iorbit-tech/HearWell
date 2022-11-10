import { View, Text, Image, TouchableOpacity } from 'react-native';

export const SubmitButton = ({ text, submit, textStyle, btnStyle, imageUri, imgStyle, disabled }) => {
    return (
        <View>
            <TouchableOpacity disabled={disabled} onPress={submit} style={btnStyle} >
                <Text style={textStyle}>{text}</Text>
                <Image style={imgStyle}
                    source={imageUri} />
            </TouchableOpacity>
        </View>

    );
};

export default SubmitButton;