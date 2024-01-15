import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { onboardingSteps } from '@/screens/Initial/const';

const styles = StyleSheet.create({
    step: {
        backgroundColor: 'grey',
        borderRadius: 10,
        flex: 1 / 2,
        height: 4,
    },
    stepIndicator: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        marginBottom: 60,
    },
});

interface IndicatorsProps {
    positionIndex: number;
}

export const Indicators = memo((props: IndicatorsProps) => {
    const { positionIndex } = props;

    return (
        <View style={styles.stepIndicator}>
            {onboardingSteps.map((_, index) => (
                <View
                    style={[
                        styles.step,
                        { backgroundColor: index === positionIndex ? '#cef202' : 'grey' },
                        { flex: index === positionIndex ? 1 : 1 / 2 },
                    ]}
                    key={index}
                />
            ))}
        </View>
    );
});
