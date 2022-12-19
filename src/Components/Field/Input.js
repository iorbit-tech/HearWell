import React, { useEffect, useState, useContext } from "react";
import { View, TextInput, Text } from "react-native";

const Input = (props) => {
    const [values, setvalues] = useState(props.input.value || props.initValue || "");
    const [valueEntered, setvalueEntered] = useState((props.input.value || props.initValue) ? true : false);
    const { meta: { touched, error }, input: { value }, initValue, label, serverError, inputstyle = {}, without_background = false, placeholderName, secureTextEntry, getValue, multiline } = props;

    useEffect(() => {
        setvalueEntered(initValue !== "" ? true : false)
        setvalues(initValue)
    }, [initValue])

    const onChangeHandler = (value) => {
        const { input: { onChange } } = props;
        onChange(value);
        setvalues(value);
    }
    return (
        <>
            <View>
                <TextInput
                    style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, width: 300, marginBottom: 15, borderColor: '#000', borderWidth: 1 }}
                    value={values}
                    onChangeText={onChangeHandler}
                    placeholder={placeholderName}
                    defaultValue={getValue}
                    autoCorrect={false}
                    {...props}
                    placeholderTextColor={'grey'}
                    secureTextEntry={secureTextEntry}
                    multiline={multiline ? multiline : false}
                />
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