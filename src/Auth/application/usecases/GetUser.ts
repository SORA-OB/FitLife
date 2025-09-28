import { User } from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class GetUser {
    constructor(private userRepository: UserRepository ) {}
    
    async execute (id:string): Promise<User> {
        return await this.userRepository.getByID(id)
    }
}