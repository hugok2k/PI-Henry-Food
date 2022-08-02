import React from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';

export default function Recipe(recipe) {
  const { name, image, diets, id, healthScore } = recipe;
  const dietsList = diets.map((e) => e + ' ');

  return (
    <Link to={`/recipes/${id}`}>
      <div className="recipe-container">
        <h3>{name}</h3>
        <img className="recipe-img" src={image} alt={name} />
        <p className="dietsList">{dietsList}</p>
        <p className="health-score">
          Health Score:{' '}
          <span className={healthScore > 65 ? 'hGreen' : healthScore < 40 ? 'hRed' : 'hOrange'}>{healthScore}</span>
        </p>
      </div>
    </Link>
  );
}
