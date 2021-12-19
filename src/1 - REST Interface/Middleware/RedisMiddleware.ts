import express from 'express'
const redis = require('redis')
const PORT_REDIS = process.env.PORT_REDIS || 6379
const redisClient = redis.createClient(PORT_REDIS)

// clear previous data
;(() => {
    let retryCount = 0

    const flushallRetryHandler = function (err: Error) {
        if (err) {
            retryCount++
            if (retryCount > 8) {
                throw new Error(
                    'Unable to find started redis. Last error: ' + err
                )
            } else {
                setTimeout(function () {
                    redisClient.flushall(flushallRetryHandler)
                }, Math.pow(2, retryCount + 3))
            }
        }
    }

    redisClient.flushall(flushallRetryHandler)
})()

export default async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    let key = req.originalUrl
    redisClient.get(key, (error: Error, data: any) => {
        if (error) {
            res.status(400).send(error)
        }
        if (data !== null) {
            res.status(200).send(JSON.parse(data))
        } else next()
    })
}
