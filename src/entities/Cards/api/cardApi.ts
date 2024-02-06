import { rtkApi } from '@/shared/api/rtkApi';
import { GetCard } from '@/entities/Cards/model/types/getCard';

const cardApi = rtkApi
    .enhanceEndpoints({
        addTagTypes: ['Card'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getCards: build.query<GetCard[], { packId: string }>({
                query: ({ packId }) => {
                    const params = {
                        packId,
                    };

                    return {
                        url: '/cards',
                        params,
                        method: 'GET',
                    };
                },
                providesTags: (_) => ['Card'],
            }),
            postCard: build.mutation<void, { word: string; hint: string; packId: string }>({
                query: (body) => ({
                    url: '/cards',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Card'],
            }),
        }),
    });

export const useGetCards = cardApi.useGetCardsQuery;
export const usePostCard = cardApi.usePostCardMutation;
