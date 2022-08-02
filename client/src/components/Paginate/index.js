import React from 'react';
import './Paginate.css';

export const Paginate = ({ currentPage, setCurrentPage, paginate, totalPages }) => {
  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }
  function prevPage() {
    setCurrentPage(currentPage - 1);
  }
  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className="paginate-container">
      <button className="btnNB" disabled={currentPage <= 1} onClick={prevPage}>
        {'<'}
      </button>
      {pageNumbers?.map((e) => {
        return (
          <button className={e === currentPage ? 'numDecoActive' : 'numDeco'} key={e} onClick={() => paginate(e)}>
            {e}
          </button>
        );
      })}
      <button className="btnNB" disabled={currentPage >= totalPages} onClick={nextPage}>
        {'>'}
      </button>
    </div>
  );
};
