import React, { useEffect, useState } from 'react';
import { getAllRecipes } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Recipe from '../Recipe';
import './Recipes.css';
import { Paginate } from '../Paginate';
import SearchBar from '../SearchBar';
// import { Link } from 'react-router-dom';

export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const allRecipesPage = currentPage * postsPerPage; // 9, 18, 27, 36, 45, 54, 63, 72
  const indexOfFirstPost = allRecipesPage - postsPerPage; // 0, 9, 18, 27, 36, 45, 54, 63, 72
  const currentPosts = recipes.slice(indexOfFirstPost, allRecipesPage);
  const totalPages = Math.ceil(recipes.length / postsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [, setOrder] = useState('');

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return recipes.length > 0 ? (
    <>
      <div className="recipes-container">
        <SearchBar setCurrentPage={setCurrentPage} setOrder={setOrder} />
        <Paginate
          currentPage={currentPage}
          paginate={paginate}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
        <div className="recipes-list">
          {currentPosts.map((e) => (
            <Recipe key={e.id} name={e.name} image={e.image} diets={e.diets} id={e.id} healthScore={e.healthScore} />
          ))}
        </div>
        <Paginate
          currentPage={currentPage}
          paginate={paginate}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  ) : (
    <div className="container-loading">
      <div class="lds-ring">
        <div className="lds-ring-child"></div>
        <div className="lds-ring-child"></div>
        <div className="lds-ring-child"></div>
        <div className="lds-ring-child"></div>
      </div>
      <span className="span-loading">Loading...</span>
    </div>
  );
}
