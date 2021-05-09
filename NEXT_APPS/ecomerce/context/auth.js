import { createContext, useReducer, useEffect, useContext } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = {
    user: null,
    loggedIn: false
};

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER: return {...state, user: payload, loggedIn: true }
        case LOG_OUT: return {...state, user: null, loggedIn: false }
        default: return state;
    }
}

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = (payload) => dispatch({ type: SET_USER, payload });
    const logout = () => dispatch({ type: LOG_OUT });
    return (
        <AuthDispatchContext.Provider value={{ login, logout }}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    );
}

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export default AuthProvider;