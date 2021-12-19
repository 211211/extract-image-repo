import 'reflect-metadata'

import { MINUTE_IN_MS } from './Constants'
// @ts-ignore
import { RegisterRoutes } from './routes'
// import { RegisterServices } from './registerServices'
import RequestLogger from './1 - REST Interface/Middleware/RequestLogger'
// import appsettings from './appsettings.json'
import bodyParser from 'body-parser'
import cors from 'cors'
// import { createConnection } from 'typeorm'
import express from 'express'
import rateLimit from 'express-rate-limit'

const swaggerUiPath = require('swagger-ui-dist').absolutePath()

;(async () => {
    // get environment variables from .env
    const envPath = require('find-config')('.env')
    const result = require('dotenv').config({ path: envPath })
    if (result.error) {
        throw 'Missing environment!'
    }

    const {
        APPLICATION_PORT,
        WHITELIST_DOMAINS,
        NODE_ENV = 'development'
    } = process.env

    if (!APPLICATION_PORT) {
        console.error('Missing APPLICATION_PORT!')
        process.exit(1)
    }

    if (!WHITELIST_DOMAINS) {
        throw new Error('Missing WHITELIST_DOMAINS environment!')
    }

    if (!NODE_ENV) {
        throw new Error('Missing NODE_ENV environment!')
    }

    // First we make sure we can connect to the database
    // if (appsettings.UseDatabase) await createConnection()
    // await RegisterServices()

    // Then we can start our express web server
    const app = express()

    // Log all request to this API
    app.use(RequestLogger)

    const whiteListDomains = WHITELIST_DOMAINS.split(',')

    // Standard middleware
    app.use(cors({ origin: whiteListDomains }))

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json({ limit: '50mb' }))

    // Routing static content via middleware
    // app.use('/v1/images', express.static('public'))

    // Only show Swagger if server is in development mode
    if (NODE_ENV !== 'production') {
        // Swagger definition files
        app.use('/definitions/', express.static('definitions'))

        // Make swagger-ui available
        app.use('/swagger-ui', express.static(swaggerUiPath))

        // Redirect to API definition for the developer
        app.get('/swagger', (req: express.Request, res: express.Response) => {
            res.redirect('/swagger-ui/?url=/definitions/swagger.json')
        })
    }

    // Create a rate limiting
    const limiter = rateLimit({
        windowMs: MINUTE_IN_MS,
        max: 150,
        message: 'Slow down boi'
    })

    // Apply rate limiter to all requests
    app.use(limiter)

    // Let TSOA register the controllers
    RegisterRoutes(app)

    // Error handling
    app.use(
        (err: any, req: express.Request, res: express.Response, next: any) => {
            if (err.status && err.status === 401) {
                // Not authorized or authenticated - Return info to user
                res.status(401).json(err)
            } else if (err.status && err.status === 400) {
                // The developer made an error. Return the error to the developer
                res.status(400).json(err)
            } else {
                // We fucked up - Only return HTTP 500 and log the error
                console.log('[ERROR]', 'Internal error', err)
                res.status(500)
                res.end()
            }
        }
    )

    app.listen(APPLICATION_PORT, () =>
        console.log(`Service is listening on port ${APPLICATION_PORT}`)
    )
})()
