import { Link, useLocation } from "react-router-dom";

export const AuthTabs = () => {
    const location = useLocation();
    const isLogin = location.pathname === '/';
    const isRegister = location.pathname === '/register';

    return (
        <div className="flex mb-12 border-b border-red-200">
            <Link 
                to="/"
                className={`pb-2 px-4 text-xl font-bold cursor-pointer transition-colors ${
                    isLogin 
                        ? 'text-[#CE1E1E] border-b-4 border-red-500' 
                        : 'text-[#D67E7E] hover:text-red-500'
                }`}
            >
                LOGIN
            </Link>
            <Link 
                to="/register"
                className={`pb-2 px-4 text-xl font-bold cursor-pointer transition-colors ${
                    isRegister 
                        ? 'text-[#CE1E1E] border-b-4 border-red-500' 
                        : 'text-[#D67E7E] hover:text-red-500'
                }`}
            >
                SIGN UP
            </Link>
        </div>
    );
};