import Cookies from 'js-cookie'

export const setToken = (token: string) => {
    Cookies.set('accessToken', token, { expires: 1/48 })
}

export const getToken = () => Cookies.get('accessToken')

export const removeToken = () => Cookies.remove('accessToken')