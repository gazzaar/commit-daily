import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HabitsResolver } from './habits.resolver';
import { HabitService } from './habits.service';

@Module({
  imports: [PrismaModule],
  providers: [HabitService, HabitsResolver],
})
export class HabitsModule {}
