import { EntityRepository, AbstractRepository } from 'typeorm';

import bcrypt from 'bcrypt';

import Session from './entity';

import User from '../../user/db/entity';

@EntityRepository(Session)
export default class SessionRepository extends AbstractRepository<Session> {
    public async verifySession(sessionId: string, sessionToken: string) {
        const session = await this.manager.getRepository(Session).findOne({
            where: {
                session_id: sessionId,
            },
        });

        if (!session) {
            return false;
        }

        if(!await bcrypt.compare(sessionToken, session.token)) {
            return false;
        }

        return true;
    }

    public async createSession(user: User, token: string): Promise<Session> {
        const session = new Session();
        session.author = user.id;
        session.token = token;

        return this.manager.getRepository(Session).save(session);
    }
}