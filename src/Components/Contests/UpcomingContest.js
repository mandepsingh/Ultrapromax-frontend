import React, {useState, useEffect} from 'react'
import ContestCard from './ContestCard';
import SearchContest from '../Search/SearchContest';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

function UpcomingContest() {
    const [contest_list, setContestlist] = useState();
    const [filteredContest, setFilteredContest] = useState();
  
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://ultrapro1.onrender.com/livecontest/upcoming"
        )
      ).json();
      // set state when the data received
      setContestlist(data);
      console.log(data)
    };
  
    useEffect(() => {
      dataFetch();
    }, []);
  
    // console.log(contest_list);
    if(filteredContest){
      console.log("filter",filteredContest)
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
                        <ContestCard contest = {record} show={"show"}/>
                      </div>  
                    )
                }) 
                : <div className='mx-3 my-3'><Loader/></div> )
              }
              {
                filteredContest && filteredContest !== "no data" && filteredContest.map( record => {
                    return(
                      <div className='col-lg-4 col-md-6' key={record._id} >
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

export default UpcomingContest
