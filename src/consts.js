const consts = {
    API_URL: process.env.REACT_APP_API_URL,
    LOGIN_USER: process.env.REACT_APP_LOGIN_USER,
    LOGIN_PASSWORD: process.env.REACT_APP_LOGIN_PASSWORD,
    LOGIN_EXPIRATION_TIME:  Number(process.env.REACT_APP_LOGIN_EXPIRATION_TIME || 3600),

    API_TEST_URL: process.env.REACT_APP_API_TEST_URL,
}
export default consts;