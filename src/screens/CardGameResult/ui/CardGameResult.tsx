import { memo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { Screen } from '@/shared/lib/ui/Screen';
import { Congratulation } from '@/shared/lib/ui/Congratulation';
import { useHaptic } from '@/shared/lib/hooks/useHaptic';
import { ArcProgress } from '@/shared/lib/ui/ArcProgress';
import { AppRouterEnum, RootStackParamList } from '@/shared/lib/config/routeConfig/routeConfig';

const styles = StyleSheet.create({});

export const CardGameResult = memo(
    ({ route }: NativeStackScreenProps<RootStackParamList, AppRouterEnum.CARD_GAME_RESULT>) => {
        const { params } = route;

        const hapticSelection = useHaptic('success');
        useEffect(() => {
            hapticSelection?.();
        }, [hapticSelection]);

        return (
            <Screen>
                <ArcProgress
                    completeQnty={params?.correctAnswers}
                    totalQnty={params?.totalAnswers}
                />
                <Congratulation />
            </Screen>
        );
    },
);
