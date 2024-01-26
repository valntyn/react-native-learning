import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsGameStarted = (state: StateSchema) => state?.cardGame?.isStarted || false;
