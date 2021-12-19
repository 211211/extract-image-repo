import express from 'express'

interface ITokenValidRequest {
    Token: string
}

export interface ITokenValidResponse {
    IsValid: boolean
    DecodedToken: JWT
}

interface JWT {
    id: string
    scopes: string[]
}

/**
 * This is a standard implementation to check a token inside of a micro service architecture.
 * It needs a running authentication service in the network which serves an "auth:isTokenValid" service
 * @param request
 * @param securityName
 * @param scopes
 */
export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    return new Promise(async (resolve, reject) => {
        if (securityName !== 'Bearer')
            return reject(new Error('Unknown authentication method provided'))

        const headerValue = request.headers['Authorization'] as string
        const token = headerValue.split(' ')[1]

        return false
    })
}
