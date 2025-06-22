import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dbIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  checkAll() {
    return this.health.check([
      () => this.dbIndicator.pingCheck('database', { timeout: 1500 }),
    ]);
  }
}