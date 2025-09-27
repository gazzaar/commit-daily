import {
  AllHabitsQuery,
  CreateHabitMutation,
  DeleteHabitMutatioin,
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
        habits: [...(old?.habits || []), newHabit.createHabit],
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
      gqlClient.request(DeleteHabitMutatioin, { habitId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },

    onError: () => {
      console.error('Failed to create habit');
    },
  });
};
