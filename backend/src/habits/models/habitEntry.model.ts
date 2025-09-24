import { Field, ObjectType } from '@nestjs/graphql';
import { Habit } from './habit.model';

@ObjectType()
export class HabitEntry {
  @Field()
  id: string;

  @Field()
  date: Date;

  @Field()
  completed: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  habitId: string;

  // Relations
  @Field(() => Habit, { nullable: true })
  habit?: Habit;
}
