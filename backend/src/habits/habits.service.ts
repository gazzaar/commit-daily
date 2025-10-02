import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHabitDto } from './dto/createHabit.dto';
import { randomUUID } from 'crypto';
import { getLocalDateString } from './util/getLocalDate';

@Injectable()
export class HabitService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHabitsForUser(userId: string) {
    try {
      const habits = await this.prismaService.habit.findMany({
        where: {
          userId: userId,
        },
        orderBy: { updatedAt: 'desc' },
      });

      if (!habits) {
        return undefined;
      }

      return habits;
    } catch (error) {
      throw new NotFoundException('Error when find habits');
    }
  }

  async createHabit(habit: CreateHabitDto, userId: string) {
    return this.prismaService.habit.create({
      data: {
        id: randomUUID(),
        habitName: habit.habitName,
        description: habit.description ?? null,
        user: { connect: { id: userId } },
      },
    });
  }

  async deleteHabit(habitId: string, userId: string) {
    const habit = await this.prismaService.habit.findUnique({
      where: {
        id: habitId,
        userId: userId,
      },
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    if (habit.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this habit');
    }

    try {
      const deleted = await this.prismaService.habit.delete({
        where: {
          id: habitId,
        },
      });
      if (!deleted) {
        return false;
      }
      return true;
    } catch (error) {
      throw new NotFoundException('Habit not found');
    }
  }

  async getHabitEntries(habitId: string) {
    return await this.prismaService.habitEntry.findMany({
      where: {
        habitId,
      },
      orderBy: { date: 'desc' },
    });
  }

  async getHabitEntryByDate(habitId: string, date: Date) {
    const localDateStr = getLocalDateString(date);
    return await this.prismaService.habitEntry.findFirst({
      where: { habitId, date: new Date(localDateStr) },
    });
  }

  async toggleHabitEntry(habitId: string) {
    const localDateStr = getLocalDateString(new Date());

    const existingEntry = await this.prismaService.habitEntry.findFirst({
      where: { habitId, date: new Date(localDateStr) },
    });

    let entry;

    if (existingEntry) {
      entry = await this.prismaService.habitEntry.update({
        where: { id: existingEntry.id },
        data: { completed: !existingEntry.completed },
      });
    } else {
      entry = await this.prismaService.habitEntry.create({
        data: {
          id: randomUUID(),
          habitId,
          date: new Date(localDateStr),
          completed: true,
        },
      });
    }

    return this.prismaService.habitEntry.findUnique({
      where: { id: entry.id },
      include: {
        habit: {
          include: {
            entries: true,
          },
        },
      },
    });
  }
}
