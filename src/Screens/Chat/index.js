import React, { useState, useCallback, useEffect } from 'react'
import { useWindowDimensions, View, Text, TouchableOpacity, Image } from 'react-native';
import { GiftedChat, MessageImage, Actions, InputToolbar } from 'react-native-gifted-chat'
import SendArrow from '../../assets/arrows.png';
import AttachmentPin from '../../assets/attachment.png';
import Microphone from '../../assets/microphone.png';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const window = useWindowDimensions();

    useEffect(() => {
        setMessages([
            {
                name: 'Admin',
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),

                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])


    const renderActions = () => {
        return (
            <View style={{ flexDirection: 'row', position: 'absolute', right: 60, top:10 }}>
                <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: 'grey', transform: [{ rotate: '130deg' }] }} source={AttachmentPin} />
                {/* <Image style = {{width: 30, height: 30, marginLeft: 10, tintColor: 'grey'}} source = {Microphone} /> */}
            </View>
        );
    }

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar
                containerStyle={{}}
                {...props}
            />
        );
    }

    const renderMessageVideo = (props) => {
        return (
            <View>

            </View>
        );
    }

    const renderMessageImage = (props) => {
        return (
            <View>
            </View>
        );
    }
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            messagesContainerStyle={{ width: window.width }}
            placeholder='Reply'
            renderSend={(props) => {
                const { text, messageIdGenerator, user, onSend } = props
                return (
                    <View style = {{position: 'absolute', top:10, right:5}}>
                    <TouchableOpacity onPress={
                        () => {
                            if (text && onSend) {
                                onSend({ text: text.trim(), user: user, _id: messageIdGenerator(), video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', image: 'https://t3.ftcdn.net/jpg/02/95/26/46/360_F_295264675_clwKZxogAhxLS9sD163Tgkz1WMHsq1RJ.jpg', }, true);
                            }
                        }
                    } style={{}}>
                        <Image style={{ width: 28, height: 28, marginRight: 10, tintColor: 'grey', }} source={SendArrow} />
                    </TouchableOpacity>
                    </View>
                )
            }}
            renderInputToolbar={renderInputToolbar}
            renderMessageImage={renderMessageImage}
            renderMessageVideo={renderMessageVideo}
            messages={messages}
            onSend={messages => onSend(messages)}
            renderActions={renderActions}
            // isTyping = {true}
            user={{
                _id: 1,
            }}
        />
    )
}

export default Chat;