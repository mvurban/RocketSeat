import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

export default interface PlantCardProps extends RectButtonProps {
   data: {
      name:string,
      photo:string,
      hour:string,
   }
}
