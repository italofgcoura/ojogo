import {IPlayerDraw} from '../interfaces';

const orderByName = (playersList: IPlayerDraw[]) => {
  return playersList?.sort((a, b) => a?.name.localeCompare(b?.name));
};

export default orderByName;
