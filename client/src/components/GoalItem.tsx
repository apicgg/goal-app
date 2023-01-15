// TODO: add type for goal props
const GoalItem = (props: any) => {
  return (
    <div className="goal">
      <div>
        {new Date(props.goal.createdAt).toLocaleString("en-US")}
        <h2>{props.goal.text}</h2>
      </div>
    </div>
  );
};

export default GoalItem;
