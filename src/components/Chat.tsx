import React from 'react';
import { Chatlog } from '../node-kakao';

const Chat = ({ chat }: { chat: Chatlog }) => {
  return <div>{chat.text ?? JSON.stringify(chat)}</div>;
};

export default Chat;
