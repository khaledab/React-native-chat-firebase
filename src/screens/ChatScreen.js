import React from "react";
import { GiftedChat } from 'react-native-gifted-chat'
import {View} from "react-native-web";

const ChatScreen = (props) => {
    return (
        <GiftedChat isTyping={true} showUserAvatar={false} messages={props.messages} user={props.user} onSend={props.onSend} />
        )
}

export default ChatScreen ;
