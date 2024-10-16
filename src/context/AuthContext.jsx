import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (token) => {
        localStorage.setItem('jwtToken', token);
        const userData = jwtDecode(token);

        const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
        const email = userData.sub;
        const role = userData[roleClaim];
        const userId = userData.id;
        setUser({ ...userData, role, email, userId });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('jwtToken');
    };

    // Check if the user is already logged in by checking localStorage
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    logout();
                } else {
                    const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
                    const email = decodedToken.sub;
                    const role = decodedToken[roleClaim];
                    setUser({ ...decodedToken, role, email });
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                logout();
            }
        }
        setLoading(false); // Set loading to false after the token check is done
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
