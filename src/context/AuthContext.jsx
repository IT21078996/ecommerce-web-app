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

        // Extract the role from the token payload
        const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
        const role = userData[roleClaim]; // Access role from custom claim
        setUser({ ...userData, role }); // Add role to user data
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
                    const role = decodedToken[roleClaim]; // Extract role from the token
                    setUser({ ...decodedToken, role }); // Set the user and role if the token is valid
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
