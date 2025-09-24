import { Field, ObjectType, Int } from '@nestjs/graphql';
import { HabitEntry } from './habitEntry.model';

@ObjectType()
export class Habit {
  @Field()
  id: string;

  @Field()
  habitName: string;

  @Field()
  description?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  userId: string;

  @Field(() => [HabitEntry], { nullable: true })
  entries?: HabitEntry[];

  @Field(() => Int)
  currentStreak: number;

  @Field()
  completedToday: boolean;
}
