// Importa las actions types que necesites acá:
import {
  GET_ALL_RECIPE,
  GET_RECIPE_NAME,
  GET_RECIPE_DETAIL,
  ORDER_RECIPE,
  ORDER_HEALTH_SCORE,
  GET_LIST_DIETS,
  FILTER_DIETS,
  PAGE_DETAIL
} from '../actions/myconst';

const initialState = {
  recipes: [],
  recipesOriginal: [],
  infoRecipes: {},
  listDiets: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPE:
      return {
        ...state,
        recipes: action.payload,
        recipesOriginal: action.payload
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
        recipes: state.recipes.sort((a, b) => {
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
        recipes: state.recipes.sort((a, b) => {
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
      const filterRecipeVar = state.recipesOriginal;
      const recipesFilter = filterRecipeVar.filter((e) => {
        return e.diets?.includes(action.payload);
      });
      return {
        ...state,
        recipes: action.payload === 'allDiets' ? filterRecipeVar : recipesFilter
      };
    case PAGE_DETAIL:
      return {
        ...state,
        infoRecipes: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
