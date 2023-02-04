export const HIDE_NAV = 'HIDE_NAV';

export const hideNavbar = (flag) => {
    return {
        type: HIDE_NAV,
        flag
    };
};