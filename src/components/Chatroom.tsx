import React, { forwardRef, useCallback, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { Chatlog, Long, TalkChannel } from '../node-kakao';
import Chat from './Chat';

const Chatroom = ({ selected, channel, chatList }: { selected: { type: 'chat'; id: Long }; channel: TalkChannel | undefined; chatList: Chatlog[] }) => {
  const ref = useRef<VirtuosoHandle>(null);

  return (
    <div className='chatroom'>
      <div className='header'>
        <div className='name'>{channel?.getDisplayName()}</div>
      </div>
      <div className='list'>
        <Virtuoso
          ref={ref}
          data={chatList}
          itemContent={useCallback(
            (_, chat: Chatlog) => {
              return <Chat chat={chat} key={chat.logId.toString()} />;
            },
            [chatList]
          )}
          initialTopMostItemIndex={chatList.length ?? 0}
          components={{ List: forwardRef((props, ref) => <div {...props} ref={ref} className='wrapper' />) }}
        />
      </div>
    </div>
  );
};

export default Chatroom;
