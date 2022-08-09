import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPageDetail, deleteRecipe, pageDetail } from '../../redux/actions';
import './PageDetail.css';
import { useHistory } from 'react-router-dom';

export default function PageDetail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const history = useHistory();

  useEffect(() => {
    dispatch(getPageDetail(id));
    return () => {
      dispatch(pageDetail());
    };
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteRecipe(id));
    alert('Recipe deleted');
    history.push('/home');
  };

  const infoRecipes = useSelector((state) => state.infoRecipes);
  return (
    <div className="container-pagedetail-main">
      <div key={id + 1} className="container-pagedetail">
        <button className="btn-back-card" onClick={() => history.goBack()}>
          Back
        </button>
        <h1 className="title-pagedetail">{infoRecipes.name}</h1>
        <img className="image-page-detail" src={infoRecipes.image} alt={infoRecipes.name} />
        <div className="container-diets">
          {infoRecipes.diets?.map((diet) => (
            <button className="btnDiets" key={diet}>
              {diet.toUpperCase()}
            </button>
          ))}
        </div>
        <p className="summary" dangerouslySetInnerHTML={{ __html: infoRecipes.summary }} />
        {infoRecipes.steps?.map((e) => (
          <p key={e.number} className="diets">
            <strong>{e.number}</strong> - {e.step}
          </p>
        ))}
        {id.length > 15 ? (
          <button className="recipe-delete" onClick={() => handleDelete()}>
            DELETE
          </button>
        ) : null}
      </div>
    </div>
  );
}
