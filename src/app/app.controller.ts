import { Controller, Get, HttpException } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { StatusDto, ProbeDto } from './dto'

@Controller()
@ApiTags('Probes')
export class AppController {
  constructor(
    @InjectDataSource() private readonly postgresConnection: DataSource,
  ) {}

  @Get('status')
  @ApiResponse({
    status: 200,
    description: 'Status endpoint',
    type: StatusDto,
  })
  getStatus() {
    return { status: 'OK' }
  }

  @Get('livenessProbe')
  @ApiResponse({
    status: 200,
    description: 'Liveness probe endpoint',
    type: ProbeDto,
  })
  async livenessProbe() {
    try {
      const res = await Promise.all([
        this.postgresConnection.query('SELECT NOW()'),
      ])
      return { time: res[0][0].now }
    }
    catch (err) {
      throw new HttpException((err as Error).message, 500)
    }
  }

  @Get('readinessProbe')
  @ApiResponse({
    status: 200,
    description: 'Readiness probe endpoint',
    type: ProbeDto,
  })
  readinessProbe() {
    return { time: Date.now() }
  }
}
