import Svg, { Path } from 'react-native-svg';

export default () => {
  return (
    <Svg height='24px' viewBox='0 0 24 24' width='24px' fill='#62B1D6'>
      <Path d='M0 0h24v24H0V0z' fill='none' />
      <Path d='M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' />
    </Svg>
  );
};
