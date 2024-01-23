import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { RNText } from '@/shared/lib/ui/Text';
import { Screen } from '@/shared/lib/ui/Screen';

const styles = StyleSheet.create({});

export const Profile = memo(() => {
    const navigation = useAppNavigation();

    return (
        <Screen>
            <RNText text="Profile" />
        </Screen>
    );
});
