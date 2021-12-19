import { Controller, Get, Route, Query, Tags, Header, Request } from 'tsoa'
import { injectable } from 'inversify'

@Route('health')
@Tags('For health check')
@injectable()
export class HealthCheckController extends Controller {
    /**
     * for health check
     */
    @Get('/')
    public async Ready(): Promise<{
        ok: boolean
    }> {
        try {
            return {
                ok: true
            }
        } catch (error) {
            return {
                ok: false
            }
        }
    }
}
