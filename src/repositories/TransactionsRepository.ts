import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce<number>(
      (previousValue: number, currentValue: Transaction): number => {
        return currentValue.type === 'income'
          ? previousValue + currentValue.value
          : previousValue;
      },
      0,
    );

    const outcome = this.transactions.reduce<number>(
      (previousValue: number, currentValue: Transaction): number => {
        return currentValue.type === 'outcome'
          ? previousValue + currentValue.value
          : previousValue;
      },
      0,
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
