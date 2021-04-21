import Cookies from 'universal-cookie'


const setCookie = (value) => {
    let cookies = new Cookies()
    cookies.set('session_token', value, { path: '/' })
}

const getCookie = () => {
    let cookies = new Cookies()
    return cookies.get('session_token')
}

const deleteCookie = () => {
    let cookies = new Cookies()
    cookies.delete('session_token')
}

export {
    setCookie,
    getCookie,
    deleteCookie,
}