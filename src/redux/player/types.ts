import {IPlayer, IPlayerDraw} from '../../interfaces';

export type tPlayer = {
  drawnPlayers: IPlayer[] | null;
  storedPlayers: IPlayerDraw[];
};
