import { createFileRoute } from '@tanstack/react-router';
import { useCreateHabit, useDeleteHabit, useHabits } from '../hooks/habits';
import HabitItem from '../components/HabitItem/HabitItem';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import { useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

export const Route = createFileRoute('/app/manage-habits')({
  component: HabitManageMent,
});

function HabitManageMent() {
  const { data, isLoading, error } = useHabits();
  const deleteHabit = useDeleteHabit();
  const createHabit = useCreateHabit();
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitDesc, setNewHabitDesc] = useState('');
  const [errors, setErrors] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await deleteHabit.mutateAsync(habitId);
    } catch (error) {
      console.error(error);
    }
  };

  // Create Habit
  const handleCreateHabit = async (e: React.FormEvent) => {
    e.preventDefault();

    (document.activeElement as HTMLElement)?.blur();
    setErrors(null);

    if (!newHabitName.trim() || !newHabitDesc.trim()) {
      setErrors("Entries can't be empty!");
      return;
    }

    try {
      await createHabit.mutateAsync({
        habitName: newHabitName.trim(),
        description: newHabitDesc.trim(),
      });

      setNewHabitName('');
      setNewHabitDesc('');
    } catch (error: any) {
      setErrors(error.message);
      setNewHabitName('');
      setNewHabitDesc('');
      console.error('Failed to create habit', error);
    }
  };

  if (isLoading) return <p>...</p>;
  if (error) return <p>ERROR: {(error as Error).message}</p>;

  return (
    <>
      <aside className="habits-header">
        <div>
          <h1>Your habits</h1>
          <p>Manage and track your daily habits</p>
        </div>
        <button onClick={() => openDialog()} className="btn">
          <span>
            <FaPlus />
          </span>
          Add habit
        </button>
      </aside>
      <div className="habits">
        {data?.habits.map((habit) => (
          <HabitItem habitData={habit} key={habit.id}>
            {() => (
              <>
                <button className="btn-edit">
                  {' '}
                  <span>
                    <TbEdit />
                  </span>{' '}
                  Edit
                </button>
                <button className="btn btn-delete" onClick={() => handleDeleteHabit(habit.id)}>
                  <RiDeleteBin6Line />
                </button>
              </>
            )}
          </HabitItem>
        ))}
      </div>
      <dialog id="dialog" ref={dialogRef} className="dialog">
        <button id="close" onClick={closeDialog}>
          X
        </button>
        <form className="form-add-habit" onSubmit={handleCreateHabit}>
          <div className="input-container">
            <label> Habit Name</label>
            <input
              type="text"
              name="habitName"
              required
              placeholder="Gym"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label> description</label>
            <input
              type="text"
              name="description"
              required
              placeholder="I don't want to be skinny 😞"
              value={newHabitDesc}
              onChange={(e) => setNewHabitDesc(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
            {' '}
            Create Habit
          </button>

          <p className="text-sm text-red-500 min-h-[20px]">{errors ?? ' '}</p>
        </form>
      </dialog>
    </>
  );
}
