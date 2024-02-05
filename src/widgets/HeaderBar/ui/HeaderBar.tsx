import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { memo, ReactNode } from 'react';
import { RNButton } from '@/shared/lib/ui/Button';
import { Icon, IconType } from '@/shared/lib/ui/Icon';
import { globalStyles } from '@/app/styles/globalStyles';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';

interface HeaderBarProps {
    children: ReactNode;
}

export const HeaderBar = memo((props: HeaderBarProps) => {
    const { children } = props;
    const { height } = useWindowDimensions();
    const navigation = useAppNavigation();

    return (
        <View
            style={{
                flexDirection: 'row',
                marginBottom: height * 0.01,
            }}
        >
            <RNButton
                width={100}
                style={{ alignItems: 'flex-start', marginRight: 'auto' }}
                theme="outlined"
                onPress={() => navigation.goBack()}
            >
                <Icon
                    icon={{ type: IconType.Ionicon, iconName: 'arrow-back' }}
                    size={32}
                    color={globalStyles.primaryText}
                />
            </RNButton>
            {children}
        </View>
    );
});

const styles = StyleSheet.create({});
