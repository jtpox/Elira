import userType from '../../../types/user';

export default interface tokenType {
    session_id: string,
    token: string,
    user: userType,
}