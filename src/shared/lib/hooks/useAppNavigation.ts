import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/shared/lib/config/routeConfig/routeConfig';

export const useAppNavigation = () => {
    return useNavigation<NavigationProp<RootStackParamList>>();
};
