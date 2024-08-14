// token functions

const TOKENKEY = 'token_key'

// store woken 
function setToekn (token) {
    localStorage.setItem(TOKENKEY, token) 
}

// get token
function getToken () {
    return localStorage.getItem(TOKENKEY)
}

// delete token
function removeToken () {
    localStorage.removeItem(TOKENKEY)
}


export {
    setToekn, 
    getToken, 
    removeToken
}
