import { Controller, Get, Route, Query, Tags, Request } from 'tsoa'
import { inject, injectable } from 'inversify'
import { IExtractImageService } from '../../2 - Domain/Services/ExtractImageService'
import { Request as ExpressRequest } from 'express'
import { IExtractImageDto } from '../DTOs/IExtractImageDto'

@Route('ffmpeg')
@Tags('Extract Image')
@injectable()
export class ExtractImageController extends Controller {
    private readonly extractImageService: IExtractImageService

    constructor(
        @inject('IExtractImageService') searchService: IExtractImageService
    ) {
        super()

        this.extractImageService = searchService
    }

    /**
     * Extract image from given timestamp of video via url
     * Uses ffmpeg to extract image behind the scene.
     * @param timestamp Number | seconds
     * @param url: e.g: https://public-anios-dev.s3.ap-southeast-1.amazonaws.com/jungle_3s.mp4
     */
    @Get('/image')
    public async Extract(
        @Request() request: ExpressRequest,
        @Query() timestamp: number = 0,
        @Query() url: string = ''
    ): Promise<IExtractImageDto> {
        try {
            const data = await this.extractImageService.Extract(timestamp, url)

            // should we cache?
            // this.redisClient.set(request.originalUrl, JSON.stringify(data))

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
