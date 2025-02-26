interface IPlayer {
  name: string;
  id: string;
  playerSkill: number;
}

interface IPlayerDraw extends IPlayer {
  randomNumber: number;
}

interface DrawnTeam {
  players: IPlayerDraw[];
  totalSkill: number;
}

type Payment = {
  id: string;
  name: string;
  value: string;
  date: Date;
  type: 'mensal' | 'diaria';
};

type MonthlyPayments = {
  month: string;
  monthId: string;
  payers: Payment[];
};

export type {IPlayer, IPlayerDraw, MonthlyPayments, Payment, DrawnTeam};
