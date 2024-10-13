import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (token) => {
        // Store token in localStorage
        localStorage.setItem('jwtToken', token);

        // Decode the token to get user details
        const userData = jwtDecode(token);

        // Extract the role, email, and userId from the token payload
        const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
        const email = userData.sub;
        const role = userData[roleClaim];
        const userId = userData.id;
        setUser({ ...userData, role, email, userId }); // Add them to user data
    };

    const logout = () => {
        setUser(null); // Clear user data
        localStorage.removeItem('jwtToken'); // Clear the token from localStorage
    };

    // Check if the user is already logged in by checking localStorage
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                // Decode the token to get user details
                const decodedToken = jwtDecode(token);

                // Check if the token is expired
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    // Token is expired, log out the user
                    logout();
                } else {
                    const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
                    const email = decodedToken.sub;
                    const role = decodedToken[roleClaim]; // Extract role from the token
                    setUser({ ...decodedToken, role, email }); // Set the user and role if the token is valid
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                logout();
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
