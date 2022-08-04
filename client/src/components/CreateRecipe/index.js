import React, { useState } from 'react';
import './CreateRecipe.css';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipePost } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

export default function CreateRecipe() {
  const listDiets = useSelector((state) => state.listDiets);
  const lis = listDiets.map((e) => e.name);
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState({
    name: '',
    healthScore: '1',
    summary: '',
    image: 'https://cutt.ly/VZcVXeE',
    diets: [],
    steps: ''
  });
  const [validName, setValidName] = useState(true);
  const [validSummary, setValidSummary] = useState(true);
  const [validSteps, setValidSteps] = useState(true);
  const myRegex = {
    name: /^\s/g
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.name) {
      alert('Please enter a name');
    } else {
      dispatch(
        createRecipePost({
          ...input,
          steps: [{ number: '', step: input.steps }]
        })
      );
    }
    alert('Recipe created');
    history.push('/home');
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  function handleDietChange(e) {
    if (e.target.checked) {
      setInput({ ...input, diets: [...input.diets, e.target.value] });
    }
    if (!e.target.checked) {
      setInput({
        ...input,
        diets: input.diets.filter((diet) => diet !== e.target.value)
      });
    }
  }

  function validate() {
    if (myRegex.name.test(input.name) || input.name === '') setValidName(false);
    else setValidName(true);
    if (input.summary.length < 5) setValidSummary(false);
    else setValidSummary(true);
    if (input.steps.length < 5) setValidSteps(false);
    else setValidSteps(true);
  }
  return (
    <div className="create-recipe-container">
      <button className="btn-back-form" onClick={() => history.goBack()}>
        Back
      </button>
      <div className="create-recipe-main">
        <form autoComplete="off" className="create-recipe-form" onSubmit={(e) => handleSubmit(e)}>
          <label className="label-main">Title:</label>
          <input
            className="input-form-recipe"
            name="name"
            value={input.title}
            type="text"
            placeholder="Title of recipe"
            onChange={(e) => handleChange(e)}
            onKeyUp={() => validate(input)}
            onBlur={() => validate(input)}
          />
          <span className="error-message">{!validName && "DON'T LEAVE EMPTY SPACES"}</span>
          <label className="label-main">Health Score: {input.healthScore}</label>
          <input
            className="input-form-recipe"
            name="healthScore"
            value={input.healthScore}
            type="range"
            min={1}
            max={100}
            onChange={(e) => handleChange(e)}
          />
          <label className="label-main">Summary:</label>
          <input
            className="input-form-recipe"
            name="summary"
            value={input.summary}
            type="text"
            placeholder="Summary of recipe - 5 character or longer"
            onChange={(e) => handleChange(e)}
            onKeyUp={() => validate(input)}
            onBlur={() => validate(input)}
          />
          <span className="error-message-summary">{!validSummary && 'REQUIRED'}</span>
          <label className="label-main">Image:</label>
          <input
            className="input-form-recipe"
            name="image"
            value={input.image}
            type="text"
            placeholder="URL of image"
            onChange={(e) => handleChange(e)}
          />
          <img className="img-form" src={input.image} alt="recipe" />
          <label className="label-main">Diets:</label>
          <div className="select-diets-container" onChange={(e) => handleDietChange(e)}>
            {lis.map((e) => (
              <div key={e}>
                <input type="checkbox" name="diets" className="input-checkbox" value={e} />
                <label className="label-checkbox">{e.toUpperCase()}</label>
              </div>
            ))}
          </div>
          <label className="label-main-steps">Steps:</label>
          <input
            className="input-form-recipe"
            name="steps"
            value={input.steps}
            type="text"
            placeholder="Steps of recipe - 5 character or longer"
            onChange={(e) => handleChange(e)}
            onKeyUp={() => validate(input)}
            onBlur={() => validate(input)}
          />
          <span className="error-message-setps">{!validSteps && 'REQUIRED'}</span>
          {!input.name || !validSteps || !validName || !validSummary ? (
            <button className="btnDisabled" disabled>
              Submit
            </button>
          ) : (
            <button className="button-submit">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
}
