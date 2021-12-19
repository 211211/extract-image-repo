import { IExtractImage } from './../DomainObjects/IExtractImage'
import { isNullOrWhiteSpace } from '../Helpers'
import { inject, injectable } from 'inversify'
import { ffmpegExec } from './ffmpegExec'

export interface IExtractImageService {
    Extract(timestamp: number, url: string): Promise<IExtractImage>
}

@injectable()
export class ExtractImageService implements IExtractImageService {
    public async Extract(
        timestamp: number,
        url: string
    ): Promise<IExtractImage> {
        const response = await ffmpegExec(timestamp, url)
        return {
            body: response
        }
    }
}
