import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHabitInput {
  @Field()
  habitName: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class ToggleHabitInput {
  @Field()
  habitId: string;

  @Field()
  date: string;
}
