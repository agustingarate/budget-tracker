import { TransactionType } from "../types";

interface ITransaction {
  amount: number;
  description: string;
  type: "income" | "expense";
}

export interface IBalance {
  total: number;
  transactions: Transaction[];
}

export default class Balance implements IBalance {
  constructor(public total: number, public transactions: Transaction[]) {}

  public copyWith(modifyObject: {
    [P in keyof Balance]?: Balance[P];
  }): Balance {
    return Object.assign(Object.create(Balance.prototype), {
      ...this,
      ...modifyObject,
    });
  }

  static fromObject(data: any) {
    return new Balance(data.total, data.transactions ?? []);
  }
}

export class Transaction implements ITransaction {
  constructor(
    public amount: number,
    public description: string,
    public type: TransactionType,
    public id?: string,
  ) {}

  public copyWith(modifyObject: {
    [P in keyof Transaction]?: Transaction[P];
  }): Transaction {
    return Object.assign(Object.create(Transaction.prototype), {
      ...this,
      ...modifyObject,
    });
  }

  static fromObject(data: any, id: any) {
    return new Transaction(
      data.amount,
      data.description,
      data.type,
      data.id ?? id,
    );
  }
}
