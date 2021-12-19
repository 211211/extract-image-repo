import { Container, decorate, injectable, interfaces } from 'inversify'
import {
    ExtractImageService,
    IExtractImageService
} from '../2 - Domain/Services/ExtractImageService'

import { Client } from '@elastic/elasticsearch'
import { Controller } from 'tsoa'
import { ExtractImageController } from '../1 - REST Interface/Controllers/ExtractImageController'
import { RedisClient } from 'redis'

decorate(injectable(), Controller)

const iocContainer = new Container()

iocContainer
    .bind<RedisClient>('RedisClient')
    .toDynamicValue((ctx: any) => new RedisClient({})) // default is http://localhost:6379
    .inTransientScope()

// iocContainer
//     .bind<Client>('EsClient')
//     .toDynamicValue((ctx: any) => new Client({ node: 'http://localhost:9200' }))
//     .inTransientScope()

iocContainer
    .bind<ExtractImageController>(ExtractImageController)
    .to(ExtractImageController)
    .inTransientScope()

iocContainer
    .bind<IExtractImageService>('IExtractImageService')
    .to(ExtractImageService)
    .inTransientScope()

export { iocContainer }
