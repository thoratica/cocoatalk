import { useEffect, useState } from 'react';
import { Chatlog, Long } from '../node-kakao';
import { client } from '../store';

const useChatList = (): [
  {
    [channelId: string]: Chatlog[];
  },
  boolean
] => {
  const [chatList, setChatList] = useState<{ [channelId: string]: Chatlog[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const channels = Array.from(client.channelList.all());
      const newChatList: { [channelId: string]: Chatlog[] } = {};
      const tmp: [string, Chatlog[]][] = await Promise.all(
        channels.map(async (channel) => {
          let startId: Long | undefined = undefined;
          const update: Chatlog[] = [];
          let chatLog: Chatlog[];

          const getChatLog = async (startId: Long | undefined): Promise<Chatlog[]> => {
            const chatListFromRes = await channel.getChatListFrom(startId);
            if (!chatListFromRes.success) return [];
            return chatListFromRes.result;
          };

          while ((chatLog = await getChatLog(startId)) && chatLog?.length > 0) {
            update.push(...chatLog);
            if (startId?.toString() !== chatLog[(chatLog?.length ?? 1) - 1].logId.toString()) {
              startId = chatLog[(chatLog?.length ?? 1) - 1].logId;
            }
          }

          return [channel.channelId.toString(), update] as [string, Chatlog[]];
        })
      );

      tmp.forEach(([channel, chatList]) => (newChatList[channel] = chatList));

      setChatList(newChatList);
      setLoading(false);
    })();

    // const newChatList: { [channelId: string]: Chatlog[] } = {};

    // (async () => {
    //   const tmp =
    //     (
    //       await Promise.all(
    //         Array.from(client.channelList.all()).map(async (channel) => {
    //           if (!channel.info.lastChatLog) return;

    //           const getChatListRes = await channel.getChatListFrom();
    //           if (!getChatListRes.success) return { [channel.channelId.toString()]: [] };
    //           else return { [channel.channelId.toString()]: getChatListRes.result };
    //         })
    //       )
    //     ).filter((chatList) => chatList !== undefined) ?? [];

    //   for (const chatList of tmp.map((tmp) => tmp!)) {
    //     for (const [id, list] of Object.entries(chatList)) {
    //       newChatList[id] = list;
    //     }
    //   }

    //   setChatList({ ...chatList, ...newChatList });
    // })();
  }, []);

  return [chatList, loading];
};

export default useChatList;
