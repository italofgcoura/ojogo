interface IPlayer {
  name: string;
  id: string;
}

interface IPlayerDraw extends IPlayer {
  randomNumber: number;
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

export type {IPlayer, IPlayerDraw, MonthlyPayments, Payment};
