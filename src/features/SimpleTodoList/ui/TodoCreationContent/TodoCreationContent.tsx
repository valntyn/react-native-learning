import { Text, View } from 'react-native';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/lib/ui/Input';
import { RNButton } from '@/shared/lib/ui/Button';
import { SCREEN_WIDTH } from '@/entities/Todo/todo.config';

interface TodoCreationContentProps {
    className?: string;
    onAdd: () => Promise<void>;
    onDismiss: () => void;
    onFocusChange: (isFocused: boolean) => void;
    value: string;
    onChangeValue: (value: string) => void;
}

export const TodoCreationContent = memo((props: TodoCreationContentProps) => {
    const {
        className, onAdd, onDismiss, onFocusChange, onChangeValue, value,
    } = props;

    return (
        <View style={{ flex: 1, padding: 10 }} className={classNames('', {}, [className])}>
            <Input
                placeholder="Enter a todo"
                value={value}
                onChange={onChangeValue}
                onFocusChange={onFocusChange}
                style={{ marginBottom: 10 }}
            />
            <View
                style={{
                    width: '100%',
                    gap: 10,
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                }}
            >
                <RNButton
                    height={48}
                    width={SCREEN_WIDTH / 4}
                    theme="secondary"
                    onPress={onDismiss}
                >
                    <Text>Dismiss</Text>
                </RNButton>
                <RNButton height={48} width={SCREEN_WIDTH / 4} theme="initial" onPress={onAdd}>
                    <Text>Create</Text>
                </RNButton>
            </View>
        </View>
    );
});
