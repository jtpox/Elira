import userType from '../../user/types/user';

export default interface tokenType {
    session_id: string,
    token: string,
    details: userType,
}