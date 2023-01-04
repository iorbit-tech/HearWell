import React, { useState, useCallback, useEffect } from 'react'
import { useWindowDimensions, View, Text, TouchableOpacity, Image } from 'react-native';
import { GiftedChat, MessageImage, Actions, InputToolbar, Bubble } from 'react-native-gifted-chat'
import SendArrow from '../../assets/arrows.png';
import AttachmentPin from '../../assets/attachment.png';
import Microphone from '../../assets/microphone.png';
import { REPLY, SUBMIT } from '../../Constants/appconstants';
import { useDispatch, useSelector } from 'react-redux';
import { getChat, submitChat } from '../../actions/index';
import { get } from 'lodash';
// import { io } from 'socket.io-client';
import io from 'socket.io-client';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [senderId, setSenderId] = useState('');
    const window = useWindowDimensions();
    const [msgState, setMsgState] = useState(0);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user.data);
    const { chat } = useSelector((state) => state.chat);
    const [socketConnected, setSocketConnected] = useState(false);

    var socket = io.connect('ws://localhost:8000/', { jsonp: false, secure: true, transports: ['websocket'], });

    useEffect(() => {
        socket.emit("setup", user.userId);
        // socket.emit("connection", user.userId);
        socket.on("connection", () => {
            console.log('ABCD connect');
            setSocketConnected(true);
        }
        );
        socket.emit("join chat", senderId);
        // socket.connect();
        // socket.on('connect', () => {
        //     console.log('connected to socket server');
        // });
        // if (chat && chat.length > 0) {
        // dispatch(getChat(get(data[0], "userId", "")));
        dispatch(getChat(get(user, "userId", "")));
        console.log(senderId, 'senderId')

        // }
    }, []);

    useEffect(() => {
        socket.on("Mobile message received", (newMessageReceived) => {
            console.log(newMessageReceived, 'newMessageReceived')
            dispatch(getChat(get(user, "userId", "")));
            // if (!newMessageReceived) {

            // }
            // else {
            // setMessages([...messages, newMessageReceived])
            // }
        });
    }, []);

    useEffect(() => {
        if (chat && chat.length > 0) {
            let updatedChat = [];
            chat.map((item, i) => {
                setSenderId(item.senderId)
                updatedChat[i] = {
                    item,
                    text: get(item, "message", ""),
                    createdAt: get(item, "sentTime", ""),
                    _id: get(item, '_id'),
                    user: get(item, "senderId", "") == get(user, "userId", "") ? "You" : "Expert",
                }
            })
            setMessages(updatedChat.reverse());
            console.log(updatedChat, 'updatedChat');
        }
    }, [chat]);

    console.log(user, 'user');
    const renderActions = () => {
        return (
            <View style={{ flexDirection: 'row', position: 'absolute', right: 60, top: 10 }}>
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

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                position={get(props.currentMessage, "user") == "You" ? 'left' : 'right'}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#86ffdd',
                    },
                    right: {
                        backgroundColor: '#6200ff47'
                    }
                }}
            />
        )
    }

    const renderMessageImage = (props) => {
        return (
            <View>
            </View>
        );
    }
    const onSend = useCallback((messages = []) => {
        console.log(messages, 'messages1');
        dispatch(submitChat(messages, get(user, "userId", ""),));
        dispatch(getChat(get(user, "userId", "")));
        socket.emit("new message", messages);
        setMsgState(1);
    }, [])

    return (
        <GiftedChat
            messagesContainerStyle={{ width: window.width, }}
            placeholder={REPLY}
            renderSend={(props) => {
                const { text, messageIdGenerator, user, onSend } = props
                return (
                    <View style={{ position: 'absolute', top: 10, right: 5 }}>
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
            renderBubble={renderBubble}
            // isTyping = {true}
            user={{
                _id: 1,
            }}
        />
    )
}

export default Chat;