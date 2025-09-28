import {
  AllHabitsQuery,
  CreateHabitMutation,
  DeleteHabitMutation,
  ToggleHabitMutation,
} from '../queries/habits';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gqlClient } from '../lib/gqlClient';

export const useHabits = () => {
  return useQuery({
    queryKey: ['habits'],
    queryFn: () => {
      return gqlClient.request(AllHabitsQuery);
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) =>
      gqlClient.request(CreateHabitMutation, { data }),
    onSuccess: (newHabit) => {
      queryClient.setQueryData(['habits'], (old: any) => ({
        habits: [newHabit.createHabit, ...(old?.habits || [])],
      }));
    },
    onError: () => {
      console.error('Failed to create habit');
    },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (habitId: string) =>
      gqlClient.request(DeleteHabitMutation, { habitId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },

    onError: () => {
      console.error('Failed to create habit');
    },
  });
};

export const useToggleHabit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: any) =>
      gqlClient.request(ToggleHabitMutation, { input }),

    onSuccess: (data, variables) => {
      queryClient.setQueryData(['habits'], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          habits: oldData.habits.map((habit: any) =>
            habit.id === variables.habitId
              ? {
                  ...habit,
                  completedToday: data.toggleHabit.completed,
                  currentStreak: data.toggleHabit.habit?.currentStreak,
                }
              : habit,
          ),
        };
      });
    },

    onError: (err) => {
      console.error('Failed to toggle habit', err);
    },
  });
};
