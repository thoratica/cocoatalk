import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Chatroom from '../components/Chatroom';
import Confetti from '../components/Confetti';
import Sidebar from '../components/Sidebar';
import useChannelList from '../hooks/useChannelList';
import useChatList from '../hooks/useChatList';
import { Long } from '../node-kakao';

const Main = () => {
  const channelList = useChannelList();
  const [chatList, loading] = useChatList();
  const [selected, setSelected] = useState<{ type: 'chat'; id: Long }>({ type: 'chat', id: Long.fromNumber(0) });
  // const [showContextMenu, setShowContextMenu] = useState(false);
  // const [contextMenuData, setContextMenuData] = useState<{ id: Long; x: number; y: number }>({ id: Long.fromNumber(0), x: 0, y: 0 });

  console.log(chatList);

  return (
    <div className='main' /*onClick={() => setShowContextMenu(false)}*/>
      {/* <div className={'contextMenu' + (showContextMenu ? ' show' : '')} style={{ top: contextMenuData.y, left: contextMenuData.x }}>
        <div
          className='item leave'
          onClick={() => {
            setShowContextMenu(false);
            const channel = channelList.find((c) => c.channelId.toString() === contextMenuData.id.toString());
            if (channel === undefined) return toast.error('채널을 찾을 수 없습니다.');

            alert(channel.info.type);
            if (channel.info.type === 'OM' || channel.info.type === 'OD') client.channelList.open.leaveChannel({ channelId: contextMenuData.id });
            else client.channelList.normal.leaveChannel({ channelId: contextMenuData.id });
          }}
        >
          나가기
        </div>
      </div> */}
      {!loading &&
        (() => {
          toast.success('메시지를 불러왔습니다!');
          return <Confetti />;
        })()}
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
