import React from 'react'

function Pagination() {
  return (
    <>
    <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only"> Previous</span>
            </a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
                <span className="sr-only">Next </span>
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default Pagination
