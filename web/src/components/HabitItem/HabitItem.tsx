import { useId } from 'react';
import { formatStreak } from '../../util/formatStreak';
import { Checkbox } from '@heroui/checkbox';
const HabitItem = ({ habitData, children }: any) => {
  const reactId = useId();
  const inputId = `${reactId}habit${habitData.id}`;
  // TODO: fix date local issue and iso
  return (
    <div className='habit' key={habitData.id}>
      <h2 className='habit-name'>{habitData.habitName}</h2>
      <p className='habit-descriptioin'>{habitData.description}</p>
      <p className='streak'> {formatStreak(habitData.currentStreak)}</p>
      {/* <p>{new Date(habitData.createdAt).toISOString()}</p> */}

      <div className='habit-action'>{children(inputId)}</div>
    </div>
  );
};

export default HabitItem;
