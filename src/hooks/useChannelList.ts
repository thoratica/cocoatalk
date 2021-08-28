import { useState } from 'react';
import { TalkChannel } from '../node-kakao';
import { client } from '../store';

const useChannelList = () => {
  const [channelList, setChannelList] = useState(Array.from(client.channelList.all()));

  const joinHandler = (channel: TalkChannel) => setChannelList([...channelList, channel]);
  const leaveHandler = (channel: TalkChannel) => setChannelList(channelList.filter((c) => c.channelId.toString() !== channel.channelId.toString()));
  client.on('channel_added', joinHandler);
  client.on('channel_join', joinHandler);
  client.on('channel_kicked', (_, channel) => leaveHandler(channel));
  client.on('channel_left', leaveHandler);

  return channelList;
};

export default useChannelList;
