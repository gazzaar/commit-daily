import { createFileRoute } from '@tanstack/react-router';
import { useCreateHabit, useDeleteHabit, useHabits } from '../hooks/habits';
import HabitItem from '../components/HabitItem/HabitItem';

export const Route = createFileRoute('/app/manage-habits')({
  component: HabitManageMent,
});

function HabitManageMent() {
  const { data, isLoading, error } = useHabits();
  const deleteHabit = useDeleteHabit();
  const createHabit = useCreateHabit();

  const handleDeleteHabit = async (habitId: string) => {
    try {
      if (confirm('Are you sure?')) {
        await deleteHabit.mutateAsync(habitId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Create Habit
  const handleCreateHabit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const habitName = formData.get('habitName') as string;
    const description = formData.get('description') as string;

    if (!habitName.trim()) return;

    try {
      await createHabit.mutateAsync({
        habitName: habitName.trim(),
        description: description.trim(),
      });

      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      console.error('Failed to create habit');
    }
  };

  if (isLoading) return <p>...</p>;
  if (error) return <p>ERROR: {(error as Error).message}</p>;

  return (
    <>
      {data?.habits.map((habit) => (
        <HabitItem habitData={habit} key={habit.id}>
          <button onClick={() => handleDeleteHabit(habit.id)}>
            Delete - X{' '}
          </button>
        </HabitItem>
      ))}
      <div>
        <form onSubmit={handleCreateHabit}>
          <div>
            <label> Habit Name</label>
            <input type='text' name='habitName' required />
          </div>

          <div>
            <label> description</label>
            <input type='text' name='description' required />
          </div>
          <button type='submit'> Create Habit</button>
        </form>
      </div>
    </>
  );
}
