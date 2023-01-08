import React, { useState } from 'react'
import './SearchContest.css';
import { MdSearch } from "react-icons/md";

function SearchContest(props) {
    const [searchQuery, setSearchQuery] = useState();

    function searchContest(e){
        e.preventDefault();
        const newlist = props.contests.data.filter((contest)=>{
            return (searchQuery && 
                    (contest.contestname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    contest.amount.toLowerCase().includes(searchQuery.toLowerCase())))
        })
        props.setFilteredContest((searchQuery) ? (newlist.length ? newlist : "no data") : props.contests.data);
    }
    
  return (
    <>
    <form onSubmit={searchContest}>
        <div className="my-2 row mx-2 mb-4">
            <div className="col-sm-9 filter_contest d-flex mb-2">
                <MdSearch size={25} color={"grey"}/>
                <input type="text" className="search_bar" placeholder="Search Contest" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className='col-sm-3'>
                <button type='submit' className='btn btn-success  btn_search_contest'>Search</button>
            </div>

        </div>
    </form>
    </>
  )
}

export default SearchContest
