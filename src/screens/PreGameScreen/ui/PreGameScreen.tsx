import { memo, useCallback, useRef } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { RNText } from '@/shared/lib/ui/Text';
import { Screen } from '@/shared/lib/ui/Screen';
import { RNButton } from '@/shared/lib/ui/Button';
import { AppRouterEnum, RootStackParamList } from '@/shared/lib/config/routeConfig/routeConfig';
import { CardList } from '@/screens/PreGameScreen/ui/CardList/CardList';
import { HeaderBar } from '@/widgets/HeaderBar';
import { Icon, IconType } from '@/shared/lib/ui/Icon';
import { globalStyles } from '@/app/styles/globalStyles';
import { useGetCards, usePostCard } from '@/entities/Cards/api/cardApi';
import { BottomSheet, BottomSheetPropsRef } from '@/shared/lib/ui/BottomSheet';

export const PreGameScreen = memo(
    ({ route }: NativeStackScreenProps<RootStackParamList, AppRouterEnum.PRE_GAME_SCREEN>) => {
        const navigation = useAppNavigation();
        const { params } = route;
        const ref = useRef<BottomSheetPropsRef>(null);

        const { data } = useGetCards({
            packId: params.packId,
        });

        const [postCardMutation] = usePostCard();

        // TODO refactor general func
        const openDrawer = useCallback(() => {
            const isActive = ref?.current?.isActive();
            if (isActive) {
                ref?.current?.scrollTo(0);
                Keyboard.dismiss();
            } else {
                ref?.current?.scrollTo(-250);
            }
        }, []);

        if (!data) {
            return null;
        }

        return (
            <Screen withBottom={false}>
                <HeaderBar>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <RNButton
                            width={100}
                            onPress={() => navigation.navigate(AppRouterEnum.CARD_GAME, {
                                packId: params.packId,
                            })}
                        >
                            <RNText text="game" />
                        </RNButton>
                        <RNButton width={60} theme="secondary" onPress={openDrawer}>
                            <Icon
                                icon={{ type: IconType.FontAwesomeIcon, iconName: 'plus' }}
                                color={globalStyles.primaryText}
                                size={24}
                            />
                        </RNButton>
                    </View>
                </HeaderBar>
                <CardList cards={data} />
                <BottomSheet ref={ref}>
                    <View />
                </BottomSheet>
            </Screen>
        );
    },
);

const styles = StyleSheet.create({});
