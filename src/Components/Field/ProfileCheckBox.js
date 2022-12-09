import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState, useContext } from "react";
import { View, TextInput, Text } from "react-native";

const ProfileCheckBox = (props) => {
    const [values, setvalues] = useState(props.input.value || props.initValue || "");
    const { meta: { touched, error }, input: { newValue }, initValue, label, serverError, inputstyle = {}, without_background = false, placeholderName, secureTextEntry, getValue, } = props;

    const onChangeHandler = (newValue) => {
        const { input: { onChange }, label, } = props;
        onChange(label);
        setvalues(newValue);
    }
    return (
        <>
            <View>
                <CheckBox
                    style={{}}
                    disabled={false}
                    value={values}
                    onValueChange={onChangeHandler}
                />
            </View>

        </>
    )
}
export default ProfileCheckBox;