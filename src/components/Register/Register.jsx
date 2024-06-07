import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Clearing Errr/success messages
    setError("");
    setSuccess("");

    if(password.length < 6) {
        setError("Password Must be at least 6 characters");
        return;
    } else if (!/[A-Z]/.test(password)) {
        setError("Password Must have atleast one capital letter");
        return;
    }

    // Creat User Account
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccess("User created successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div>
      <h1 className="text-center mb-2 text-3xl">Please Register</h1>
      <div className="border mx-auto max-w-2xl">
        <form onSubmit={handleRegister} className="grid place-items-center">
          <input
            className="input input-bordered w-96 mt-4"
            placeholder="Name"
            type="text"
            name="name"
            id=""
          />
          <br />
          <input
            className="input input-bordered w-96"
            placeholder="Email"
            type="email"
            name="email"
            id=""
            required
          />
          <br />
          <input
            className="input input-bordered w-96"
            placeholder="Password"
            type="password"
            name="password"
            id=""
            required
          />
          <br />
          <input
            className="btn btn-secondary w-3/4 mb-4"
            type="submit"
            value="Submit"
          />
        </form>
        {error && <p className="text-red-700">{error}</p>}
        {success && <p className="text-green-700">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
