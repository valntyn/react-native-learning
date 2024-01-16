import { memo, useCallback, useState } from 'react';
import {
    SafeAreaView, StatusBar, StyleSheet, View,
} from 'react-native';
import { onboardingSteps } from '../const';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { Indicators } from './Indicators/Indicators';
import { InitialContent } from '@/screens/Initial/ui/InitialContent/InitialContent';
import { AppRouterEnum } from '@/shared/lib/config/routeConfig/routeConfig';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#15141a',
        flex: 1,
        paddingBottom: 60,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
});

export const Initial = memo(() => {
    const [positionIndex, setPositionIndex] = useState(0);

    const data = onboardingSteps[positionIndex];
    const navigation = useAppNavigation();

    const onContinue = useCallback(() => {
        const isLastScreen = positionIndex === onboardingSteps.length - 1;

        if (isLastScreen) {
            setPositionIndex(0);
        } else {
            setPositionIndex((prev) => prev + 1);
        }
    }, [positionIndex]);

    const onSkip = useCallback(() => {
        setPositionIndex(0);
        navigation.navigate(AppRouterEnum.HOME);
    }, [navigation]);

    const onBack = useCallback(() => {
        if (positionIndex === 0) {
            return;
        }

        setPositionIndex((prev) => prev - 1);
    }, [positionIndex]);

    return (
        <SafeAreaView className="flex-1 bg-[#15141a]">
            <View style={styles.page}>
                <StatusBar barStyle="default" />

                <Indicators positionIndex={positionIndex} />
                <InitialContent
                    data={data}
                    onContinue={onContinue}
                    onSkip={onSkip}
                    onBack={onBack}
                    positionIndex={positionIndex}
                />
            </View>
        </SafeAreaView>
    );
});
