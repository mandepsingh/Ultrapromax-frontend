import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import Modals from "../Modals/Modals";
import HomeImage from "../../Images/Pair_programming.gif"
import Logo from "./../../Images/logo.png"
import Guide from "./../../Images/Guide.png"
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Typewriter from 'typewriter-effect'
import { MdLibraryBooks } from "react-icons/md";

function Home() {
	
	return (
		<>
		<Navbar/>	
		<div className="row">
			<div className="col-lg-6 col-md-6 ">
				<img className="cb_logo" src={Logo} alt="logo"/>
				<div className="website_brief">
					<p className="website_name">Coding Bucks</p>
					<div className="mb-3">
						<Typewriter
							onInit={(typewriter) => {
								typewriter.typeString("Provides you the platform to build a Competitive Environment and Earn Bucks.").start();
							}}
						/>
					</div>
					<div className="d-flex">
						<Modals/>
						<button className="btn btn-success mx-4"><Link className="join_contest_btn" to="/contests">Join Contest</Link></button>
					</div>
				</div>
				<div className="cb_guide_box">
					<div className="cb_guide">
						<div className="d-flex ">
							<div className="box box1">
								Curious..?
							</div>
							<div className="d-flex open_book">
								<div className="box box2">
									How to Create CONTEST ?
								</div>
								<div className="box box3">
									How PRIZE Distributed among Particpants ?
								</div>
							</div>
							<div className="box box4 ">
								<button className="guide_btn"><MdLibraryBooks size={65} color={"white"}/></button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-6 col-md-6 home_cover_image">
				<img className="homeImage" src={HomeImage} alt="programmercd"/>

			</div>		
		</div>
		<Footer/>
		</>
	);
}
export default Home;
