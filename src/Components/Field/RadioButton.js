import React, { useEffect, useState, useContext } from "react";
import { View, TextInput, Text } from "react-native";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";

const Radiobutton = (props) => {
    const [values, setValues] = useState(props.value || props || "");
    const { Questions, questionIndex } = props;

    const onChangeHandler = (value) => {
        const { input: { onChange } } = props;
        onChange(value);
        setValues(value);
        console.log(value, 'value_Radiobutton');
    }
    return (
        <>
            <View>
                <RadioForm style={{ marginTop: 10, }}>
                    {
                        Questions.map((obj, i) => (
                            <RadioButton style={{ marginTop: 10 }} labelHorizontal={true} key={i} >
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    initial={0}
                                    onPress={onChangeHandler}
                                    buttonSize={10}
                                    isSelected={setValues === obj.label}
                                    buttonOuterColor={values === obj.label ? '#9B9B9B' : 'grey'}
                                    buttonStyle={{ backgroundColor: values === obj.label ? '#0E96FF' : '#fff' }}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    initial={0}
                                    labelHorizontal={true}
                                    onPress={onChangeHandler}
                                    labelStyle={{ fontSize: 20, color: 'grey' }}
                                    labelWrapStyle={{ marginLeft: 10 }}
                                />
                            </RadioButton>
                        ))
                    }
                </RadioForm>

            </View>

        </>
    )
}
export default Radiobutton;