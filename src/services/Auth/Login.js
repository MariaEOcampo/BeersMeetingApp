import React, { useState } from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { AuthenticationWithPersistance } from "../../utils/sessionManager";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userData = await AuthenticationWithPersistance(email, password);
      const UID = userData.user.uid;
      const user = await db.collection("users").doc(UID).get();
      console.log(user.data());
      user.data().role === "admin" ? history.push("/admin") : history.push("/");
      clearErrors();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError("El email no es correcto");
          break;
        case "auth/wrong-password":
          setPasswordError("La contraseña no es correcta :(");
          break;
      }
    }
  };

  return (
    <div className="container">
      <h1>
        Logueate para ingresar{" "}
        <i
          class="em em-closed_lock_with_key icon-login"
          aria-role="presentation"
          aria-label="CLOSED LOCK WITH KEY"
        ></i>
      </h1>
      <form onSubmit={handleLogin}>
        <label>Tu Email</label>
        <input
          required
          name="email"
          type="email"
          className="form-control"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <p className="errorMsg">{emailError}</p>
        <label>Tu Contraseña</label>
        <input
          required
          name="password"
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>

        <button type="submit" className="btn-lg btn-block register-button">
          Registrarme
        </button>
        <p className="ml-2">
          No estas registrado?, hace
          <Link to="/signup" className="link mr-1">
            &nbsp; click aqui
          </Link>
        </p>
      </form>
    </div>
  );
};

export default withRouter(Login);
