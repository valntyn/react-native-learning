import { StyleSheet, Text, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Size = 'm' | 'l';

interface RNTextProps extends TextStyle {
    text: string;
    textWeight?: '400' | '700';
    center?: boolean;
    textSize?: Size;
    style?: StyleProp<ViewStyle>;
}

const size: Record<Size, number> = {
    m: 16,
    l: 20,
};

export const RNText = (props: RNTextProps) => {
    const {
        textSize = 'm', center = true, textWeight = '400', style, text, ...otherProps
    } = props;

    const styles = StyleSheet.create({
        text: {
            fontFamily: 'Inter',
            fontSize: size[textSize],
            fontWeight: textWeight,
        },
    });

    return (
        <Text style={styles.text} {...otherProps}>
            {text}
        </Text>
    );
};
