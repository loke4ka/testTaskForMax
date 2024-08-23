import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async create(transaction: Transaction): Promise<Transaction> {
    return this.transactionsRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }

  async findOne(id: number): Promise<Transaction> {
    return this.transactionsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.transactionsRepository.delete(id);
  }

  async findAllPaginated(page: number, limit: number): Promise<{ transactions: Transaction[], total: number }> {
    const [transactions, total] = await this.transactionsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { transactions, total };
  }  


}
