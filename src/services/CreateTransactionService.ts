import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    const balance = this.transactionsRepository.getBalance();
    const totalBalance = balance.total;

    if (type === 'outcome' && value > totalBalance) {
      throw Error('Value is more than total');
    }

    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
