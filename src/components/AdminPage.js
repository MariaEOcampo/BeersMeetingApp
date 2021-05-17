import React, { useEffect, useState } from "react";
import EventForm from "./EventForm";
import { db } from "../services/firebase";
import { toast } from "react-toastify";
import { getWeather } from "../services/weather.js";
import MeetCard from "./MeetCard";

const AdminPage = () => {
  const [meets, setMeets] = useState([]);
  const [positionDay, setPositionDay] = useState([]);

  const addMeet = async (meet) => {
    await db.collection("meets").doc().set(meet);
    toast("Nueva Meet creada!", { type: "success" });
  };

  const getMeets = async () => {
    db.collection("meets").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });

      setMeets(docs);
    });
  };

  const deleteMeet = async (id) => {
    if (window.confirm("¿Estas seguro de eliminar esta meet?")) {
      await db.collection("meets").doc(id).delete();
      toast("Meet eliminada =( !", { type: "error", autoClose: 2000 });
    }
  };

  let numberOfDay;

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

  useEffect(() => {
    console.log(meets);
  }, [meets]);

  return (
    <div className="container p-4">
      <h1>Planeemos los eventos de esta semana :)</h1>
      <div className="row">
        <EventForm addMeet={addMeet} />
        <div className="col-md-8">
          {meets.map((meet, index) => (
            <MeetCard
              meet={meet}
              checkTemperature={checkTemperature}
              deleteMeet={deleteMeet}
              index={index}
              checkBeers={true}
              deleteMeeting={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
