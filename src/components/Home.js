import React, { useEffect, useState } from "react";
import { app, db, auth, firebase } from "../services/firebase";
import "firebase/auth";
import { getWeather } from "../services/weather.js";
import MeetCard from "../components/MeetCard";
import "./../styles/home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  const [meets, setMeets] = useState([]);
  const [positionDay, setPositionDay] = useState([]);
  let numberOfDay;

  const getMeets = async () => {
    db.collection("meets").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setMeets(docs);
    });
  };

  const confirmAsist = async (id) => {
    const uid = auth.currentUser.uid;
    const update = await db
      .collection("meets")
      .doc(id)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(uid),
      });
    return update;
  };

  const checkTemperature = async (meet, index) => {
    switch (meet.fecha) {
      case "mañana":
        numberOfDay = 0;
        break;
      case "pasado-mañana":
        numberOfDay = 1;
        break;
      case "tras-pasado-mañana":
        numberOfDay = 2;
        break;
      default:
        break;
    }

    setPositionDay(numberOfDay);

    const tempData = await getWeather();
    let temperature = tempData.list[numberOfDay].main.temp_max;
    const aux = { ...meet, ...{ temperature } };
    meets[index] = aux;

    setMeets([...meets]);
  };

  useEffect(() => {
    getMeets();
    getWeather();
  }, []);

  const logout = async () => {
    await app
      .auth()
      .signOut()
      .then(() => {
        alert("¡Hasta la próxima!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <div className="container">
        <h1>
          {" "}
          <i
            class="em em-calendar icon-event"
            aria-role="presentation"
            aria-label="TEAR-OFF CALENDAR"
          ></i>
          Próximos Eventos
        </h1>
        <div className="col-md-8 col-md-12">
          {meets.map((meet, index) => (
            <div className="card mb-3">
              <MeetCard
                meet={meet}
                checkTemperature={checkTemperature}
                index={index}
                checkBeers={false}
                deleteMeeting={false}
              />

              {auth.currentUser ? (
                <button
                  className="btn btn-block btn-asist"
                  disabled={meet.users.includes(auth.currentUser.uid)}
                  onClick={() => confirmAsist(meet.id)}
                >
                  {meet.users.includes(auth.currentUser.uid)
                    ? "Ya estas registrado, te esperamos!"
                    : "Quiero asistir!"}
                </button>
              ) : (
                <div className="log-msg-container">
                  <Link to="/login" className="log-msg text-center">
                    ¡Logueate para sumarte a nuestras meets!
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center ">
        <img
          src={process.env.PUBLIC_URL + "/images/persons.jpg"}
          className="people-img"
        />
      </div>
      <div className="text-center">
        <button className="btn btn-secondary btn-logout" onClick={logout}>
          Desloguearme
        </button>
      </div>
    </>
  );
};

export default Home;
