//imports
//const express = require ('express')
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from 'swagger-jsdoc'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import 'express-async-errors'

//security packages 
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

//files imports
import connectDB from './config/db.js'
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoute.js'
import userRoutes from './routes/userRoutes.js'
import jobsRoutes from './routes/jobsRoute.js'
import errorMiddleware from './middelwares/errorMiddleware.js'

//config
dotenv.config() 
//if the .env file is create somewhere else than the root folder 
//dotenv.config({path:''})

// mongodb connection 
connectDB()

//swagger api config
// swagger api options
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title : 'Job Portal Application',
            description:'Node Expressjs Job Portal Application '
        },
        servers:[
            {
                url:"http://localhost:8080",
            },
        ] ,
    },
    apis:['./routes/*.js'],
};

const spec = swaggerDoc(options)

//rest objects
const app = express()


//middlewares
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
 
//routes
app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/job',jobsRoutes)

//homeroute root
app.use("/api-doc",swaggerUi.serve, swaggerUi.setup(spec))
//validation middleware 
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 8080

//lsiten
app.listen(PORT, ()=>{
    console.log(`Node server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgCyan.white)
}) 