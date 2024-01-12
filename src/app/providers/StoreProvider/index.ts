import { StoreProvider } from './ui/StoreProvider';
import { AppDispatch, createReduxStore } from './config/store';
import type { ReduxStoreWithManager, StateSchema, ThunkConfig } from './config/StateSchema';

export {
    StoreProvider, createReduxStore, ReduxStoreWithManager, StateSchema, ThunkConfig,
};

export type { AppDispatch };
