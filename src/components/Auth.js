/* import React, { useEffect, useState } from "react";
import { db, app } from "../services/firebase";
import "firebase/auth";
import { useFirebaseApp, useUser } from "reactfire";

const Auth = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const firebase = useFirebaseApp();
  const user1 = useUser();
  const handleButton = async () => {
    await firebase.auth().createUserWithEmailAndPassword(user, password);
    console.log(user1.email);
  };
  useEffect(() => {
    console.log(user1.email);
  }, []);
  const logout = async () => {
    await firebase.auth().signOut();
  };

  return (
    <>
      {!user1.data && (
        <div>
          <input type="text" onChange={(e) => setUser(e.target.value)}></input>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button onClick={handleButton}>Iniciar Sesion</button>
        </div>
      )}
      {user1.data && (
        <div>
          <button onClick={logout}>Cerrar Sesion</button>
        </div>
      )}
    </>
  );
};

export default Auth; */
