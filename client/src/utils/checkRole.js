import { jwtDecode } from "jwt-decode";
import { checkLogin } from "./checkLogin";
export const checkRole = () => {
    let loggedIn = checkLogin();
    
    if (!loggedIn) {
        const token = localStorage.getItem('hackInShellAccessToken');
        if (token) {
            const user = jwtDecode(token);
            return user.role == 1;
        }
    }
    return false;

};