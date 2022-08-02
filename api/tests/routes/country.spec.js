/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanesa',
  summary: 'Algo de texto por aca'
};
const objPost = {
  name: 'Milanesa',
  healthScore: 50,
  summary: 'Algo de texto por aca',
  steps: [{ number: '', step: 'Paso 1 lala' }],
  diets: ['vegetarian', 'gluten free', 'vegan', 'primal']
};

describe('Recipe routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  beforeEach(() => Recipe.sync({ force: true }).then(() => Recipe.create(recipe)));

  describe('\n --- PROBANDO RUTA GET /api/recipes --- \n', () => {
    it('should get 200', () => agent.get('/api/recipes').expect(200));
    it('should get 404', () => agent.get('/api/recipess').expect(404));
  });
  describe('\n --- PROBANDO RUTA GET /api/diets --- \n', () => {
    it('should get 200', () => agent.get('/api/diets').expect(200));
  });
  describe('\n --- PROBANDO RUTA ID /recipes/:id \n', () => {
    it('should get 200', () => agent.get('/api/recipes/644387').expect(200));
  });
  describe('\n --- PROBANDO RUTA QUERY /recipes?=name \n', () => {
    it('should get 200', () => agent.get('/api/recipes?name=Milanesa').expect(200));
  });
});
