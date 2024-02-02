import { StyleSheet, useWindowDimensions, View, Text } from 'react-native';

interface GameProgressArcProps {
    className?: string;
}

export const GameProgressArc = memo((props: GameProgressArcProps) => {
    const { className } = props;
    const { height } = useWindowDimensions();

    return (
        <View className={classNames('', {}, [className])}>
            <Text>GameProgressArc</Text>
        </View>
    );
});

const styles = StyleSheet.create({});