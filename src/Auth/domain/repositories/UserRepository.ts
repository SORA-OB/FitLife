import { User } from "../models/User";

export interface UserRepository {
    getByID(id: string): Promise<User>;
}
