import { StyleSheet } from 'react-native';
import { memo, ReactNode } from 'react';
import Markdown from 'react-native-markdown-display';

interface MarkdownDisplayProps {
    className?: string;
    children: ReactNode;
}

const markdownStyles = StyleSheet.create({
    body: {
        fontFamily: 'InterRegular',
        fontSize: 16,
        lineHeight: 22,
    },
    heading1: {
        color: '#404040',
        fontFamily: 'InterBold',
        fontSize: 28,
        lineHeight: 40,
        marginBottom: 5,
        marginTop: 10,
    },
    heading2: {
        color: '#404040',
        fontFamily: 'InterBold',
        lineHeight: 32,
        marginBottom: 5,
        marginTop: 10,
    },
});

export const MarkdownDisplay = memo((props: MarkdownDisplayProps) => {
    const { className, children } = props;

    return <Markdown style={markdownStyles}>{children}</Markdown>;
});

const styles = StyleSheet.create({});
