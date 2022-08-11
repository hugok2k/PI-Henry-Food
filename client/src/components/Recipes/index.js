import React, { useEffect, useState } from 'react';
import { getAllRecipes } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Recipe from '../Recipe';
import './Recipes.css';
import { Paginate } from '../Paginate';
import SearchBar from '../SearchBar';

export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const allRecipesPage = currentPage * postsPerPage;
  const indexOfFirstPost = allRecipesPage - postsPerPage;
  const currentPosts = recipes.slice(indexOfFirstPost, allRecipesPage);
  const totalPages = Math.ceil(recipes.length / postsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [, setOrder] = useState('');

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);
  return recipes.length > 0 && recipes !== undefined ? (
    <>
      <div className="recipes-container">
        <SearchBar setCurrentPage={setCurrentPage} setOrder={setOrder} />
        <div className="up-paginate-container">
          <Paginate
            currentPage={currentPage}
            paginate={paginate}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
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
        <footer className="footer">
          <span>Developed by Hugo Avila</span>
          <div className="footer-icons">
            <a href="https://github.com/hugok2k" target="_blank" rel="noopener noreferrer">
              <span className="icon-github"></span>
            </a>
            <a href="https://www.linkedin.com/in/hugo-avila-9465a09/" target="_blank" rel="noopener noreferrer">
              <span className="icon-linkedin"></span>
            </a>
          </div>
        </footer>
      </div>
    </>
  ) : (
    <div className="container-loading">
      <div className="lds-ring">
        <div className="lds-ring-child"></div>
        <div className="lds-ring-child"></div>
        <div className="lds-ring-child"></div>
        <div className="lds-ring-child"></div>
      </div>
      <span className="span-loading">Loading...</span>
    </div>
  );
}
