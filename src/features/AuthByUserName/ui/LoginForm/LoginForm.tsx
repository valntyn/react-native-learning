import {
    StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RNText } from '@/shared/lib/ui/Text';
import { Input } from '@/shared/lib/ui/Input';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { RNButton } from '@/shared/lib/ui/Button';
import { useLoginByUserName } from '../../api/loginApi';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModule/DynamicModuleLoader';
import { Skeleton } from '@/shared/lib/ui/Skeleton';
import { isFetchBaseQueryError } from '@/shared/api/rtkApi';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { AppRouterEnum } from '@/shared/lib/config/routeConfig/routeConfig';
import { User, userActions } from '@/entities/User';

interface LoginProps {}

const initialReducers: ReducersList = {
    login: loginReducer,
};

export const LoginForm = memo((props: LoginProps) => {
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const dispatch = useAppDispatch();
    const [loginByUserName, { isLoading }] = useLoginByUserName();
    const navigation = useAppNavigation();

    const { width: windowWidth } = useWindowDimensions();
    const containerWidth = windowWidth - 40;

    const onSuccess = useCallback(
        (data: User) => {
            dispatch(userActions.setAuthData(data));
            dispatch(loginActions.clear());
            navigation.navigate(AppRouterEnum.TODO);
        },
        [dispatch, navigation],
    );

    const onChangeUserName = useCallback(
        (value: string) => {
            dispatch(loginActions.setUserName(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLogingClick = useCallback(async () => {
        try {
            const data = await loginByUserName({ username, password }).unwrap();
            onSuccess(data);
        } catch (err) {
            if (isFetchBaseQueryError(err)) {
                console.warn(err.status, err.data);
            }
        }
    }, [loginByUserName, onSuccess, password, username]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterMount>
            <View style={[styles.container, { width: containerWidth }]}>
                <View style={styles.header}>
                    <RNText text="Login" textWeight="400" textSize="l" />
                </View>
                <View style={styles.box}>
                    <Input placeholder="Username" onChange={onChangeUserName} value={username} />
                    <Input placeholder="Password" onChange={onChangePassword} value={password} />

                    {isLoading ? (
                        <Skeleton border={20} width="100%" height={40} />
                    ) : (
                        <RNButton fullWidth onPress={onLogingClick}>
                            <Text>Login</Text>
                        </RNButton>
                    )}
                </View>
            </View>
        </DynamicModuleLoader>
    );
});

const styles = StyleSheet.create({
    box: {
        gap: 20,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    container: {
        alignSelf: 'center',
        backgroundColor: '#fffeff',
        borderRadius: 20,
        height: '40%',
    },
    header: {
        alignItems: 'center',
        borderBottomColor: '#e0dfe1',
        borderBottomWidth: 2,
        height: '20%',
        justifyContent: 'center',
        marginBottom: 24,
    },
});
