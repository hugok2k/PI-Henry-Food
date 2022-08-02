import axios from 'axios';
import {
  LOCALHOST,
  GET_ALL_RECIPE,
  GET_RECIPE_NAME,
  GET_RECIPE_DETAIL,
  ORDER_RECIPE,
  ORDER_HEALTH_SCORE,
  GET_LIST_DIETS,
  FILTER_DIETS,
  CREATE_RECIPE
} from './myconst';

export function getAllRecipes() {
  return async (dispatch) => {
    axios
      .get(`${LOCALHOST}api/recipes`)
      .then((response) => {
        return dispatch({ type: GET_ALL_RECIPE, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getRecipeName(value) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${LOCALHOST}api/recipes?name=${value}`);
      dispatch({ type: GET_RECIPE_NAME, payload: response.data });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };
}

export function getPageDetail(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${LOCALHOST}api/recipes/${id}`);
      dispatch({ type: GET_RECIPE_DETAIL, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderRecipes(data) {
  return {
    type: ORDER_RECIPE,
    payload: data
  };
}

export function orderHealthScore(data) {
  return {
    type: ORDER_HEALTH_SCORE,
    payload: data
  };
}

export function getListDiets() {
  return async (dispatch) => {
    axios
      .get(`${LOCALHOST}api/diets`)
      .then((response) => {
        return dispatch({ type: GET_LIST_DIETS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function filterDiets(data) {
  return {
    type: FILTER_DIETS,
    payload: data
  };
}

export function createRecipePost(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${LOCALHOST}api/recipes`, data);
      dispatch({ type: CREATE_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}
