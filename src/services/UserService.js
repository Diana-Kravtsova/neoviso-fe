import { getStorage } from './StorageService';

export const getUser = () => {
    const token = getStorage().getItem('accessToken');
    let user = null;

    if (token) {
        user = JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1]))));
    }

    return user;
};

export const hasPermission = (permissions) => {
    return getUser().roles?.some(value => permissions.includes(value));
};

export const isCurrentEmployee = (employee) => {
    return employee.userId === getUser().id;
};

export const logOut = () => {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = '/';
};
