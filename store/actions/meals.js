export const TOGGLE_FAV = "TOGGLE_FAV";
export const SET_FITLERS = "SET_FILTERS";

export const toggleFav = (id) => {
  return { type: TOGGLE_FAV, mealId: id };
};

export const setFilters = (filterSettings) => {
  return { type: SET_FITLERS, filters: filterSettings };
};
