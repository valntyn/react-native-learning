import {
    createContext, memo, useCallback, useEffect, useState,
} from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { Screen } from '@/shared/lib/ui/Screen';
import { AppRouterEnum, RootStackParamList } from '@/shared/lib/config/routeConfig/routeConfig';
import { RNButton } from '@/shared/lib/ui/Button';
import { RNText } from '@/shared/lib/ui/Text';
import { useTabAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { tabRouterEnum } from '@/shared/lib/config/routeConfig/tabRouterConfig';
import { useHaptic } from '@/shared/lib/hooks/useHaptic';
import { GameProgressArc } from './GameProgressArc';
import { ResultContent } from './ResultContent';
import { ResultMessage } from './ResultMessage';
import { Congratulation } from '@/shared/lib/ui/Congratulation';

const styles = StyleSheet.create({});

export const CardGameResultContext = createContext<{
    params: RootStackParamList[AppRouterEnum.CARD_GAME_RESULT];
}>(null!);

export const CardGameResult = memo(
    ({ route }: NativeStackScreenProps<RootStackParamList, AppRouterEnum.CARD_GAME_RESULT>) => {
        const { params } = route;
        const { height } = useWindowDimensions();

        const [isAnimVisible, setIsAnimVisible] = useState(false);

        const navigation = useTabAppNavigation();

        const hapticSelection = useHaptic('success');

        const onProgressEnd = useCallback(() => {
            setIsAnimVisible((prev) => !prev);
            hapticSelection?.();
        }, [hapticSelection]);

        const onNavigate = () => {
            navigation.navigate(tabRouterEnum.VOCABULARY);
        };

        useEffect(() => {
            return setIsAnimVisible(false);
        }, []);

        const isShowCongratulation = isAnimVisible && params.correctAnswers >= params.totalAnswers / 2;

        return (
            <Screen
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CardGameResultContext.Provider value={{ params }}>
                    <GameProgressArc onProgressEnd={onProgressEnd} />
                    <ResultContent isAnimVisible={isAnimVisible} />
                    <ResultMessage />
                    <RNButton
                        fullWidth
                        style={{ position: 'absolute', bottom: -height * 0.15 }}
                        onPress={onNavigate}
                    >
                        <RNText text="Complete" type="defaultSecondary" family="InterBold" />
                    </RNButton>
                </CardGameResultContext.Provider>

                {isShowCongratulation && <Congratulation style={{ position: 'absolute' }} />}
            </Screen>
        );
    },
);
