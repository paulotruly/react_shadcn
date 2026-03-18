import type { AuthResponse } from "@/types/types";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
    user: AuthResponse | null;
    isAuthentic: boolean;
    isLoading: boolean;
    login: (data: AuthResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,              
    isAuthentic: false,      
    isLoading: false,        
    login: () => {}, 
    logout: () => {} 
})

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    
    const [user, setUser] = useState<AuthResponse | null>(null);
    const [isAuthentic, setIsAuthentic] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const login = (data: AuthResponse) => {
        setUser(data)  
    }

    const logout = () => {
        setUser(null)
    }
    
    return (
        <AuthContext.Provider
            value={{
                user,                        
                isAuthentic: !!user,         
                isLoading,                   
                login,                      
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    
    return context;
}