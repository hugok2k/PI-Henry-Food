const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;

// Llamo a la API de Spoonacular y devuelvo un array con los resultados, solo con los campos que necesito.

const getApiSpoon = (next) => {
  return (
    axios
      .get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
      // .get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
      .then((apiSpoon) => {
        const resultFilter = apiSpoon.data.results.map((e) => {
          /*  if (e.vegetarian && !e.diets.includes('vegetarian')) e.diets.push('vegetarian');
          if (e.vegan && !e.diets.includes('vegan')) e.diets.push('vegan');
          if (e.glutenFree && !e.diets.includes('gluten free')) e.diets.push('gluten free');
          if (e.dairyFree && !e.diets.includes('dairy free')) e.diets.push('dairy free');  */
          return {
            id: e.id,
            name: e.title,
            summary: e.summary,
            image: e.image,
            healthScore: e.healthScore,
            steps: e.analyzedInstructions[0]?.steps.map((e) => {
              return {
                number: e.number,
                step: e.step
              };
            }),
            diets: e.diets
          };
        });
        return resultFilter;
      })
      .catch((error) => {
        next(error);
      })
  );
};
// Devuelvo un array con los resultados de la base de datos, solo con los campos que necesito.
const getDbRecipes = async (next) => {
  try {
    const resultFind = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ['name']
      }
    });
    const resultFilter = resultFind.map((e) => {
      return {
        id: e.id,
        name: e.name,
        summary: e.summary,
        healthScore: e.healthScore,
        image: e.image,
        diets: e.diets.map((e) => e.name),
        steps: e.steps
      };
    });
    return resultFilter;
  } catch (error) {
    next(error);
  }
};

const getIdRecipes = async (id, next) => {
  if (id.length > 15) {
    try {
      const resultFind = await Recipe.findByPk(id, {
        include: {
          model: Diet,
          attributes: ['name']
        }
      });
      return {
        name: resultFind.name,
        summary: resultFind.summary,
        healthScore: resultFind.healthScore,
        diets: resultFind.diets?.map((e) => e.name),
        steps: resultFind.steps,
        image: resultFind.image
      };
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const recipeIdApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
      return {
        name: recipeIdApi.data.title,
        summary: recipeIdApi.data.summary,
        healthScore: recipeIdApi.data.healthScore,
        diets: recipeIdApi.data.diets,
        steps: recipeIdApi.data.analyzedInstructions[0]?.steps.map((e) => {
          return {
            number: e.number,
            step: e.step
          };
        }),
        image: recipeIdApi.data.image
      };
    } catch (error) {
      next(error);
    }
  }
};

// Concateno los resultados de API y DB en un array.
const getConcat = async (next) => {
  const apiSpoon = await getApiSpoon(next);
  const dbRecipes = await getDbRecipes(next);
  const concat = apiSpoon.concat(dbRecipes);
  return concat;
};

module.exports = {
  getConcat,
  getIdRecipes
};
