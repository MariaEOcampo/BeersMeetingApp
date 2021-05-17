import React, { useState } from "react";
import "../styles/event-form.scss";

const EventForm = (props) => {
  const initialStateValues = {
    evento: "",
    fecha: "",
    ciudad: "",
    asistentes: "",
    users: [],
  };

  const [values, setValues] = useState(initialStateValues);

  const validateData = (fecha, ciudad) => {
    if (fecha == "" || ciudad == "") {
      alert("Debes indicar fecha y lugar");
      return false;
    }
    return true;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateData(values.fecha, values.ciudad)) {
      props.addMeet(values);
      setValues({ ...initialStateValues });
    }
  };

  return (
    <form className="card card-body mx-3" id="Event" onSubmit={handleSubmit}>
      <div className="formgroup">
        <label>Nombre de la Meet</label>
        <input
          required
          type="text"
          className="form-control"
          placeholder="Elegí un nombre "
          name="evento"
          value={values.evento}
          onChange={handleInputChange}
        />
      </div>
      <div className="formgroup mt-3">
        <label>¿Cuando es?</label>
        <select
          required
          className="custom-select"
          name="fecha"
          value={values.fecha}
          onChange={handleInputChange}
        >
          <option>Confirma el dia de la meet </option>
          <option value="mañana" name="mañana">
            Mañana
          </option>
          <option value="pasado-mañana" name="pasado-mañana">
            Pasado-mañana
          </option>
          <option value="tras-pasado-mañana" name="tras-pasado-mañana">
            Tras-Pasado-mañana
          </option>
        </select>
      </div>
      <div className="formgroup mt-3">
        <label>¿Donde es?</label>
        <select
          className="custom-select"
          name="ciudad"
          value={values.ciudad}
          onChange={handleInputChange}
        >
          <option>Confirma la ciudad </option>
          <option value="Buenos Aires" name="Buenos Aires">
            Buenos Aires
          </option>
        </select>
        <input
          type="number"
          className="form-control special-input"
          placeholder="ingresa un 0"
          name="users"
          value={values.users}
          readOnly
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-block btn-create">Crear Evento</button>
      <img
        src={process.env.PUBLIC_URL + "/images/persons.jpg"}
        className="people-img"
      />
    </form>
  );
};

export default EventForm;
