export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

// <--- Correction du mois dans l'EventCard (Juillet au lieu de Aout)
export const getMonth = (date) => MONTHS[date.getMonth() + 1];
