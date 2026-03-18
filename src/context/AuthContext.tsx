import type { AuthResponse } from "@/types/types";
import { createContext, useContext, useReducer, type ReactNode } from "react";

type AuthState = {
    user: AuthResponse | null;
    isAuthentic: boolean;
    isLoading: boolean;
}

type AuthAction = 
    | { type: "LOGIN"; payload: AuthResponse }
    | { type: "LOGOUT" }
    | { type: "SET_LOADING"; payload: boolean };

function AuthReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                isAuthentic: true,
                isLoading: false
            };
        
        case "LOGOUT":
            return {
                ...state, 
                user: null,
                isAuthentic: false,
                isLoading: false
            };
        
        case "SET_LOADING":
            return {
                ...state, 
                isLoading: action.payload
            };
    }
}

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
});

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,          
        isAuthentic: false, 
        isLoading: false   
    });

    const login = (data: AuthResponse) => {
        dispatch({ type: "LOGIN", payload: data });
    }

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    }
    
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isAuthentic: !!state.user,
                isLoading: state.isLoading,
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