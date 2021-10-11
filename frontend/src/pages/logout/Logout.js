function Logout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:02 GMT';

    return document.location.href = '/';
}

export default Logout;
