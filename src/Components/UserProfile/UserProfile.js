import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from "../../App";
import ReactDOM from 'react-dom';
import Calendar from 'react-github-contribution-calendar';
// import Profile from '../Profile/Profile';
// import Logo from "./../../Images/logo.png"
import './UserProfile.css'
import { CChart } from '@coreui/react-chartjs'
import Navbar from '../Navbar/Navbar';

function UserProfile() {
    var values = {
        '2016-06-23': 1,
        '2016-06-26': 2,
        '2016-06-27': 3,
        '2016-06-28': 4,
        '2016-06-29': 4
    }
    var panelColors = [
        '#EEEEEE',
        '#F78A23',
        '#F87D09',
        '#AC5808',
        '#7B3F06'
    ];
    var weekNames = ['s', 'm', 't', 'w', 't', 'f', 's'];
    var until = '2016-06-30';
    var panelAttributes = { rx: 10, ry: 6 };

    

    const [userdata, setUserdata] = useState();
    const {state, dispatch} = useContext(UserContext);

    const dataFetch = async () => {
        const data = await (
          await fetch(
            `${process.env.REACT_APP_BACKEND_LOCAL_HOST}/user/userid/${state.userId}`
          )
        ).json();
    
        console.log(data);
        setUserdata(data);

      };
    
      useEffect(() => {
        dataFetch();
      }, []);
    
      // console.log(contest_list);
      if(userdata){
        console.log("userdata",userdata)
    }

  return (
    <>
    <Navbar/>
    <div className= "userprofile">
        <div className= "userprofile_dashboard">
            <h1>DAHSBOARD </h1>
        </div>
        <div className= "userprofile_top">
            
            <div className= "userprofile_profile">
                {/* <div class="userprofile_profile_top"><h4> PROFILE </h4></div> */}
                {/* <div> */}
                    <div className= "userprofile_profile_left">
                        <img className='navBar_profile_img' src='https://cdn.pixabay.com/photo/2014/04/12/14/59/portrait-322470_960_720.jpg'/>
                        <h4>{userdata && userdata.response.firstname}</h4>
                    </div>
                    <div className= "userprofile_profile_right">
                    
                    </div>
                {/* </div> */}
            </div>
            <div className= "userprofile_problemsolved">
                <h4> PROBLEM SOLVED </h4>
                <CChart
                        type="doughnut"
                        data={{
                            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                            datasets: [
                            {
                                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                data: [40, 20, 80, 10],
                            },
                            ],
                        }}
                        />
            </div>
        </div>
        <div className= "userprofile_participation">
            <h4> PARTICIPATION CHART </h4>
           
                <Calendar values={values} until={until} panelAttributes={panelAttributes} panelColors={panelColors } weekNames={weekNames}/>
        </div>
        <div className= "userprofile_contestdetails">
            <h4> CONTEST DETAILS </h4>
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div className= "userprofile_delete">

        </div>
    </div>
    </>
  )
}

export default UserProfile