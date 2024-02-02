import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList as TabRootStackParamList } from '@/shared/lib/config/routeConfig/tabRouterConfig';
import { RootStackParamList } from '@/shared/lib/config/routeConfig/routeConfig';

export const useAppNavigation = () => {
    return useNavigation<NavigationProp<RootStackParamList>>();
};

export const useTabAppNavigation = () => {
    return useNavigation<NavigationProp<TabRootStackParamList>>();
};
