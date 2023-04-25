import React from 'react'

function Faq() {
  return (
    <div className="faq_container">
					<div className="container">
						<h3 className="faq_heading">Frequently Asked Questions</h3>
						<div className="accordion" id="accordionExample">
							<div className="accordion-item">
								<h2 className="accordion-header" id="headingOne">
								<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
									What is Coding bucks?
								</button>
								</h2>
								<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
								<div className="accordion-body">
									<strong>Codingbucks is an online platform where you can create coding contest, earn money as you advance in your coding career, and develop your coding skills in a fun way.</strong>
									<ul>
										<li>
										Via Coding Bucks, you can compete with programmers from across the globe and keep track of your progress through contests and global rankings. 
										</li>
										<li>
										Money is an added benefit since it encourages the competitor to acquire and implement the knowledge better and find the best solution to a problem.
										</li>
										{/* <li> */}
										{/* You can easily create a contest using Coding Bucks by choosing the number of competitors, the amount to be paid per competitor to participate, inviting participants, approving or rejecting join requests, competing against them in a 4 question-contest of a specific level , and rewarding the winners with cash and higher global ratings. */}
										{/* </li> */}
									</ul>
								</div>
								</div>
							</div>
							{/* <div className="accordion-item">
								<h2 className="accordion-header" id="headingTwo">
								<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
								How to earn money on codingbucks?
								</button>
								</h2>
								<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
								<div className="accordion-body">
									<strong>You can earn money by following the given steps:</strong>
									<ul>
										<li>
										Click the Create Contest icon on the homepage or click a link to participate in an existing contest.
										</li>
										<li>
										To host or participate in the contest, submit the required info, check the request table, and pay the necessary amount to enter.
										</li>
										<li>
										Secure a position in the top 50% to win money.
										</li>
									</ul>
								</div>
								</div>
							</div> */}
							{/* <div className="accordion-item">
								<h2 className="accordion-header" id="headingThree">
								<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								When will I get my money?
								</button>
								</h2>
								<div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
								<div className="accordion-body">
									<p>Within 24 hours of the contest's start, cash will be credited to the players' accounts from which they made the payment to enter. Only players who achieved a position within the top 50% of the contest rankings will be rewarded.</p>
								</div>
								</div>
							</div> */}
							<div className="accordion-item">
								<h2 className="accordion-header" id="headingFour">
								<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
								How many contenders in a contest will get cash reward?
								</button>
								</h2>
								<div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
								<div className="accordion-body">
									<p>Only those players who secure a rank within top 50% of the contest rankings will earn points.</p>
									{/* money */}
								</div>
								</div>
							</div>
							<div className="accordion-item">
								<h2 className="accordion-header" id="headingFive">
								<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
								What criteria is ranking determined by?
								</button>
								</h2>
								<div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
								<div className="accordion-body">
									<strong>Two factors dominate how contestants are ranked within a contest:</strong>
									<ul>
										<li>
										Time taken to solve the problem
										</li>
										<li>
										Number of questions solved
										</li>
										<p><strong>Note: </strong>Global rankings are based on overall performance of the user in the contests.</p>
									</ul>
								</div>
								</div>
							</div>
							<div className="accordion-item">
								<h2 className="accordion-header" id="headingFive">
								<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
								Minimum number of players required per contest?
								</button>
								</h2>
								<div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
								<div className="accordion-body">
									<p>Minimum number of players required per contest is 2.</p>
								</div>
								</div>
							</div>
							{/* <div className="accordion-item">
								<h2 className="accordion-header" id="headingSix">
								<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
								Minimum amount to create a contest?
								</button>
								</h2>
								<div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
								<div className="accordion-body">
									<p>₹20 per player/host per contest.</p>
								</div>
								</div>
							</div> */}
							<div className="accordion-item">
								<h2 className="accordion-header" id="headingSeven">
								<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
								Is it necessary for the host to participate in the contest?
								</button>
								</h2>
								<div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
								<div className="accordion-body">
									<p>No</p>
								</div>
								</div>
							</div>
						</div>
					</div>	
				</div>
  )
}

export default Faq