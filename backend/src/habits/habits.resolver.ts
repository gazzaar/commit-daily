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
import { getLocalDateString } from './util/getLocalDate';

@Resolver(() => Habit)
export class HabitsResolver {
  constructor(private readonly habitsService: HabitService) {}

  private calculateCurrentStreak(entries: HabitEntry[]): number {
    if (!entries || entries.length === 0) return 0;

    // Completed entries sorted newest first by local date string
    const completedEntries = entries
      .filter((e) => e.completed)
      .sort((a, b) =>
        getLocalDateString(b.date).localeCompare(getLocalDateString(a.date)),
      );

    if (completedEntries.length === 0) return 0;

    const todayStr = getLocalDateString(new Date());
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);

    const latestEntryDateStr = getLocalDateString(
      new Date(completedEntries[0].date),
    );

    // Allow streak to continue if the latest completed day is today or yesterday
    if (
      latestEntryDateStr !== todayStr &&
      latestEntryDateStr !== yesterdayStr
    ) {
      return 0; // Streak broken before yesterday
    }

    let streak = 0;
    const baseDateStr = latestEntryDateStr; // start counting backward from the latest completed day

    for (let i = 0; i < completedEntries.length; i++) {
      const entryDateStr = getLocalDateString(
        new Date(completedEntries[i].date),
      );
      const expectedDate = new Date(baseDateStr);
      expectedDate.setDate(expectedDate.getDate() - i);
      const expectedDateStr = getLocalDateString(expectedDate);

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
    const localDateStr = getLocalDateString(new Date());
    const todayEntry = await this.habitsService.getHabitEntryByDate(
      habit.id,
      new Date(localDateStr),
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
    return await this.habitsService.toggleHabitEntry(input.habitId);
  }
}
