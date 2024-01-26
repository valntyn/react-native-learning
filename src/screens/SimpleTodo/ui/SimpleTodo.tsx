import { Text } from 'react-native';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Screen } from '@/shared/lib/ui/Screen';
import { SimpleTodoList } from '@/features/SimpleTodoList/SimpleTodoList';
import { getUserAuthData } from '@/entities/User';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { AppRouterEnum } from '@/shared/lib/config/routeConfig/routeConfig';

interface SimpleTodoProps {
    className?: string;
}

export const SimpleTodo = memo((props: SimpleTodoProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const navigation = useAppNavigation();

    if (!authData?.id) {
        navigation.navigate(AppRouterEnum.AUTH);
        return null;
    }

    return (
        <Screen>
            <Text className="text-gray-500 italic mb-4">Press to finish an activity</Text>
            <SimpleTodoList userId={authData?.id} />
        </Screen>
    );
});
