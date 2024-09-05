import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async resetProblemFlags(): Promise<number> {
    const usersWithProblems = await this.userRepository.count({ where: { hasProblems: true } });
    await this.userRepository.update({ hasProblems: true }, { hasProblems: false });
    return usersWithProblems;
  }

}
