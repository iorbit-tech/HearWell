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
            <View style={{ flexDirection: 'row', position: 'absolute', right: 60 }}>
                <Image style={{ width: 30, height: 30, marginLeft: 10, tintColor: 'grey' }} source={AttachmentPin} />
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
            placeholder='Type a message...'
            renderSend={(props) => {
                const { text, messageIdGenerator, user, onSend } = props
                return (
                    <TouchableOpacity onPress={
                        () => {
                            if (text && onSend) {
                                onSend({ text: text.trim(), user: user, _id: messageIdGenerator(), video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', image: 'https://t3.ftcdn.net/jpg/02/95/26/46/360_F_295264675_clwKZxogAhxLS9sD163Tgkz1WMHsq1RJ.jpg', }, true);
                            }
                        }
                    } style={{}}>
                        <Image style={{ width: 30, height: 30, marginRight: 10, tintColor: '#5CB6FC' }} source={SendArrow} />
                    </TouchableOpacity>
                )
            }}
            renderInputToolbar={renderInputToolbar}
            renderMessageImage={renderMessageImage}
            renderMessageVideo={renderMessageVideo}
            messages={messages}
            onSend={messages => onSend(messages)}
            renderActions={renderActions}
            user={{
                _id: 1,
            }}
        />
    )
}

export default Chat;