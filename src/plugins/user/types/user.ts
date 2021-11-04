import { UserRole } from "../enums";

export default interface User {
    id: number;
    username: string;
    email: string;
    privilege: UserRole,
}