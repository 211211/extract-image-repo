import { Container, decorate, injectable, interfaces } from 'inversify'
import {
    ExtractImageService,
    IExtractImageService
} from '../2 - Domain/Services/ExtractImageService'

import { Controller } from 'tsoa'
import { ExtractImageController } from '../1 - REST Interface/Controllers/ExtractImageController'
import { HealthCheckController } from '../1 - REST Interface/Controllers/HealthCheckController'

decorate(injectable(), Controller)

const iocContainer = new Container()

iocContainer
    .bind<ExtractImageController>(ExtractImageController)
    .to(ExtractImageController)
    .inTransientScope()

iocContainer
    .bind<HealthCheckController>(HealthCheckController)
    .to(HealthCheckController)
    .inTransientScope()

iocContainer
    .bind<IExtractImageService>('IExtractImageService')
    .to(ExtractImageService)
    .inTransientScope()

export { iocContainer }
