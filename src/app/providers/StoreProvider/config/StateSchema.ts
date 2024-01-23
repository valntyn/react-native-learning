import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { PersistPartial } from 'redux-persist/lib/persistReducer';
import { UserSchema } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { LoginSchema } from '@/features/AuthByUserName/types/loginSchema';

export interface StateSchema {
    // REQUIRED
    user: UserSchema & PersistPartial;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // async
    login?: LoginSchema;
}

export type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;

    // true - inited, false - destroyed
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
