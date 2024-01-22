import { SafeAreaView, StatusBar } from 'react-native';
import { memo } from 'react';
import { LoginForm } from '@/features/AuthByUserName';
import { DismissKeyboard } from '@/shared/lib/components/DissmisKeyboard';

interface AuthProps {
    className?: string;
}

export const Auth = memo((props: AuthProps) => {
    const { className } = props;

    return (
        <DismissKeyboard>
            <SafeAreaView className="flex-1 bg-[#15141a] justify-center">
                <StatusBar barStyle="default" />
                <LoginForm />
            </SafeAreaView>
        </DismissKeyboard>
    );
});
