import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Clearing Errr/success messages
    setError("");
    setSuccess("");

    // Validation
    if (password.length < 6) {
      setError("Password Must be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password Must have atleast one capital letter");
      return;
    }

    // Login user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccess("user logged in successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div>
      <h1 className="text-center mb-2 text-3xl">Please Login</h1>
      <div className="border mx-auto max-w-2xl">
        <form onSubmit={handleLogin} className="grid place-items-center">
          <input
            className="input input-bordered w-96 mt-4"
            placeholder="Email"
            type="email"
            name="email"
            id=""
          />
          <br />
          <div className="relative flex items-center">
            <input
              className="input input-bordered w-96"
              placeholder="Password"
              type={showPass ? "text" : "password"}
              name="password"
              id=""
            />
            <span
              className="absolute right-2"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <br />
          <input
            className="btn btn-secondary w-3/4 mb-4"
            type="submit"
            value="Submit"
          />
        </form>
        <p>
          New to our website? Please go to the {" "}
          <Link className="link link-primary" to="/register">Registration</Link> page.
        </p>
        {error && <p className="text-red-700">{error}</p>}
        {success && <p className="text-green-700">{success}</p>}
      </div>
    </div>
  );
};

export default Login;
