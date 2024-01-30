import { StyleSheet, View } from 'react-native';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RNText } from '@/shared/lib/ui/Text';
import { getCorrectCount, getWrongCount } from '../../../model/selectors/getCardsGameSelectors';
import { globalStyles } from '@/app/styles/globalStyles';

interface CountAnswersProps {
    className?: string;
}

export const CountAnswers = memo((props: CountAnswersProps) => {
    const { className } = props;

    const correctCount = useSelector(getCorrectCount);
    const wrongCount = useSelector(getWrongCount);

    return (
        <View style={styles.countBox}>
            <View style={styles.labelContainer}>
                <RNText text="Correct" textSize="l" type="defaultSecondary" family="InterBold" />
                <RNText
                    text={correctCount.toString()}
                    textSize="l"
                    family="RobotoBold"
                    type="success"
                />
            </View>
            <View style={styles.labelContainer}>
                <RNText text="Wrong" textSize="l" type="defaultSecondary" family="InterBold" />
                <RNText
                    text={wrongCount.toString()}
                    textSize="l"
                    family="RobotoBold"
                    type="error"
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    countBox: {
        backgroundColor: globalStyles.primaryText,
        borderRadius: 20,
        height: 100,
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: 140,
    },
    labelContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
