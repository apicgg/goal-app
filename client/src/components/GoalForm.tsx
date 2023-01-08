import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const GoalForm = () => {
  const [text, setText] = useState("");

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input type="text" id="text" value={text} onChange={onChange} />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
