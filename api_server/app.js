
const express = require('express')
const app = express()
const joi = require('joi')
const bodyParser = require('body-parser')
const path = require('path')

//cors
const cors = require('cors')
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// err middleware
app.use((req, res, next) => {
    // statue = 1 --> fail
    // err  -->  error object / error string 
    res.cc = (err, status = 1) => {
        res.send({
            status, 
            message: err instanceof Error ? err.message : err
        })
    } 

    next()
})

// analysis roken 
// must before router 
const config = require('./config')
const expressJWT= require('express-jwt')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//]}))


// router
const userRouter = require('./router/user')
app.use('/api', userRouter)

const userInfoRouter = require('./router/userInfo')
app.use('/my', userInfoRouter)

const artcateRouter = require('./router/artcate')
app.use('/my/article', artcateRouter)

const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)

const pictureRouter = require('./router/pictures')
app.use('/public', pictureRouter)

app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.send(err)
    }
    if (err.name === 'UnauthorizedError') {
        return res.send('Authentication failed!')
    }
    // unkown error
    res.send(err.message)
})



app.listen(3007, () => {
    console.log('API server running at http://127.0.0.1:3007')
})