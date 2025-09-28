import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
    return (
        <div className="min-h-screen min-w-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4">Mi App</header>
            <main className="flex-1 p-1">{children}</main>
            <footer className="bg-gray-800 text-white p-2 text-center">© 2025 Mi App</footer>
        </div>
    )
}