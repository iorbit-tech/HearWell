
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import Toast from 'react-native-root-toast';

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

export const showToast = (errors, color, multiple) => {
  if (multiple !== true) multiple = false;

  if (color !== true) color = "#000";

  if (Array.isArray(errors)) {
    errors = errorMessage(errors, multiple);
  } else {
    errors = errors;
  }
  if (errors) {
    Toast.show(errors, {
      duration: 3000,
      backgroundColor: color,
      position: -30,
      animation: true,
      shadow: false,
      hideOnPress: true,
      opacity: 0.9,
    });
  }
};