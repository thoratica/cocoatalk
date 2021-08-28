import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import toast from 'react-hot-toast';
import { Long, TalkChannel } from '../node-kakao';
import { client } from '../store';

const Sidebar = ({
  channelList,
  setSelected,
}: {
  channelList: TalkChannel[];
  setSelected: React.Dispatch<
    React.SetStateAction<{
      type: 'chat';
      id: Long;
    }>
  >;
}) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuData, setContextMenuData] = useState<{ id: Long; x: number; y: number }>({ id: Long.fromNumber(0), x: 0, y: 0 });

  return (
    <div className='sidebar' onClick={() => setShowContextMenu(false)}>
      <div className={'contextMenu' + (showContextMenu ? ' show' : '')} style={{ top: contextMenuData.y, left: contextMenuData.x }}>
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
      </div>
      <h2 className='title'>친구</h2>
      <div className='list'>
        <Scrollbars autoHeight autoHeightMax={'100%'} autoHide>
          {channelList.map((channel) => {
            let profileImage = Array.from(channel.getAllUserInfo())[0]?.profileURL ?? '';
            if (profileImage === '') profileImage = '../assets/profile.png';

            return (
              <div
                className='item'
                onClick={() => setSelected({ type: 'chat', id: channel.channelId })}
                onContextMenu={(e) => {
                  setShowContextMenu(true);
                  setContextMenuData({ id: channel.channelId, x: e.clientX, y: e.clientY });
                }}
                key={channel.channelId.toString()}
              >
                <div className='profile' style={{ backgroundImage: `url("${[profileImage]}")` }} />
                <div className='text'>
                  <div className='name'>{channel.getDisplayName()}</div>
                  <div className='status'>{channel.info.lastChatLog?.text ?? ''}</div>
                </div>
              </div>
            );
          })}
        </Scrollbars>
      </div>
    </div>
  );
};

export default Sidebar;
