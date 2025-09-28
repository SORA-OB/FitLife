import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/models/User";

const mockUsers: User[] = [
    { id: "1", name: "Arturo Ortiz", email: "arturo@example.com" },
    { id: "2", name: "Lisa", email: "lisa@example.com" },
]

export class MockUserRepository implements UserRepository {
    async getByID(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            const user = mockUsers.find(u => u.id === id);
            setTimeout(() => {
                if(user) resolve (user);
                else reject(new Error("user not found"))
            }, 500)
        })
    }
}