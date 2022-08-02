const { Router } = require('express');
const { Diet } = require('../db');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res, next) => {
  return Diet.findAll().then((data) => {
    res.send(data);
  });
});

// router.post('/', async (req, res, next) => {
//   try {
//     dietsDb.forEach((e) => {
//       Diet.findOrCreate({
//         where: { name: e }
//       });
//     });
//     const dietFind = await Diet.findAll();
//     res.send(dietFind);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
