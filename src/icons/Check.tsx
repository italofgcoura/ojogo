import Svg, { Path } from 'react-native-svg';

export default () => {
  return (
    // <Svg height='24px' viewBox='0 0 24 24' width='24px' fill='#62B1D6'>
    //   <Path d='M0 0h24v24H0V0z' fill='none' />
    //   <Path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z' />
    // </Svg>
    <Svg height='24px' viewBox='0 0 24 24' width='24px' fill='#62B1D6'>
      <Path d='M0 0h24v24H0z' fill='none' />
      <Path d='M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
    </Svg>
  );
};
