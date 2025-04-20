import React from 'react';
import '../css/Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxVisiblePages = 5;
  
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range of pages to show around current page
    let rangeStart = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let rangeEnd = Math.min(totalPages - 1, rangeStart + maxVisiblePages - 3);
    
    // Adjust range if we're near the beginning
    if (rangeStart > 2) {
      pages.push('...');
    }
    
    // Add middle pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed
    if (rangeEnd < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page if it exists
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <div className="pagination">
      <button 
        className="pagination-button" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      <div className="pagination-numbers">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
          ) : (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        ))}
      </div>
      
      <button 
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;