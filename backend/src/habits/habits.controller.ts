import { Controller } from '@nestjs/common';
import { HabitService } from './habits.service';

@Controller()
export class HabitsController {
  constructor(private readonly habitsService: HabitService) {}
}
