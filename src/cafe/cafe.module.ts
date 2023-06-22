import { Module } from '@nestjs/common';
import { CafeResolver } from './cafe.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafe } from './cafe.entity';

@Module({
  providers: [CafeResolver],
  // imports: [TypeOrmModule.forFeature([Cafe])],
})
export class CafeModule {}
