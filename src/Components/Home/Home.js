import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import Modals from "../Modals/Modals";
import HomeImage from "../../Images/coding.jpg";
import Faq from "../../Images/faq.png";
import Rating from "../../Images/rating.png";
import Steps from "../../Images/Screenshot.png";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { BsFillTrophyFill } from "react-icons/bs"; 
import { BsPencilSquare } from "react-icons/bs";
import { BsFillCursorFill } from "react-icons/bs"; 
import { BsArrowRightCircle } from "react-icons/bs";
// import { BsPencilSquare } from "react-icons/bs";

function Home(props) {
	

	useEffect(() => {
		props.setProgress(0);
		props.setProgress(100);
	}, []);

	return (
		<div className="home_body">
		<div className="cb_header">
		<Navbar/>	
			<div className="container">
				<div className="row flex">
					<div className="col-lg-8 col-md-7 cb_text">
						<p className="quote">“IT‘S ALL TALK UNTIL THE CODE RUNS”
						</p>
						<p className="quote_author">- Ward Cunningham</p>
						<p className="cb_breif">Coding Bucks Provides you the Platform to Build Competitive Programming Environment & Earn Bucks.</p>
						<div className="explore_btn_cover">
							<a href="#cb_body">
								<button className="explore_btn">Explore</button>
							</a>
						</div>
					</div>
					<div className="col-lg-4 col-md-5">
						<img className="home_image" src={HomeImage}/>
					</div>
				</div>
				
			</div>	
		</div>

		<a name = "cb_body"/>

		<div className="cb_body">
			<p className="cb_mission">Our <span style={{color:"#E32525"}}> Mission </span> is to make <span style={{color:"#E32525"}}> DSA </span> 
									training more <span style={{color:"#19874C"}}> Enjoyable </span> for everyone while <span style={{color:"#19874C"}}> Encouraging </span> 
									them to begin their <span style={{color:"#E32525"}}> Competitive Programming </span> journey.</p>
			{/* create contest and join contest information */}
			<div className="contest_info_div">
				<div className="create_contest">
					<div className="container">
						<h3 className="heading_create_contest">4 Easy Steps to <span style={{color:"#19874C"}}>&nbsp; Create &nbsp;</span> a Contest &nbsp; <BsPencilSquare size={30} color={"#19874C"}/> </h3>
						<div className="create_contest_container row">
							<div className="col-lg-3 col-sm-6">
								<div className="create_contest_cards">
									<div className="card_header">
										<img src={Steps}></img>
									</div>
									<div className="card_body">
										<p>Step 1:</p>
										<p>Click on Create Contest button here.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="create_contest_cards">
									<div className="card_header">
										<img src={Steps}></img>
									</div>
									<div className="card_body">
										<p>Step 2:</p>
										<p>Enter Details of contest in the form and click submit.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="create_contest_cards">
									<div className="card_header">
										<img src={Steps}></img>
									</div>
									<div className="card_body">
										<p>Step 3:</p>
										<p>Check Request table to provide permissions to the participants.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="create_contest_cards">
									<div className="card_header">
										<img src={Steps}></img>
									</div>
									<div className="card_body">
										<p>Step 4:</p>
										<p>click on “Ask Permission” & “Payment” button to Participate into contest.</p>
									</div>
								</div>
							</div>
						</div>
						<Modals/>
						{/* <button className="create_contest_btn">Create Contest</button> */}
					</div>
					
				</div>
				
				<div className="join_contest">
					<div className="container">
						<h3 className="heading_join_contest">4 Easy Steps to <span style={{color:"#DF4949"}}>&nbsp; Join &nbsp;</span> a Contest &nbsp; <BsFillCursorFill size={30} color={"#DF4949"}/> </h3>
						<div className="crete_contest_container row">
							<div className="col-lg-3 col-sm-6">
								<div className="join_contest_cards">
									<div className="card_header">
										<img src={Steps}></img>
									</div>
									<div className="card_body">
										<p>Step 1:</p>
										<p>Click on Join contest button here.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="join_contest_cards">
									<div className="card_header">
										<img src={Steps}></img>
									</div>
									<div className="card_body">
										<p>Step 2:</p>
										<p>Enter Details of contest in the form and click submit.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="join_contest_cards">
									<div className="card_header">
										<img src={Steps}></img>
									</div>
									<div className="card_body">
										<p>Step 3:</p>
										<p>Check Request table to provide permissions to the participants.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="join_contest_cards">
									<div className="card_header">
										<img src={Steps}></img>
									</div>
									<div className="card_body">
										<p>Step 4:</p>
										<p>click on “Ask Permission” & “Payment” button to Participate into contest.</p>
									</div>
								</div>
							</div>
						</div>
						<button className="join_contest_btn"><Link className="join_contest_btn" to="/contests"><BsArrowRightCircle style={{marginBottom:"3px"}}/> Join Contest</Link></button>
					</div>
				</div>
			</div>

			{/* Top coder information */}
			<div className="container">
				<div className="top_coders_div">
					<h3 className="heading_top_coder">Top <span style={{color:"#19874C"}}>&nbsp; Coders &nbsp;</span> of the Month &nbsp; <BsFillTrophyFill size={30} color={"#19874C"}/> </h3>
					<div className="container top_coder_card_container">
						<div className="card_slider">
							<div className="topcoder_card">
								<img className="coder_avatar" src="https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg"></img>
								<div className="coder_card_info">
									<p className="top_coder_name"><b>Mayank Rawat</b></p>
									<div className="d-flex">
										<div className="top_coder_info">
											<p>Contest</p>
											<p>54</p>
										</div>
										<div className="top_coder_info">
											<p>Loses</p>
											<p>14</p>
										</div>
										<div className="top_coder_info">
											<p>Wins</p>
											<p>40</p>
										</div>
									</div>
									<p className="top_coder_win_amount">Winning Amount</p>
									<p className="top_coder_win_amount">1000</p>
								</div>
							</div>
							<div className="topcoder_card">
								<img className="coder_avatar" src="https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg"></img>
								<div className="coder_card_info">
									<p className="top_coder_name"><b>Mayank Rawat</b></p>
									<div className="d-flex">
										<div className="top_coder_info">
											<p>Contest</p>
											<p>54</p>
										</div>
										<div className="top_coder_info">
											<p>Loses</p>
											<p>14</p>
										</div>
										<div className="top_coder_info">
											<p>Wins</p>
											<p>40</p>
										</div>
									</div>
									<p className="top_coder_win_amount">Winning Amount</p>
									<p className="top_coder_win_amount">1000</p>
								</div>
							</div>
							<div className="topcoder_card">
								<img className="coder_avatar" src="https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg"></img>
								<div className="coder_card_info">
									<p className="top_coder_name"><b>Mayank Rawat</b></p>
									<div className="d-flex">
										<div className="top_coder_info">
											<p>Contest</p>
											<p>54</p>
										</div>
										<div className="top_coder_info">
											<p>Loses</p>
											<p>14</p>
										</div>
										<div className="top_coder_info">
											<p>Wins</p>
											<p>40</p>
										</div>
									</div>
									<p className="top_coder_win_amount">Winning Amount</p>
									<p className="top_coder_win_amount">1000</p>
								</div>
							</div>
						</div>

						
					</div>
				</div>
			

				<div className="rating_review">
				<h3 className="heading_top_coder">Reviews & Ratings</h3>

					<img src={Rating} height={"300px"} width={"60%"}></img>
				</div>


				<div className="faq_container">
					<div className="container">
						<img className="my-5" src={Faq} height={"500px"} width={"50%"}/>
					</div>	

				</div>
			
			
			</div>
			


			
		</div>
		
		<Footer/>
		</div>
	);
}
export default Home;
