import { IExtractImage } from './../DomainObjects/IExtractImage'
import { isNullOrWhiteSpace } from '../Helpers'
// import { Client } from '@elastic/elasticsearch'
import { inject, injectable } from 'inversify'

export interface IExtractImageService {
    Extract(
        skip: number,
        take: number,
    ): Promise<IExtractImage>
}

@injectable()
export class ExtractImageService implements IExtractImageService {
    // private readonly esClient: Client

    // constructor(@inject('EsClient') client: Client) {
    //     this.esClient = client
    // }

    public async Extract(
        skip: number,
        take: number,
    ): Promise<IExtractImage> {

        return Promise.resolve(1)
    }
}
