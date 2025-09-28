const HabitItem = ({ habitData, children }: any) => {
  return (
    <>
      <div>
        <div key={habitData.id}>
          <h1>{habitData.habitName}</h1>
          <p>{habitData.description}</p>
          <p>{habitData.completedToday ? 'Completed' : 'No No '}</p>
          <p>{habitData.currentStreak}</p>
          <p>{new Date(habitData.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      {children}
    </>
  );
};

export default HabitItem;
