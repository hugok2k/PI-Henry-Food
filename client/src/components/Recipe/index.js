import React from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';

export default function Recipe(recipe) {
  const { name, image, diets, id, healthScore } = recipe;
  const dietsList = diets.map((e) => e.toUpperCase() + ' ');

  return (
    <Link to={`/recipes/${id}`}>
      <div className="recipe-container">
        <div className="container-recipe-image">
          <img className="recipe-img" src={image} alt={name} />
        </div>
        <div className="container-recipe-card-title">
          <span className="recipe-card-title">{name}</span>
        </div>
        <p className="dietsList">{dietsList}</p>
        <p className="health-score">
          Health Score:{' '}
          <span className={healthScore > 65 ? 'hGreen' : healthScore < 40 ? 'hRed' : 'hOrange'}>{healthScore}</span>
        </p>
        <div className="container-circle-hea">
          <div className="circle-hea"> {'>'} </div>
        </div>
      </div>
    </Link>
  );
}
