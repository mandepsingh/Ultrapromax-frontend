import React, {useState, useEffect} from 'react'
import ContestCard from './ContestCard';
import SearchContest from '../Search/SearchContest';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

function LiveContests() {
  
  const [contest_list, setContestlist] = useState();
  const [filteredContest, setFilteredContest] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);

  const dataFetch = async () => {
    const data = await (
      await fetch(
        "https://ultrapro1.onrender.com/livecontest/"
      )
    ).json();

    // set state when the data received
    setContestlist(data);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  // console.log(contest_list);
  if(filteredContest){
    console.log("filter",filteredContest)
  }

  if(contest_list){
    // console.log((contest_list.data.slice(1,2)))
    // const lastPostIndex = currentPage * postsPerPage;
    // const firstPostIndex = lastPostIndex - postsPerPage;
    // const currentPosts = contest_list.data.slice(firstPostIndex, lastPostIndex);
  }
  return (
    <>
        <div>
          {
            contest_list && <SearchContest contests={contest_list} setFilteredContest={setFilteredContest}/>
          }
        </div>
        <div className='row'>
            {
              !filteredContest && (contest_list ? contest_list.data.map( record => {
                  return(
                    <div className='col-lg-4 col-md-6' key={record._id} >
                      {/* {console.log(record)} */}
                      <ContestCard contest = {record}/>
                    </div>  
                  )
              }) 
              : <div className='mx-3 my-3'><Loader/></div> )
            }
            {
              filteredContest && filteredContest !== "no data" && filteredContest.map( record => {
                  return(
                    <div className='col-lg-4 col-md-6' key={record._id} >
                      <ContestCard contest = {record}/>
                    </div>  
                  )
              })
            }
            <div>
            {
              contest_list && <Pagination/>
            }
        </div>
        </div>
        
    </>
  )
}

export default LiveContests