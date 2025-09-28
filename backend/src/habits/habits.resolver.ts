import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Req, UseGuards } from '@nestjs/common';
import { HabitService } from './habits.service';
import { Habit } from './models/habit.model';
import { GraphqlJwtAuthGuard } from 'src/authentication/graphql-jwt-auth.guard';
import { RequestUser } from 'src/authentication/interfaces/requestUser.interface';
import { CreateHabitInput, ToggleHabitInput } from './inputs/habit.input';
import { HabitEntry } from './models/habitEntry.model';

@Resolver(() => Habit)
export class HabitsResolver {
  constructor(private readonly habitsService: HabitService) {}

  private calculateCurrentStreak(entries: HabitEntry[]): number {
    if (!entries || entries.length === 0) return 0;

    // Sort entries by date (newest first)
    const sortedEntries = entries
      .filter((entry) => entry.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (sortedEntries.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    const currentDate = new Date(today);

    // Check if today or yesterday has an entry (streak can continue)
    const latestEntry = new Date(sortedEntries[0].date);
    const daysDiff = Math.floor(
      (today.getTime() - latestEntry.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysDiff > 1) return 0; // Streak broken if more than 1 day gap

    // Count consecutive days
    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date);
      const expectedDate = new Date(currentDate);
      expectedDate.setDate(expectedDate.getDate() - i);

      // Normalize dates to compare only the date part
      const entryDateStr = entryDate.toISOString().split('T')[0];
      const expectedDateStr = expectedDate.toISOString().split('T')[0];

      if (entryDateStr === expectedDateStr) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  @Query(() => [Habit])
  @UseGuards(GraphqlJwtAuthGuard)
  async habits(@Context() context: { req: RequestUser }) {
    const habits = await this.habitsService.getHabitsForUser(
      context.req.user.id,
    );

    return habits;
  }

  @ResolveField(() => [HabitEntry], { nullable: true })
  async entries(@Parent() habit: Habit) {
    return this.habitsService.getHabitEntries(habit.id);
  }

  @ResolveField(() => Int)
  async currentStreak(@Parent() habit: Habit) {
    const entries = await this.habitsService.getHabitEntries(habit.id);
    return this.calculateCurrentStreak(entries);
  }

  @ResolveField()
  async completedToday(@Parent() habit: Habit) {
    const now = new Date();
    const todayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
    const todayEntry = await this.habitsService.getHabitEntryByDate(
      habit.id,
      todayUTC,
    );
    return todayEntry?.completed || false;
  }

  @Mutation(() => Habit)
  @UseGuards(GraphqlJwtAuthGuard)
  async createHabit(
    @Args('data') data: CreateHabitInput,
    @Context() context: { req: RequestUser },
  ) {
    return await this.habitsService.createHabit(data, context.req.user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GraphqlJwtAuthGuard)
  async deleteHabit(
    @Args('habitId', { type: () => String }) habitId: string,
    @Context() context: { req: RequestUser },
  ) {
    return await this.habitsService.deleteHabit(habitId, context.req.user.id);
  }

  @Mutation(() => HabitEntry)
  @UseGuards(GraphqlJwtAuthGuard)
  async toggleHabit(@Args('input') input: ToggleHabitInput) {
    const parsed = new Date(input.date);
    return await this.habitsService.toggleHabitEntry(input.habitId, parsed);
  }
}
