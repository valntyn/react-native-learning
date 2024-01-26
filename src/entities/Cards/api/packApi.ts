import { rtkApi } from '@/shared/api/rtkApi';
import { GetPack } from '../model/types/getPack';

const packApi = rtkApi
    .enhanceEndpoints({
        addTagTypes: ['Pack'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getPacks: build.query<GetPack[], { userId: string }>({
                query: ({ userId }) => {
                    const params = {
                        userId,
                    };

                    return {
                        url: '/packs',
                        params,
                        method: 'GET',
                    };
                },
                providesTags: (_) => ['Pack'],
            }),
            getPack: build.query<GetPack, { packId: string }>({
                query: ({ packId }) => {
                    const params = {
                        packId,
                    };

                    return {
                        url: `/packs/${packId}`,
                        params,
                        method: 'GET',
                    };
                },
            }),
            deletePack: build.mutation<void, { packId: string }>({
                query: ({ packId }) => ({
                    url: `/packs/${packId}`,
                    method: 'DELETE',
                }),
            }),
        }),
    });

export const useGetPacks = packApi.useGetPacksQuery;
export const useGetPack = packApi.useGetPackQuery;
export const useDeletePack = packApi.useDeletePackMutation;
