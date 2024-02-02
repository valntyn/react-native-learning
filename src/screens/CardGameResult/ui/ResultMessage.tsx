import { StyleSheet, useWindowDimensions, View, Text } from 'react-native';

interface ResultMessageProps {
    className?: string;
}

export const ResultMessage = memo((props: ResultMessageProps) => {
    const { className } = props;
    const { height } = useWindowDimensions();

    return (
        <View className={classNames('', {}, [className])}>
            <Text>ResultMessage</Text>
        </View>
    );
});

const styles = StyleSheet.create({});