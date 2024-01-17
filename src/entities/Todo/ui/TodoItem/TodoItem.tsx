import { Dimensions, Pressable, Text } from 'react-native';
import Animated, {
    FadeIn,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { memo, useCallback, useState } from 'react';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { GetTodo } from '@/entities/Todo';
import { CustomCheckbox } from '@/shared/lib/ui/Checkbox';
import { usePutTodos } from '@/entities/Todo/api/todoApi';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(Pressable);

interface TodoItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    item: GetTodo;
    onDelete: (id: string) => () => void;
    isDeleting?: boolean;
    className?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.1;
const LIST_ITEM_MARGIN = 16;
const LIST_ITEM_HEIGHT = 50;

// TODO need to refactor styles and decompose general logic
export const TodoItem = memo((props: TodoItemProps) => {
    const {
        item, className, onDelete, isDeleting, simultaneousHandlers,
    } = props;
    const [putTodoMutation, { isLoading }] = usePutTodos();

    const [isChecked, setIsChecked] = useState(item.completed);

    const onChangeStatus = useCallback(
        async (state: boolean) => {
            setIsChecked(state);
            await putTodoMutation({ ...item, completed: state });
        },
        [item, putTodoMutation],
    );

    const translateX = useSharedValue(0);
    const itemMargin = useSharedValue(LIST_ITEM_MARGIN);
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
    const opacity = useSharedValue(1);

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;

            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemMargin.value = withTiming(0);
                itemHeight.value = withTiming(0);
                opacity.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished && onDelete) {
                        runOnJS(onDelete)(item.id);
                    }
                });
            } else {
                translateX.value = withTiming(0);
            }
        },
    });

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);

        return { opacity };
    });

    const rContainerTodoStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginTop: itemMargin.value,
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View
            style={[
                {
                    position: 'relative',
                    justifyContent: 'center',
                },
                rContainerTodoStyle,
            ]}
        >
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                    },
                    rIconContainerStyle,
                ]}
            >
                <FontAwesome5
                    entering={FadeIn.duration(500)}
                    name="trash-alt"
                    size={24}
                    color="tomato"
                    onPress={onDelete(item.id)}
                />
            </Animated.View>
            <PanGestureHandler
                onGestureEvent={panGesture}
                simultaneousHandlers={simultaneousHandlers}
            >
                <AnimatedTouchableOpacity
                    entering={FadeIn.duration(500)}
                    onPress={() => onChangeStatus(!isChecked)}
                    style={[
                        {
                            backgroundColor: isChecked ? '#e2e2e2' : 'transparent',
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            zIndex: 1,
                        },
                        rStyle,
                    ]}
                >
                    <CustomCheckbox isChecked={isChecked} onToggle={onChangeStatus} />
                    <Text style={{ marginLeft: 10 }}>{item.description}</Text>
                </AnimatedTouchableOpacity>
            </PanGestureHandler>
        </Animated.View>
    );
});
