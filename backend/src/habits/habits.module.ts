import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HabitsController } from './habits.controller';
import { HabitService } from './habits.service';

@Module({
  imports: [PrismaModule],
  providers: [HabitService],
  controllers: [HabitsController],
})
export class HabitsModule {}
