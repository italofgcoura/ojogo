import Svg, {Path} from 'react-native-svg';
import {Colors} from '../designSystem';

export default () => {
  return (
    <Svg height="36px" viewBox="0 0 24 24" width="36px" fill={Colors.error}>
      <Path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
      <Path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" />
    </Svg>
  );
};
