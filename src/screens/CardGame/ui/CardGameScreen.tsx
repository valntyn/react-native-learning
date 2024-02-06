import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { Screen } from '@/shared/lib/ui/Screen';
import { AppRouterEnum, RootStackParamList } from '@/shared/lib/config/routeConfig/routeConfig';
import { FlippingVocabularyCards } from '@/features/FlippingVocabularyCards';
import { useGetCards } from '@/entities/Cards/api/cardApi';

const styles = StyleSheet.create({});

export const CardGameScreen = memo(
    ({ route }: NativeStackScreenProps<RootStackParamList, AppRouterEnum.CARD_GAME>) => {
        const { params } = route;

        const { data } = useGetCards({
            packId: params.packId,
        });

        if (!data) {
            return null;
        }

        return (
            <Screen>
                <FlippingVocabularyCards data={data} />
            </Screen>
        );
    },
);
