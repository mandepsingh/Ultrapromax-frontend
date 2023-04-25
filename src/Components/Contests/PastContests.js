import React, {useState, useEffect} from 'react'
import ContestCard from './ContestCard';
import SearchContest from '../Search/SearchContest';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

function PastContests() {
  
  const [contest_list, setContestlist] = useState([]);
  const [filteredContest, setFilteredContest] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [skip, setSkip] = useState(0)
  const[fetchingstatus, setFethingstatus]= useState(false);

  const dataFetch = async () => {
    const data = await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/contestpast?skip=${skip}`
      )
    ).json();
   

    // set state when the data received
    setContestlist([...contest_list, ...data.data]);
    setFethingstatus(true);

  };

  useEffect(() => {
    // props.setProgress(10);
    dataFetch();
  }, [skip]);

  const handleScroll = (e) => {
      const { offsetHeight, scrollTop, scrollHeight} = e.target
      // console.log(offsetHeight + scrollTop + 100, scrollHeight);
      if (offsetHeight + scrollTop + 100 >= scrollHeight) {
        setSkip(contest_list.length)
      }
  }

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
    <div>
        <div>
          {
            contest_list && <SearchContest contests={contest_list} setFilteredContest={setFilteredContest}/>
          }
        </div>
        <hr/>
        <div className='row todos-list' onScroll={handleScroll}>
            {
              !filteredContest && fetchingstatus==true ? (contest_list.length>0 ? contest_list.map( record => {
                  return(
                    <div className='col-lg-6 col-md-12' key={record._id} >
                      {/* {console.log(record)} */}
                        <ContestCard contest = {record} show={"hide"}/>
                    </div>  
                  )
              }) 
              : <div> There is no contest available! </div> ): <div className='mx-3 my-3'><Loader/></div>
            }
            {
              filteredContest && filteredContest !== "no data" && filteredContest.map( record => {
                  return(
                    <div className='col-lg-6 col-md-12' key={record._id} >
                      <ContestCard contest = {record} show={"hide"}/>
                      
                    </div>  
                  )
              })
            }
            {/* <div>
            {
              contest_list && <Pagination/>
            }
        </div> */}
        </div>
        
    </div>
  )
}

export default PastContests