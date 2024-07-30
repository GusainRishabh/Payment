import React, { useState } from 'react'
import Hamburger from './hambugerstudent'
import { Link } from 'react-router-dom'
import Mainmasterpage from './mainmasterpage'
function dashboard() {
    return (
        <div>
            <nav>
                <div className="logo">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/education-logo-best-teacher-logo-design-template-7e9b38bf124afd7bbeae2c4aaa59480a_screen.jpg?ts=1677768434" />
                    <a href="#" target="_blank">Rishabh</a>
                </div>
                <ul>
                    <li><a href="#main">Home</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#about">About Me</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#feedback">Feedback</a></li>
                </ul>
                <ul>
                    <li><Hamburger/></li>  
                </ul>

            </nav>
            <center>
                <div style={{ height: '600px', marginTop: '20px', width: '70%', display: 'flex' }}>
                    <div style={{ height: '600px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        <div style={{ height: '33%', width: '33%' }}>
                        <Link to="/questionpagenew">

                            <div class="w-full max-w-md h-51 bg-blue-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                                <div>
                                    <h3 class="text-xl font-bold">View paper</h3>
                                    <p class="text-sm">MCQ</p>
                                    <div class="relative w-12 h-12 mt-4">
                                        <div class="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                                            <div class="absolute inset-0 flex items-center justify-center text-blue-500 font-bold" style={{ color: 'black' }}>75%</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-5xl">📚</div>

                            </div>
                           </Link>
                        </div>
                        <div style={{ height: '33%', width: '33%' }}>
                            <a href=""><div class="w-full max-w-md h-51 bg-red-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                            <div>
                                
                                <h3 class="text-xl font-bold">Locations</h3>
                                <p class="text-sm">35 Lessons</p>
                                <div class="relative w-12 h-12 mt-4">
                                    <div class="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                                        <div class="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-5xl">🖊️</div>
                        </div>
                        </a>
                        </div>
                        <div style={{ height: '33%', width: '33%' }}>
                            <a href=""><div class="w-full max-w-md h-51 bg-yellow-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                            <div>
                                <h3 class="text-xl font-bold">Locations</h3>
                                <p class="text-sm">35 Lessons</p>
                                <div class="relative w-12 h-12 mt-4">
                                    <div class="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                                        <div class="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-5xl">📝</div>
                        </div>
                        </a>
                        </div>
                        <div style={{ height: '33%', width: '33%' }}><div class="w-full max-w-md h-51 bg-orange-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                            <div>
                                <h3 class="text-xl font-bold">Locations</h3>
                                <p class="text-sm">35 Lessons</p>
                                <div class="relative w-12 h-12 mt-4">
                                    <div class="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                                        <div class="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-5xl">👤</div>
                        </div></div>
                        <div style={{ height: '33%', width: '33%' }}><div class="w-full max-w-md h-51 bg-purple-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                            <div>
                                <h3 class="text-xl font-bold">Locations</h3>
                                <p class="text-sm">35 Lessons</p>
                                <div class="relative w-12 h-12 mt-4">
                                    <div class="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                                        <div class="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-5xl">👨🏻‍🎓</div>
                        </div></div>
                        <div style={{ height: '33%', width: '33%' }}><div class="w-full max-w-md h-51 bg-gray-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                            <div>
                                <h3 class="text-xl font-bold">Locations</h3>
                                <p class="text-sm">35 Lessons</p>
                                <div class="relative w-12 h-12 mt-4">
                                    <div class="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                                        <div class="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-5xl">🧑🏻‍🏫</div>
                        </div></div>
                        <div style={{ height: '33%', width: '33%' }}><div class="w-full max-w-md h-51 bg-pink-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                            <div>
                                <h3 class="text-xl font-bold">Locations</h3>
                                <p class="text-sm">35 Lessons</p>
                                <div class="relative w-12 h-12 mt-4">
                                    <div class="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                                        <div class="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-5xl">⌚</div>
                        </div></div>
                        <div style={{ height: '33%', width: '33%' }}><div class="w-full max-w-md h-51 bg-blue-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                            <div>
                                <h3 class="text-xl font-bold">Locations</h3>
                                <p class="text-sm">35 Lessons</p>
                                <div class="relative w-12 h-12 mt-4">
                                    <div class="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                                        <div class="absolute inset-0 flex items-center justify-center text-blue-500 font-bold" style={{ color: 'black' }}>75%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-5xl">😂</div>
                        </div></div>
                        <div style={{ height: '33%', width: '33%' }}><div class="w-full max-w-md h-51 bg-red-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                            <div>
                                <h3 class="text-xl font-bold">Locations</h3>
                                <p class="text-sm">35 Lessons</p>
                                <div class="relative w-12 h-12 mt-4">
                                    <div class="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                                        <div class="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-5xl">📤</div>
                        </div></div>
                    </div>
                </div>
            </center>
            <footer>
                <div className="top">
                    <div className="logo">
                        <a href="https://youtube.com/@Rishabh">Rishabh</a>
                    </div>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Youtube</a></li>
                        <li><a href="#">Projects</a></li>

                    </ul>
                    <div className="social-links">
                        <a href="https://www.instagram.com/rishabh_singh1520?igsh=MWthemxrdXZxanR2OQ%3D%3D" target="_blank">
                            <i className='bx bxl-instagram'></i>
                        </a>
                        <a href="https://www.linkedin.com/in/rishabh-gusain-1a319b299/" target="_blank">
                            <i className='bx bxl-linkedin-square'></i>

                        </a>
                        <a href="https://twitter.com/Rishabh152022" target="_blank">
                            <i className='bx bxl-twitter'></i>

                        </a>
                        <a href="https://www.facebook.com/RishabhGusain1520" target="_blank">
                            <i className='bx bxl-facebook-square'></i>
                        </a>
                    </div>
                </div>
                <div className="separator"></div>
                <div className="bottom">

                    <p>&copy; Rishabh Gusain . All rights reserved.</p>
                    <div className="links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookies Setting</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default dashboard
