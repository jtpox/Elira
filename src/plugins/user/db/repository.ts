import { EntityRepository, AbstractRepository } from 'typeorm';

import bcrypt from 'bcrypt';

import User from './entity';

@EntityRepository(User)
export default class UserRepository extends AbstractRepository<User> {
  public async findByEmail(email: string, includePassword: boolean = false): Promise<User | undefined> {
      const repository = this.manager.getRepository(User);
      return (includePassword)?
        await repository.findOne({ where: { email }, select: [
            'id',
            'username',
            'email',
            'password'
        ] })
        : repository.findOne({ where: { email } });
  }

  public async verifyPassword(user: User, password: string): Promise<boolean> {
      return await bcrypt.compare(password, user.password);
  }
}