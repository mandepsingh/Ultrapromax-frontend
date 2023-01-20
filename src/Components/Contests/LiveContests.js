import React, {useState, useEffect} from 'react'
import ContestCard from './ContestCard';
import SearchContest from '../Search/SearchContest';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

function LiveContests(props) {
  
  const [contest_list, setContestlist] = useState();
  const [filteredContest, setFilteredContest] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);

  const dataFetch = async () => {
    props.setProgress(50);
    const data = await (
      await fetch(
        "https://ultrapro1.onrender.com/livecontest/live"
      )
    ).json();
    props.setProgress(80);

    // set state when the data received
    setContestlist(data);
    props.setProgress(100);
    

  };

  useEffect(() => {
    props.setProgress(10);
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
        <hr/>
        <div className='row'>
            {
              !filteredContest && (contest_list ? contest_list.data.map( record => {
                  return(
                    <div className='col-lg-6 col-md-12' key={record._id} >
                      {/* {console.log(record)} */}
                      <ContestCard contest = {record} show={"show"}/>
                    </div>  
                  )
              }) 
              : <div className='mx-3 my-3'><Loader/></div> )
            }
            {
              filteredContest && filteredContest !== "no data" && filteredContest.map( record => {
                  return(
                    <div className='col-lg-6 col-md-12' key={record._id} >
                      <ContestCard contest = {record} show={"show"}/>
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