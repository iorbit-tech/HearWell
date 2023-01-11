import React, { useEffect, useState, useContext } from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import showEyeIcon from '../../assets/show-eye.png';
import hideEyeIcon from '../../assets/hide-eye.png';
import { ThemeContext } from "../../themes/theme-context";

const Input = (props) => {
    const [issecure, setIssecure] = useState(props.isSecure);
    const [values, setvalues] = useState(props.input.value || props.initValue || "");
    const [valueEntered, setvalueEntered] = useState((props.input.value || props.initValue) ? true : false);
    const { meta: { touched, error }, input: { value }, initValue, label, serverError, inputstyle = {}, without_background = false, placeholderName, secureTextEntry, getValue, multiline, righticon } = props;
    const theme = useContext(ThemeContext);

    useEffect(() => {
        setvalueEntered(initValue !== "" ? true : false)
        setvalues(initValue)
    }, [initValue])

    const managePasswordVisibility = () => {
        setIssecure(!issecure);
    };

    const onChangeHandler = (value) => {
        const { input: { onChange }, setPassword, setConfirmPassword } = props;
        onChange(value);
        setvalues(value);
        if (setPassword) {
            setPassword(value);
        }
        if (setConfirmPassword) {
            setConfirmPassword(value);
        }
    }

    return (
        <>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={{ backgroundColor: theme.inputField, padding: 10, borderRadius: 10, width: 300, marginBottom: 15, borderColor: '#000', borderWidth: 1 }}
                        value={values}
                        onChangeText={onChangeHandler}
                        placeholder={placeholderName}
                        defaultValue={getValue}
                        autoCorrect={false}
                        {...props}
                        placeholderTextColor={theme.placeholderTextColor}
                        secureTextEntry={issecure}
                        multiline={multiline ? multiline : false}
                    />
                    {righticon && (
                        <View style={{ position: 'absolute', right: 0, top: 15, right: 10 }}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={managePasswordVisibility}
                            >
                                <Image style={{ height: 18, width: 18, resizeMode: "contain", }} source={issecure ? showEyeIcon : hideEyeIcon} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View style={{ bottom: 15, left: 5 }}>
                    {value.length > 0 &&
                        ((error && <Text style={{ color: 'red' }}>{error}</Text>)
                        )}
                </View>
            </View>
        </>
    )
}
export default Input;