import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState, useContext } from "react";
import { View, TextInput, Text } from "react-native";
import { ThemeContext } from "../../themes/theme-context";

const ProfileCheckBox = (props) => {
    const [values, setvalues] = useState(props.input.value || props.initValue || "");
    const { meta: { touched, error }, label, input: { newValue }, initValue, serverError, inputstyle = {}, without_background = false, placeholderName, secureTextEntry, getValue, } = props;
    const theme = useContext(ThemeContext);

    const onChangeHandler = (newValue) => {
        const { input: { onChange }, label, } = props;
        onChange(newValue);
        setvalues(newValue);
    }
    return (
        <>
            <View style={{ backgroundColor: theme.inputField }}>
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