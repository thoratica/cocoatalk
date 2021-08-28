import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Long, TalkChannel } from '../node-kakao';

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
  return (
    <div className='sidebar'>
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
                // onContextMenu={(e) => {
                //   setShowContextMenu(true);
                //   setContextMenuData({ id: channel.channelId, x: e.clientX, y: e.clientY });
                // }}
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
