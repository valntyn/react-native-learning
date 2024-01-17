import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.1;
export const LIST_ITEM_MARGIN = 16;
export const LIST_ITEM_HEIGHT = 50;
