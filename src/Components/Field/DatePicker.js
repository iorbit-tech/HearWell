import { useEffect, useState, useContext } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-date-picker';
import { ThemeContext } from "../../themes/theme-context";

import datePicker from '../../assets/data_picker.png';

export default (props) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [values, setvalues] = useState(props.input.value || props.initValue || "");
    const [valueEntered, setvalueEntered] = useState((props.input.value || props.initValue) ? true : false);
    const { meta: { touched, error }, input: { value }, initValue, placeholderName, getValue, } = props;
    const theme = useContext(ThemeContext);

    useEffect(() => {
        setvalueEntered(initValue !== "" ? true : false)
        setvalues(initValue)
    }, [initValue])

    function getFormattedDate(date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return day + '-' + month + '-' + year;
    }
    function minimumDate() {
        return new Date("1900-01-01")
    }
    function maximumDate() {
        return new Date("2015-12-31")
    }
    const onChangeHandler = (value) => {
        const { input: { onChange } } = props;
        onChange(getFormattedDate(value));
        setvalues(getFormattedDate(value));
    }

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ position: 'absolute', right: 10, top: 10, zIndex: 999 }}>
                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                    >
                        <Image style={{ width: 25, height: 25, marginLeft: 10, zIndex: 999 }} source={datePicker} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        style={{ backgroundColor: theme.inputField, padding: 10, borderRadius: 10, width: 300, marginBottom: 15, borderColor: '#000', borderWidth: 1 }}
                        value={date.toDateString()}
                        onChangeText={onChangeHandler}
                        placeholder={placeholderName}
                        defaultValue={getValue}
                        autoCorrect={false}
                        {...props}
                        placeholderTextColor={theme.placeholderTextColor}
                        editable={false}
                    />
                </View>
            </View>
            <DatePicker
                modal
                open={open}
                maximumDate={maximumDate()}
                minimumDate={minimumDate()}
                mode='date'
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    onChangeHandler(date)
                }
                }
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}