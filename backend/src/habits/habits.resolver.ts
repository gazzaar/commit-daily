import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Req, UseGuards } from '@nestjs/common';
import { HabitService } from './habits.service';
import { Habit } from './models/habit.model';
import { GraphqlJwtAuthGuard } from 'src/authentication/graphql-jwt-auth.guard';
import { RequestUser } from 'src/authentication/interfaces/requestUser.interface';
import { CreateHabitInput } from './inputs/habit.input';

@Resolver(() => Habit)
export class HabitsResolver {
  constructor(private readonly habitsService: HabitService) {}
  @Query(() => [Habit])
  @UseGuards(GraphqlJwtAuthGuard)
  async habits(@Context() context: { req: RequestUser }) {
    const habits = await this.habitsService.getHabitsForUser(
      context.req.user.id,
    );

    return habits;
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
}
