import React from "react";
import "../styles/meet.scss";

const MeetCard = ({
  meet,
  deleteMeet,
  checkTemperature,
  index,
  checkBeers,
  deleteMeeting,
}) => {
  const calculateBeersForOne = (users, temperature) => {
    let quantityBeerForOne = 0;
    if (temperature <= 24) {
      quantityBeerForOne = 1;
      return quantityBeerForOne;
    } else if (temperature > 24) {
      quantityBeerForOne = 2;
      return quantityBeerForOne;
    } else {
      quantityBeerForOne = 0;
      return quantityBeerForOne;
    }
  };

  return (
    <div className="card mb-1" key={meet.id}>
      <div className="card-body">
        <p>
          <span>Nombre de la meet:</span> {meet.evento}
        </p>
        <p>
          <span>Ciudad:</span> {meet.ciudad}
        </p>
        <p>
          <span>Cuando:</span> {meet.fecha}
        </p>

        {meet.users ? (
          <p>
            <span>Asistentes esperados:</span> {meet.users.length}
          </p>
        ) : (
          ""
        )}
        <div className="d-flex flex-center">
          <button
            className=" btn-outline-primary btn-climate mt-5"
            onClick={() => checkTemperature(meet, index)}
          >
            Chequeá la temperatura del día de la meet!
            <i
              class="em em-mostly_sunny"
              aria-role="presentation"
              aria-label=""
            ></i>
          </button>
        </div>
        {meet.temperature && (
          <p className="temperature mt-2">
            Se esperan {meet.temperature}°C de máxima
          </p>
        )}

        {checkBeers && (
          <div>
            <p className="text-aux mt-3">
              (Primero averiguá la temperatura así podemos calcular la compra)
            </p>
            <p>
              <span>
                <i
                  class="em em-beer icon-beer"
                  aria-role="presentation"
                  aria-label="BEER MUG"
                ></i>
                Cajones de birras a comprar:
              </span>{" "}
              {Math.ceil(
                (calculateBeersForOne(
                  meet.users ? meet.users.length : 0,
                  meet.temperature
                ) *
                  meet.users.length) /
                  6
              )}
            </p>
          </div>
        )}
      </div>
      {deleteMeeting && (
        <button
          className="btn btn-block btn-delete"
          onClick={() => deleteMeet(meet.id)}
        >
          <i
            class="em em--1 delete-icon"
            aria-role="presentation"
            aria-label="THUMBS DOWN SIGN"
          ></i>
          Eliminar Meet
        </button>
      )}
    </div>
  );
};

export default MeetCard;
