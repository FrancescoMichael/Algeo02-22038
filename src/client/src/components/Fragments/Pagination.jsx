import './Pagination.css'

// function Pagination({totalPosts, postPerPage, setCurrentPage, currentPage}){
//     let pages = []

//     // for(let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++){ 
//     //     pages.push(i);
//     // }

//     const totalPages = Math.ceil(totalPosts / postPerPage);

//   // Batasi jumlah halaman yang ditampilkan sekitar halaman aktif
//   const maxPagesToShow = 5;
//   let startPage = Math.max(1, currentPage - 2);
//   let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//   for (let i = startPage; i <= endPage; i++) {
//     pages.push(i);
//   }

//     return(
//         <div className = "pagination">
//             {pages.map((page, index) => {
//                 return <button 
//                     type = "button" 
//                     key = {index} 
//                     onClick = {() => setCurrentPage(page)}
//                     className={page == currentPage ? "active" : ""}
//                     >
//                     {page}
//                 </button>
//             })}
//         </div>
//     );
// }

function Pagination({ totalPosts, postPerPage, setCurrentPage, currentPage }) {
    let pages = [];
    const totalPages = Math.ceil(totalPosts / postPerPage);
  
    // Batasi jumlah halaman yang ditampilkan sekitar halaman aktif
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
    // Tambahkan logika untuk menampilkan tombol elipsis dan halaman pertama/terakhir
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
  
    return (
      <div className="pagination">
        {pages.map((page, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={() => {
                if (typeof page === 'number') {
                  setCurrentPage(page);
                }
              }}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
        })}
      </div>
    );
  }
  

export default Pagination;