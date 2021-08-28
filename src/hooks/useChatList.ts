import { useEffect, useState } from 'react';
import { Chatlog, Long } from '../node-kakao';
import { client } from '../store';

const useChatList = () => {
  const [chatList, setChatList] = useState<{ [channelId: string]: Chatlog[] }>({});

  useEffect(() => {
    const newChatList: { [channelId: string]: Chatlog[] } = {};

    (async () => {
      const tmp =
        (
          await Promise.all(
            Array.from(client.channelList.all()).map(async (channel) => {
              if (!channel.info.lastChatLog) return;

              const getChatListRes = await channel.getChatListFrom();
              if (!getChatListRes.success) return { [channel.channelId.toString()]: [] };
              else return { [channel.channelId.toString()]: getChatListRes.result };
            })
          )
        ).filter((chatList) => chatList !== undefined) ?? [];

      for (const chatList of tmp.map((tmp) => tmp!)) {
        for (const [id, list] of Object.entries(chatList)) {
          newChatList[id] = list;
        }
      }

      setChatList({ ...chatList, ...newChatList });
    })();
  }, []);

  return chatList;
};

export default useChatList;
