export const getStorage = () => {
    return +localStorage.getItem('rememberMe') ? localStorage : sessionStorage;
};
