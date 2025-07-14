import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    // <--- CORRECTION: Ajout d'une condition pour éviter le crash au démarrage
    if (byDateDesc) {
      setTimeout(() => {
        // <--- CORRECTION: Ajout de '-1' pour éviter la slide blanche
        setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
      }, 5000);
    }
  };
  // <--- CORRECTION: Ajout des dépendances pour éviter la boucle infinie
  useEffect(() => {
    nextCard();
  }, [index, byDateDesc]);
  return (
    <div className="SlideCardList">
      {/* PARTIE 1 : On crée toutes les slides */}
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      {/* PARTIE 2 : On crée la pagination, UNE SEULE FOIS, après les slides */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((paginationEvent, radioIdx) => (
            <input
              // <--- CORRECTION: 'key' unique et valide pour la pagination (title au lieu d'un index)
              key={paginationEvent.title}
              type="radio"
              name="radio-button"
              // <--- CORRECTION: 'checked' utilise l'état 'index'
              checked={index === radioIdx}
              // <--- CORRECTION: Ajout de 'readOnly'
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
