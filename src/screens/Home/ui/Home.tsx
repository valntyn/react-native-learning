import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@/shared/lib/ui/Screen';
import { RNText } from '@/shared/lib/ui/Text';

const styles = StyleSheet.create({});

export const Home = memo(() => {
    return (
        <Screen>
            <View>
                <RNText text="homescreen" />
            </View>
        </Screen>
    );
});
