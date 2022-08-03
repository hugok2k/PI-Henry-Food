import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRecipeName,
  orderRecipes,
  orderHealthScore,
  getListDiets,
  filterDiets,
  getAllRecipes
} from '../../redux/actions/';
import './SearchBar.css';
import { Link } from 'react-router-dom';

export default function SearchBar({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const listDiets = useSelector((state) => state.listDiets);
  const lis = listDiets.map((e) => e.name);

  useEffect(() => {
    if (listDiets.length === 0) {
      dispatch(getListDiets());
    }
  }, [dispatch, listDiets]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeName(input));
    setInput('');
    setCurrentPage(1);
  };

  const handleOrder = (e) => {
    if (e.target.value === 'orderR') {
      dispatch(getAllRecipes());
      setCurrentPage(1);
    } else {
      dispatch(orderRecipes(e.target.value));
      setOrder(e.target.value);
      setCurrentPage(1);
    }
  };

  const handleOrderHealth = (e) => {
    if (e.target.value === 'random') {
      dispatch(getAllRecipes());
      setCurrentPage(1);
    } else {
      dispatch(orderHealthScore(e.target.value));
      setOrder(e.target.value);
      setCurrentPage(1);
    }
  };

  const handleFilterDiets = (e) => {
    dispatch(filterDiets(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="search-bar">
      <Link to="/create">
        <button className="create-recipe" type="button">
          Create Recipe
        </button>
      </Link>
      <select onChange={(e) => handleOrder(e)} className="menu-order">
        <option value="orderR">Order</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <button onClick={() => window.location.reload()} className="refresh">
        Refresh
      </button>

      <form className="search-form-container" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="input"
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Search recipe"
          value={input}
        />
        <input
          className={!input ? 'btnsearch-hidden' : 'btnsearch'}
          type="submit"
          value="Search"
          disabled={!input || /\s/g.test(input) ? true : false}
        />
      </form>

      <select onChange={(e) => handleOrderHealth(e)} className="menu-order-health">
        <option value="random">Order Health</option>
        <option value="H-L">High - Low</option>
        <option value="L-H">Low - High</option>
      </select>
      <select onChange={(e) => handleFilterDiets(e)} className="menu-filter-recipe">
        <option value="allDiets">All Diets</option>
        {lis.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  );
}
