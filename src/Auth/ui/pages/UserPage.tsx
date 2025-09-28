import { useEffect, useState } from "react";
import { MainLayout } from "../../../globalSources/layouts/MainLayout";
import { MockUserRepository } from "../../infrastructure/repositories/MockUserRepository";
import { GetUser } from "../../application/usecases/GetUser";
import { User } from "../../domain/models/User";

export const UserPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        const repo = new MockUserRepository();
        const getUser = new GetUser(repo);

        getUser.execute("2")
            .then(setUser)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <MainLayout>
            <h1 className="text-2xl font-bold mb-4">User Info</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {user && (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}
        </MainLayout>
    );
};
