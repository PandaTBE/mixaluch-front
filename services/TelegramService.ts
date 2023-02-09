import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { telegramChatData } from '../contsants/telegram';

import { urls } from '../contsants/urls';

export const telegramApi = createApi({
    reducerPath: 'telegramApi',
    baseQuery: fetchBaseQuery({ baseUrl: urls.telegramBaseUrl }),
    endpoints: (build) => ({
        /** Отправка сообщения в чат */
        sendMessage: build.mutation<{ ok: boolean }, string>({
            query: (text) => ({
                url: `bot${telegramChatData.botApiKey}/sendMessage`,
                method: 'POST',
                body: {
                    text,
                    parse_mode: 'html',
                    chat_id: telegramChatData.chatId,
                },
            }),
        }),
    }),
});
