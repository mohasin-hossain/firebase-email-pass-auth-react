import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;

    // Clearing Errr/success messages
    setError("");
    setSuccess("");

    // validation
    if (password.length < 6) {
      setError("Password Must be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password Must have atleast one capital letter");
      return;
    } else if (!accepted) {
      setError("Accept our terms and conditions!");
      return;
    }

    // Creat User Account
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccess("User created successfully!");

        // verify Email
        sendEmailVerification(auth.currentUser).then(() => {
          alert("We've sent a verification email, please verify your email to log in.");
        });
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
          <div className="flex items-center relative">
            <input
              className="input input-bordered w-96"
              placeholder="Password"
              type={showPass ? "text" : "password"}
              name="password"
              id=""
              required
            />
            <span
              className="absolute right-2"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <br />
          <div className="mb-4">
            <input
              className="checkbox mr-2"
              type="checkbox"
              name="terms"
              id="terms"
            />
            <label htmlFor="terms">
              Accept our <a href="">Terms and Conditions</a>
            </label>
          </div>
          <input
            className="btn btn-secondary w-3/4 mb-4"
            type="submit"
            value="Submit"
          />
        </form>
        <p>
          Old User? Please go to the{" "}
          <Link className="link link-primary" to="/login">
            Login
          </Link>{" "}
          page.
        </p>
        {error && <p className="text-red-700">{error}</p>}
        {success && <p className="text-green-700">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
