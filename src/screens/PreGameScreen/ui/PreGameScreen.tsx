import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { RNText } from '@/shared/lib/ui/Text';
import { Screen } from '@/shared/lib/ui/Screen';
import { RNButton } from '@/shared/lib/ui/Button';
import { AppRouterEnum, RootStackParamList } from '@/shared/lib/config/routeConfig/routeConfig';
import { useGetPack } from '@/entities/Cards/api/packApi';
import { CardList } from '@/screens/PreGameScreen/ui/CardList/CardList';
import { HeaderBar } from '@/widgets/HeaderBar';
import { Icon, IconType } from '@/shared/lib/ui/Icon';
import { globalStyles } from '@/app/styles/globalStyles';

const styles = StyleSheet.create({});

export const PreGameScreen = memo(
    ({ route }: NativeStackScreenProps<RootStackParamList, AppRouterEnum.PRE_GAME_SCREEN>) => {
        const navigation = useAppNavigation();
        const { params } = route;

        const { data } = useGetPack({
            packId: params.packId,
        });

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
                        <RNButton width={60} theme="secondary">
                            <Icon
                                icon={{ type: IconType.FontAwesomeIcon, iconName: 'plus' }}
                                color={globalStyles.primaryText}
                                size={24}
                            />
                        </RNButton>
                    </View>
                </HeaderBar>
                <CardList cards={data.cards} />
            </Screen>
        );
    },
);
