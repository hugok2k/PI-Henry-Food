import axios from 'axios';
import {
  GET_ALL_RECIPE,
  GET_RECIPE_NAME,
  GET_RECIPE_DETAIL,
  ORDER_RECIPE,
  ORDER_HEALTH_SCORE,
  GET_LIST_DIETS,
  FILTER_DIETS,
  CREATE_RECIPE,
  DELETE_RECIPE,
  PAGE_DETAIL
} from './myconst';

export function getAllRecipes() {
  return (dispatch) => {
    axios
      .get(`${axios.defaults.baseURL}/api/recipes`)
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
      const response = await axios.get(`${axios.defaults.baseURL}/api/recipes?name=${value}`);
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
      const response = await axios.get(`${axios.defaults.baseURL}/api/recipes/${id}`);
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
  return (dispatch) => {
    fetch(`${axios.defaults.baseURL}/api/diets`)
      .then((r) => {
        return r.json();
      })
      .then((response) => {
        return dispatch({ type: GET_LIST_DIETS, payload: response });
      })
      .catch((error) => console.log('Error:', error));
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
      const response = await axios.post(`${axios.defaults.baseURL}/api/recipes`, data);
      dispatch({ type: CREATE_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteRecipe(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${axios.defaults.baseURL}/api/recipes/${id}`);
      dispatch({ type: DELETE_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function pageDetail(data = {}) {
  return {
    type: PAGE_DETAIL,
    payload: data
  };
}
