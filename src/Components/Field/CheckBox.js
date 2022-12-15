import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState, useContext } from "react";
import { View } from "react-native";

const Checkbox = (props) => {
    const [values, setvalues] = useState(props.input.value || props.initValue || "");
    const { meta: { touched, error }, input: { newValue }, } = props;

    useEffect(() => {
        props.setArrayvalues([]);
        setvalues('');
    }, [props.questionIndex]);

    const onChangeHandler = (newValue) => {
        const { input: { onChange }, label, questionIndex, setArrayvalues, arrayvalues } = props;
        setvalues(newValue);
        let array = [];
        array = arrayvalues;
        if (newValue)
            array.push(label);
        else
            array = array.filter(value => value != label);
        setArrayvalues(array);
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
export default Checkbox;