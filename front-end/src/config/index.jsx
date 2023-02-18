const config = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    APP_API_URL: process.env.REACT_APP_API_URL,
    LOCALSTORAGE_TOKEN_NAME: 'token',
    PAY_PAL: process.env.REACT_APP_PAYPAL_CLIENT_ID,
}

export const { NODE_ENV, LOCALSTORAGE_TOKEN_NAME, APP_API_URL, PAY_PAL } = config
