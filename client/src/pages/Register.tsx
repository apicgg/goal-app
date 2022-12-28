import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const Register = () => {
  const [formData, setFormData] = useState<React.SetStateAction<FormData>>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  // const { name, email, password, password2 } = formData;

  return <div>Register</div>;
};

export default Register;
