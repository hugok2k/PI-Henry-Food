const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const router = Router();
const { getConcat, getIdRecipes } = require('../controllers/recipes');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  const dbRecipes = await getConcat(next);
  try {
    if (name) {
      const resultFind = dbRecipes.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
      if (resultFind.length === 0) {
        res.status(404).send({ message: 'No recipes found' });
      }
      return res.send(resultFind);
    } else {
      return res.send(dbRecipes);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const idRecipes = await getIdRecipes(id, next);
  return res.send(idRecipes);
});

router.post('/', async (req, res, next) => {
  try {
    const { name, summary, healthScore, image, steps, diets } = req.body;
    const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      image,
      steps
    });
    let getAllDiet = await Diet.findAll({
      where: {
        name: diets
      }
    });
    newRecipe.addDiet(getAllDiet);
    return res.status(201).send(newRecipe);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Recipe.destroy({
    where: {
      id
    }
  })
    .then(() => {
      res.send('Recipe deleted');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
