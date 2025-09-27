import { graphql } from '../gql';

export const AllHabitsQuery = graphql(`
  query AllHabits {
    habits {
      id
      habitName
      description
      createdAt
    }
  }
`);

export const CreateHabitMutation = graphql(`
  mutation CreateHabit($data: CreateHabitInput!) {
    createHabit(data: $data) {
      id
      habitName
      description
      createdAt
    }
  }
`);

export const DeleteHabitMutatioin = graphql(`
  mutation DeleteHabit($habitId: String!) {
    deleteHabit(habitId: $habitId)
  }
`);
