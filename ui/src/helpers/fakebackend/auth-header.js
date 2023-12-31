export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.token) {
        return { 'Authorization': 'Token ' + user.token };
    } else {
        return {};
    }
}