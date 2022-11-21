import { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-date-picker'

import datePicker from '../../assets/data_picker.png';

export default (props) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [values, setvalues] = useState(props.input.value || props.initValue || "");
    const [valueEntered, setvalueEntered] = useState((props.input.value || props.initValue) ? true : false);
    const { meta: { touched, error }, input: { value }, initValue, placeholderName, getValue, } = props;


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
            <View style={{ flexDirection: 'row' }}>
                <View style={{ position: 'absolute', right: 10, top: 10, zIndex: 999 }}>
                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                    >
                        <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: 'grey', zIndex: 999 }} source={datePicker} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, width: 300, marginBottom: 15, borderColor: '#000', borderWidth: 1 }}
                        value={date.toDateString()}
                        onChangeText={onChangeHandler}
                        placeholder={placeholderName}
                        defaultValue={getValue}
                        autoCorrect={false}
                        {...props}
                        placeholderTextColor={'grey'}
                        editable={false}
                    />
                </View>
            </View>
            <DatePicker
                modal
                open={open}
                // maximumDate =
                // minimumDate
                mode='date'
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }
                }
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}