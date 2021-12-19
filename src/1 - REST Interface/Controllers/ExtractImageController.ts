import { Controller, Get, Route, Query, Tags, Header, Request } from 'tsoa'
import { inject, injectable } from 'inversify'
import { IExtractImageService } from '../../2 - Domain/Services/ExtractImageService'
import { Request as ExpressRequest } from 'express'
import { RedisClient } from 'redis'
import { IExtractImageDto } from '../DTOs/IExtractImageDto'

@Route('ffmpeg')
@Tags('Extract Image')
@injectable()
export class ExtractImageController extends Controller {
    private readonly extractImageService: IExtractImageService
    private readonly redisClient: RedisClient

    constructor(
        @inject('IExtractImageService') searchService: IExtractImageService,
        @inject('RedisClient') redisClient: RedisClient
    ) {
        super()

        this.extractImageService = searchService
        this.redisClient = redisClient
    }

    /**
     * Extract image from given timestamp of video via url
     * Uses ffmpeg to extract image behind the scene.
     * @param skip 0
     * @param take: 10
     */
    @Get('/')
    public async Extract(
        @Request() request: ExpressRequest,
        @Query() skip: number = 0,
        @Query() take: number = 10
    ): Promise<IExtractImageDto> {
        try {
            const data = await this.extractImageService.Extract(skip, take)

            // should we cache?
            this.redisClient.set(request.originalUrl, JSON.stringify(data))

            return {
                ok: true,
                data: data,
                error: ''
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message ? error.message : JSON.stringify(error)
            }
        }
    }
}
