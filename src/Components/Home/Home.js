import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import Modals from "../Modals/Modals";
import HomeImage from "../../Images/coding.jpg";
import Steps from "../../Images/Screenshot.png";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { BsFillTrophyFill } from "react-icons/bs"; 
import { BsPencilSquare } from "react-icons/bs";
import { BsFillCursorFill } from "react-icons/bs"; 
import { BsArrowRightCircle } from "react-icons/bs";  
import { MdOutlineLocalFireDepartment } from "react-icons/md";

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
				<h3 className="heading_top_coder">Reviews & Ratings &nbsp; <MdOutlineLocalFireDepartment size={35} color={"#c50707"}/></h3>
					<div className="rating_container">
						<div className="rating_card">
							<img className="rater_avatar" src="https://img.freepik.com/free-photo/young-woman-with-round-glasses-yellow-sweater_273609-7091.jpg"></img>
							<p className="rater_name">Ranveer Singh</p>
							<div className="rater_winnings">
								<p>Total Winnings</p>
								<p> ₹ 10000</p>
							</div>
							<p className="rater_review">I have gained such a great experience with Codingbucks because it provides me programmers to competitive with and money at the same time.</p>
						</div>
						<div className="rating_card">
							<img className="rater_avatar" src="https://img.freepik.com/free-photo/young-woman-with-round-glasses-yellow-sweater_273609-7091.jpg"></img>
							<p className="rater_name">Ranveer Singh</p>
							<div className="rater_winnings">
								<p>Total Winnings</p>
								<p> ₹ 10000</p>
							</div>
							<p className="rater_review">I have gained such a great experience with Codingbucks because it provides me programmers to competitive with and money at the same time.</p>
						</div>
						<div className="rating_card">
							<img className="rater_avatar" src="https://img.freepik.com/free-photo/young-woman-with-round-glasses-yellow-sweater_273609-7091.jpg"></img>
							<p className="rater_name">Ranveer Singh</p>
							<div className="rater_winnings">
								<p>Total Winnings</p>
								<p> ₹ 10000</p>
							</div>
							<p className="rater_review">I have gained such a great experience with Codingbucks because it provides me programmers to competitive with and money at the same time.</p>
						</div>
					</div>
					
				</div>


				<div className="faq_container">
					<div className="container">
						<h3 className="faq_heading">Frequently Asked Questions</h3>
						<div class="accordion" id="accordionExample">
							<div class="accordion-item">
								<h2 class="accordion-header" id="headingOne">
								<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
									What is Coding Bucks
								</button>
								</h2>
								<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
								</div>
								</div>
							</div>
							<div class="accordion-item">
								<h2 class="accordion-header" id="headingTwo">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
									How To Earn Money by Coding Bucks
								</button>
								</h2>
								<div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
								</div>
								</div>
							</div>
							<div class="accordion-item">
								<h2 class="accordion-header" id="headingThree">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
									When do i get my money after winning
								</button>
								</h2>
								<div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									<strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
								</div>
								</div>
							</div>
							</div>
					</div>	

				</div>
			
			
			</div>
			


			
		</div>
		
		<Footer/>
		</div>
	);
}
export default Home;
