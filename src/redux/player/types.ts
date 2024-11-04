export type tPlayer = {
  drawnPlayers: {name: string; id: string}[] | null;
  storedPlayers: {name: string; id: string; randomNumber: number}[];
};
