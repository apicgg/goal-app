import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (
    event
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
    event
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form className="form-group" onSubmit={onSubmit}>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={onChange}
          />
          <input
            type="password"
            className="form-control"
            id="password2"
            value={password2}
            placeholder="Confirm password"
            onChange={onChange}
          />
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Create Account
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
