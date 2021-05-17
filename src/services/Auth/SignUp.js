import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import "../../styles/forms.scss";

const SignUp = ({ history }) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSignUp = useCallback(
    async (event) => {
      clearErrors();
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(
          email.value,
          password.value
        );
        await db.collection("users").doc(userCredential.user.uid).set({
          role: "user",
        });
        history.push("/login");
      } catch (err) {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError("Tu email no es válido, proba nuevamente con otro!");
            break;
          case "auth/weak-password":
            setPasswordError("La contraseña debe tener al menos 6 caracteres");
            break;
        }
      }
    },
    [history]
  );
  useEffect(() => {}, []);

  return (
    <div className="container">
      <h1>
        Registrate para asistir a nuestras Meets Beers{" "}
        <i
          class="em em-beers"
          aria-role="presentation"
          aria-label="CLINKING BEER MUGS"
        ></i>
      </h1>

      <form onSubmit={handleSignUp} className="d-flex flex-column">
        <label>Ingresa tu Email</label>
        <input
          required
          name="email"
          type="email"
          className="form-control"
          placeholder="ejemplo@ejemplo.com"
        />
        <div></div>
        <p className="errorMsg">{emailError}</p>
        <label>Ingresa tu Contraseña</label>
        <input
          required
          name="password"
          type="password"
          className="form-control"
          placeholder="Que tenga al menos 6 caracteres"
        />

        <p className="errorMsg">{passwordError}</p>
        <button type="submit" className="btn-lg btn-block register-button">
          Registrarme
        </button>
      </form>
      <p className="text-center mt-2">
        Si ya tienes cuenta haz
        <Link to="/login" className="link mr-1">
          &nbsp; click aqui
        </Link>
      </p>
    </div>
  );
};

export default withRouter(SignUp);
