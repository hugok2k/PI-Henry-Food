// Importa las actions types que necesites acá:
import {
  GET_ALL_RECIPE,
  GET_RECIPE_NAME,
  GET_RECIPE_DETAIL,
  ORDER_RECIPE,
  ORDER_HEALTH_SCORE,
  GET_LIST_DIETS,
  FILTER_DIETS,
  CREATE_RECIPE
} from '../actions/myconst';

// buscame en recipe y guardalo en recipfiltrado

const initialState = {
  recipes: [],
  recipes2: [],
  infoRecipes: {},
  listDiets: [],
  createRes: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPE:
      return {
        ...state,
        recipes: action.payload,
        recipes2: action.payload
      };
    case GET_RECIPE_NAME:
      return {
        ...state,
        recipes: action.payload
      };
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        infoRecipes: action.payload
      };
    case ORDER_RECIPE:
      return {
        ...state,
        recipes2: state.recipes2.sort((a, b) => {
          if (action.payload === 'A-Z') {
            if (a.name < b.name) return -1;
            if (b.name < a.name) return 1;
            return 0;
          } else {
            if (b.name < a.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          }
        })
      };
    case ORDER_HEALTH_SCORE:
      return {
        ...state,
        recipes2: state.recipes2.sort((a, b) => {
          if (action.payload === 'L-H') {
            if (a.healthScore < b.healthScore) return -1;
            if (b.healthScore < a.healthScore) return 1;
            return 0;
          } else {
            if (b.healthScore < a.healthScore) return -1;
            if (a.healthScore < b.healthScore) return 1;
            return 0;
          }
        })
      };
    case GET_LIST_DIETS:
      return {
        ...state,
        listDiets: action.payload
      };
    case FILTER_DIETS:
      return {
        ...state,
        recipes: state.recipes.filter((e) => {
          return e.diets?.includes(action.payload.toLowerCase());
        })
      };
    case CREATE_RECIPE:
      return {
        ...state,
        createRes: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
