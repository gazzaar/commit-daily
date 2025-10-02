import { createFileRoute } from '@tanstack/react-router';
import { useCreateHabit, useDeleteHabit, useHabits } from '../hooks/habits';
import HabitItem from '../components/HabitItem/HabitItem';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import { useRef, useState } from 'react';

export const Route = createFileRoute('/app/manage-habits')({
  component: HabitManageMent,
});

function HabitManageMent() {
  const { data, isLoading, error } = useHabits();
  const deleteHabit = useDeleteHabit();
  const createHabit = useCreateHabit();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await deleteHabit.mutateAsync(habitId);
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
    } catch (error) {
      console.error('Failed to create habit', error);
    }
  };

  if (isLoading) return <p>...</p>;
  if (error) return <p>ERROR: {(error as Error).message}</p>;

  return (
    <>
      <button onClick={() => openDialog()}>Add new habit</button>
      <div className='habits'>
        {data?.habits.map((habit) => (
          <HabitItem habitData={habit} key={habit.id}>
            {() => (
              <>
                <button className='btn-edit'>
                  {' '}
                  <span>
                    <TbEdit />
                  </span>{' '}
                  Edit
                </button>
                <button
                  className='btn btn-delete'
                  onClick={() => handleDeleteHabit(habit.id)}
                >
                  <RiDeleteBin6Line />
                </button>
              </>
            )}
          </HabitItem>
        ))}
      </div>
      <dialog id='dialog' ref={dialogRef} className='dialog'>
        <button id='close' onClick={closeDialog}>
          Close
        </button>
        <form className='form-add-habit' onSubmit={handleCreateHabit}>
          <div className='input-container'>
            <label> Habit Name</label>
            <input type='text' name='habitName' required />
          </div>

          <div className='input-container'>
            <label> description</label>
            <input type='text' name='description' required />
          </div>
          <button className='btn' type='submit'>
            {' '}
            Create Habit
          </button>
        </form>
      </dialog>
    </>
  );
}
