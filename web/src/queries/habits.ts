import { graphql } from "../gql";

export const AllHabitsQuery = graphql(`
  query AllHabits {
    habits {
      id
      habitName
      description
      createdAt
      completedToday
      currentStreak
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
      completedToday
      currentStreak
    }
  }
`);

export const DeleteHabitMutation = graphql(`
  mutation DeleteHabit($habitId: String!) {
    deleteHabit(habitId: $habitId)
  }
`);

export const ToggleHabitMutation = graphql(`
  mutation ToggleHabit($input: ToggleHabitInput!) {
    toggleHabit(input: $input) {
      completed
      habit {
        currentStreak
      }
    }
  }
`);
