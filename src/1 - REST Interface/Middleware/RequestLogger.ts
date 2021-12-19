import express from 'express'
import shortid from 'shortid'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { getDate } from '../../Helpers'

interface IRequest extends express.Request {
    user?: any
}

const getLevelForStatusCode = (statusCode: number): string => {
    if (statusCode >= 500) {
        // Internal server errors are logged as errors
        return 'error'
    }

    if (statusCode >= 400) {
        // user errors are logged as warnings
        return 'warn'
    }

    return 'info'
}

export default async (
    req: IRequest,
    res: express.Response,
    next: express.NextFunction
) => {
    // Making the request unique
    ;(req as any).requestId = shortid.generate()

    const log = async (level: string, ...args: any[]) => {
        ;(console as any)[level](
            new Date().toISOString(),
            `[${(req as any).requestId}]`,
            level,
            ...args
        )

        // Write log to file if production as well
        if (process.env.NODE_ENV === 'production') {
            const folderPath = path.join(process.cwd(), 'logs')
            const filePath = path.join(folderPath, `server_${getDate()}.log`)
            await fs.ensureDir(folderPath)
            await fs.ensureFile(filePath)

            await fs.appendFile(
                filePath,
                `${new Date().toISOString()} [${
                    (req as any).requestId
                }] ${level} ${args.join(' ')}` + os.EOL
            )
        }
    }

    await log(
        'info',
        req.method,
        req.originalUrl,
        req.user && req.user.id
            ? `User: ${req.user.id} Scope: ${req.user.scope}`
            : ''
    )

    const handleResponseFinished = async () => {
        cleanup()
        const level = getLevelForStatusCode(res.statusCode)
        await log(
            level,
            res.statusCode,
            res.statusMessage,
            `${res.get('Content-Length') || 0}b sent`,
            res.statusCode && res.statusCode === 401
                ? `Required Scopes were: ${(req as any)['scopes']} IP:${req.ip}`
                : ''
        )
    }

    const handleResponseAborted = async () => {
        cleanup()
        await log('warn', 'Request was aborted')
    }

    const handleInternalError = async (err: Error) => {
        cleanup()
        await log('error', 'Request pipeline error: ', err)
    }

    const cleanup = () => {
        res.removeListener('finish', handleResponseFinished)
        res.removeListener('close', handleResponseAborted)
        res.removeListener('error', handleInternalError)
    }

    res.on('finish', handleResponseFinished)
    res.on('close', handleResponseAborted)
    res.on('error', handleInternalError)

    next()
}
