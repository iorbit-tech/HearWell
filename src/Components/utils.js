
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';

export const getWidth = () => {
  return useWindowDimensions().width;
};

export const getHeight = () => {
  return useWindowDimensions().height;
};

export const AppBarStyle = (color, titleColor, tintColor, title, headerRight, headerLeft) => {
  const navigation = useNavigation();
  return (
    navigation.setOptions({
      title: title,
      headerStyle: { backgroundColor: color },
      headerTitleStyle: {
        color: titleColor
      },
      headerTintColor: tintColor,
      headerRight: () => headerRight,
      headerLeft: () => headerLeft,
    })
  )
}