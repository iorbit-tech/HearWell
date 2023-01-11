import { useColorScheme } from 'react-native';

import darkColors from './dark';
import lightColors from './light';

export const ThemeColors = () => {
    const colors = (useColorScheme() == 'dark') ? darkColors : lightColors;
    return colors;
};