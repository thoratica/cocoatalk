import React, { useEffect, useState } from 'react';
import Chatroom from '../components/Chatroom';
import Sidebar from '../components/Sidebar';
import useChannelList from '../hooks/useChannelList';
import useChatList from '../hooks/useChatList';
import { Long } from '../node-kakao';

const Main = () => {
  const channelList = useChannelList();
  const [chatList, loading] = useChatList();
  const [selected, setSelected] = useState<{ type: 'chat'; id: Long }>({ type: 'chat', id: Long.fromNumber(0) });

  console.log(chatList);

  return (
    <div className='main'>
      <div className={'loading' + (loading ? ' show' : '')}>
        <div className='content'>
          <span className='title'>메시지를 불러오는 중입니다...</span>
          <span className='description'>채팅방의 메시지들을 불러오는 중입니다. 조금만 기다려주세요!</span>
        </div>
      </div>
      <Sidebar setSelected={setSelected} channelList={channelList} />
      <Chatroom
        selected={selected}
        channel={channelList.find((channel) => channel.channelId.toString() === selected.id.toString())}
        chatList={chatList[selected.id.toString()] ?? []}
      />
    </div>
  );
};

export default Main;
