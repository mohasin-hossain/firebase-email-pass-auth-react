import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
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
          <input
            className="input input-bordered w-96"
            placeholder="Password"
            type="password"
            name="password"
            id=""
          />
          <br />
          <input
            className="btn btn-secondary w-3/4 mb-4"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
