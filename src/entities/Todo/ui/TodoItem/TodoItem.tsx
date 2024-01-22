import { Pressable, Text, useWindowDimensions } from 'react-native';
import Animated, {
    Extrapolation,
    FadeIn,
    interpolate,
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
import {
    LIST_ITEM_HEIGHT,
    LIST_ITEM_MARGIN,
    SCREEN_WIDTH,
    TRANSLATE_X_THRESHOLD,
} from '@/entities/Todo/todo.config';
import { todoItemStyles } from '@/entities/Todo/ui/TodoItem/styles';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(Pressable);

interface TodoItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    item: GetTodo;
    onDelete: (id: string) => void;
    scrollY: any;
    index: number;
}

// todo avoid magic numbers, avoid any
export const TodoItem = memo((props: TodoItemProps) => {
    const {
        item, onDelete, simultaneousHandlers, scrollY, index,
    } = props;
    const { height } = useWindowDimensions();
    const [putTodoMutation] = usePutTodos();
    const [isChecked, setIsChecked] = useState(item.completed);

    const onChangeStatus = useCallback(
        async (state: boolean) => {
            setIsChecked(state);
            await putTodoMutation({ ...item, completed: state });
        },
        [item, putTodoMutation],
    );

    const translateX = useSharedValue(0);
    const startPosition = 50 * index;
    const containerHeight = height - 250 - 100;
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

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
            ],
        };
    });

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

    const rLastContainerTodoStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollY.value,
                        [startPosition - containerHeight, startPosition - containerHeight + 350],
                        [-35, 0],
                        Extrapolation.CLAMP,
                    ),
                },
            ],
        };
    });

    return (
        <Animated.View style={[todoItemStyles.container, rContainerTodoStyle]}>
            <Animated.View style={rLastContainerTodoStyle}>
                <Animated.View style={[todoItemStyles.iconContainer, rIconContainerStyle]}>
                    <FontAwesome5
                        entering={FadeIn.duration(200)}
                        name="trash-alt"
                        size={24}
                        color="tomato"
                    />
                </Animated.View>
                <PanGestureHandler
                    activeOffsetX={[-10, 10]}
                    onGestureEvent={panGesture}
                    simultaneousHandlers={simultaneousHandlers}
                >
                    <AnimatedTouchableOpacity
                        entering={FadeIn.duration(200)}
                        onPress={() => onChangeStatus(!isChecked)}
                        style={[
                            todoItemStyles.content,
                            rStyle,
                            { backgroundColor: isChecked ? '#e2e2e2' : 'transparent' },
                        ]}
                    >
                        <CustomCheckbox isChecked={isChecked} onToggle={onChangeStatus} />
                        <Text style={todoItemStyles.text}>{item.description}</Text>
                    </AnimatedTouchableOpacity>
                </PanGestureHandler>
            </Animated.View>
        </Animated.View>
    );
});
