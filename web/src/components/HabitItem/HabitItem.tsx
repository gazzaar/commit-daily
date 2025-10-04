import { useId } from 'react';
import { formatStreak } from '../../util/formatStreak';
const HabitItem = ({ habitData, children }: any) => {
  const reactId = useId();
  const inputId = `${reactId}habit${habitData.id}`;
  return (
    <div className='habit' key={habitData.id}>
      <h2 className='habit-name'>{habitData.habitName}</h2>
      <p className='habit-descriptioin'>{habitData.description}</p>
      <p className='streak'> {formatStreak(habitData.currentStreak)}</p>
      <div className='habit-action'>{children(inputId)}</div>
    </div>
  );
};

export default HabitItem;
