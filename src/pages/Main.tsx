import React, { useState } from 'react';
import Chatroom from '../components/Chatroom';
import Sidebar from '../components/Sidebar';
import useChannelList from '../hooks/useChannelList';
import useChatList from '../hooks/useChatList';
import { Long } from '../node-kakao';

const Main = () => {
  const channelList = useChannelList();
  const chatList = useChatList();
  const [selected, setSelected] = useState<{ type: 'chat'; id: Long }>({ type: 'chat', id: Long.fromNumber(0) });

  console.log(chatList);

  return (
    <div className='main'>
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
