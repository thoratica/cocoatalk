import React from 'react';
import { Chatlog, Long, TalkChannel } from '../node-kakao';

const Chatroom = ({ selected, channel, chatList }: { selected: { type: 'chat'; id: Long }; channel: TalkChannel | undefined; chatList: Chatlog[] }) => {
  return (
    <div className='chatroom'>
      <div className='header'>
        <div className='name'>{channel?.getDisplayName()}</div>
      </div>
      <div className='list'>
        {chatList.map((chat) => (
          <p>{chat.text}</p>
        ))}
      </div>
    </div>
  );
};

export default Chatroom;
