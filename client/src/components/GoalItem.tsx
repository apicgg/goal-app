import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

type Props = {
  goal: {
    _id: string;
    text: string;
    createdAt: string;
  };
};

// TODO: add type for goal props
const GoalItem = ({ goal }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>
        {new Date(goal.createdAt).toLocaleString("en-US")}
        <h2>{goal.text}</h2>
        <button
          // @ts-ignore
          onClick={() => dispatch(deleteGoal(goal._id))}
          className="close"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default GoalItem;
