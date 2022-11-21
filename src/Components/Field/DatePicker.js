import { useState } from 'react'
import { Button, Text } from 'react-native'
import DatePicker from 'react-native-date-picker'

export default () => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <>
            <Text>{date.toDateString()}</Text>
            <Button title="Select Date" onPress={() => setOpen(true)} />
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
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}