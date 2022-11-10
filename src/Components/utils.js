
import { useWindowDimensions  } from 'react-native';

export const getWidth = () => {
    return useWindowDimensions().width;
  };

  export const getHeight = () => {
    return useWindowDimensions().height;
  };