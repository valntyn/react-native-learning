import { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

type FeedbackType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

export const useHaptic = (feedbackType: FeedbackType = 'selection') => {
    const createHapticHandler = useCallback((type: Haptics.ImpactFeedbackStyle) => {
        return () => {
            if (Platform.OS !== 'web') {
                Haptics.impactAsync(type);
            }
        };
    }, []);
    const createNotificationFeedback = useCallback((type: Haptics.NotificationFeedbackType) => {
        return () => {
            if (Platform.OS !== 'web') {
                Haptics.notificationAsync(type);
            }
        };
    }, []);

    const hapticHandlers = useMemo(
        () => ({
            light: createHapticHandler(Haptics.ImpactFeedbackStyle.Light),
            medium: createHapticHandler(Haptics.ImpactFeedbackStyle.Medium),
            heavy: createHapticHandler(Haptics.ImpactFeedbackStyle.Heavy),
            selection: Platform.OS === 'web' ? undefined : Haptics.selectionAsync,
            success: createNotificationFeedback(Haptics.NotificationFeedbackType.Success),
            warning: createNotificationFeedback(Haptics.NotificationFeedbackType.Warning),
            error: createNotificationFeedback(Haptics.NotificationFeedbackType.Error),
        }),
        [createHapticHandler, createNotificationFeedback],
    );

    return hapticHandlers[feedbackType];
};
