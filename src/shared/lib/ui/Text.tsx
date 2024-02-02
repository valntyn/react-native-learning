import { StyleSheet, Text } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Size = 'm' | 'l' | 'xl';
type Family = 'InterRegular' | 'InterBold' | 'RobotoRegular' | 'RobotoBold';
type Type = 'success' | 'warn' | 'error' | 'default' | 'defaultSecondary';

interface RNTextProps extends TextStyle {
    text: string;
    textWeight?: '400' | '700';
    type?: Type;
    family?: Family;
    center?: boolean;
    textSize?: Size;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
}

const size: Record<Size, number> = {
    m: 16,
    l: 20,
    xl: 24,
};

const typeColor: Record<Type, string> = {
    default: '#001621',
    defaultSecondary: '#fff',
    error: 'tomato',
    warn: '#f8bb1e',
    success: '#84ce01',
};

export const RNText = (props: RNTextProps) => {
    const {
        textSize = 'm',
        center = true,
        textWeight = '400',
        style,
        text,
        type = 'default',
        family = 'InterRegular',
        numberOfLines = 1,
        ...otherProps
    } = props;

    const styles = StyleSheet.create({
        text: {
            color: typeColor[type],
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
