import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import Modals from "../Modals/Modals";
import HomeImage from "../../Images/coding.jpg";
import Faq from "../../Images/faq.png";
import Rating from "../../Images/rating.png";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

function Home(props) {
	

	useEffect(() => {
		props.setProgress(0);
		props.setProgress(100);
	}, []);

	return (
		<>
		<div className="cb_header">
		<Navbar/>	
			<div className="container">
				<div className="row flex">
					<div className="col-lg-8 col-md-7 cb_text">
						<p className="quote">“IT‘S ALL TALK UNTIL THE CODE RUNS”
						</p>
						<p className="quote_author">- Ward Cunningham</p>
						<p className="cb_breif">Coding Bucks Provides you the Platform to Build Competitive Environment & Earn Bucks.</p>
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
			{/* create contest and join contest information */}
			<div className="contest_info_div">
				<div className="create_contest">
					<div className="container">
						<h3 className="heading_create_contest">4 Easy Steps to create a Contest</h3>
						<div className="crete_contest_container row">
							<div className="col-lg-3 col-sm-6">
								<div className="crete_contest_cards">
									<div className="card_header"></div>
									<div className="card_body">
										<p>Step 1:</p>
										<p>Click on Create contest button here.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="crete_contest_cards">
									<div className="card_header"></div>
									<div className="card_body">
										<p>Step 2:</p>
										<p>Enter Details of contest in the form and click submit.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="crete_contest_cards">
									<div className="card_header"></div>
									<div className="card_body">
										<p>Step 3:</p>
										<p>Check Request table to provide permissions to the participants.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="crete_contest_cards">
									<div className="card_header"></div>
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
						<h3 className="heading_join_contest">4 Easy Steps to Join a Contest</h3>
						<div className="crete_contest_container row">
							<div className="col-lg-3 col-sm-6">
								<div className="crete_contest_cards">
									<div className="card_header"></div>
									<div className="card_body">
										<p>Step 1:</p>
										<p>Click on Join contest button here.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="crete_contest_cards">
									<div className="card_header"></div>
									<div className="card_body">
										<p>Step 2:</p>
										<p>Enter Details of contest in the form and click submit.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="crete_contest_cards">
									<div className="card_header"></div>
									<div className="card_body">
										<p>Step 3:</p>
										<p>Check Request table to provide permissions to the participants.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6">
								<div className="crete_contest_cards">
									<div className="card_header"></div>
									<div className="card_body">
										<p>Step 4:</p>
										<p>click on “Ask Permission” & “Payment” button to Participate into contest.</p>
									</div>
								</div>
							</div>
						</div>
						<button className="join_contest_btn"><Link className="join_contest_btn" to="/contests">Join Contest</Link></button>
					</div>
				</div>
			</div>

			{/* Top coder information */}
			<div className="top_coders_div">
				<h3 className="heading_top_coder">Top Coders of the Month</h3>
				<div className="container top_coder_card_container">
					<div className="card_slider">
						<div className="topcoder_card">
							<img className="coder_avatar" src="https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg"></img>
							<div className="coder_card_info">
								<p><b>Mayank Rawat</b></p>
								<p>Rating 1109</p>
								<p>contest 20</p>
							</div>
						</div>
						<div className="topcoder_card">
							<img className="coder_avatar" src="https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg"></img>
							<div className="coder_card_info">
								<p><b>Mayank Rawat</b></p>
								<p>Rating 1109</p>
								<p>contest 20</p>
							</div>
						</div>
						<div className="topcoder_card">
							<img className="coder_avatar" src="https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg"></img>
							<div className="coder_card_info">
								<p><b>Mayank Rawat</b></p>
								<p>Rating 1109</p>
								<p>contest 20</p>
							</div>
						</div>
					</div>

					
				</div>
			</div>

			<div className="rating_review">
					<img src={Rating} height={"300px"} width={"60%"}></img>
			</div>


			<div className="faq_container">
				<div className="container">
					<img className="my-5" src={Faq} height={"500px"} width={"50%"}/>
				</div>	

			</div>
		</div>
		
		<Footer/>
		</>
	);
}
export default Home;
