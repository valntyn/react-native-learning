import { StyleSheet, Text } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Size = 'm' | 'l';
type Family = 'InterRegular' | 'InterBold' | 'RobotoRegular' | 'RobotoBold';

interface RNTextProps extends TextStyle {
    text: string;
    textWeight?: '400' | '700';
    family?: Family;
    center?: boolean;
    textSize?: Size;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
}

const size: Record<Size, number> = {
    m: 16,
    l: 20,
};

export const RNText = (props: RNTextProps) => {
    const {
        textSize = 'm',
        center = true,
        textWeight = '400',
        style,
        text,
        family = 'InterRegular',
        numberOfLines = 1,
        ...otherProps
    } = props;

    const styles = StyleSheet.create({
        text: {
            fontFamily: family,
            fontSize: size[textSize],
            fontWeight: textWeight,
        },
    });

    return (
        <Text style={[styles.text, style]} numberOfLines={numberOfLines} {...otherProps}>
            {text}
        </Text>
    );
};
