import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

import Hambuger from './hambuger';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const onSubmit = async (data) => {
    try {
      let r = await fetch("http://localhost:3000/Pending_request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await r.text();
      navigate('/regesterdstudents');
    } catch (error) {
      console.error(error);
    }
  };
  const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
    } = useForm();
  return (
    <div>
      <ToastContainer />
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
          <li><Hambuger/></li>  
        </ul>
      </nav>
      <center>
        <div style={{ height: '600px', marginTop: '20px', width: '70%', display: 'flex' }}>
          <div style={{ height: '600px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            <div style={{ height: '33%', width: '33%' }}>
              <Link to="/addquestion">
                <div className="w-full max-w-md h-51 bg-blue-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                  <div>
                    <h3 className="text-xl font-bold">POST QUESTIONS</h3>
                    <p className="text-sm">MCQ</p>
                    <div className="relative w-12 h-12 mt-4">
                      <div className="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                        <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold" style={{ color: 'black' }}>75%</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-5xl">📚</div>
                </div>
                </Link>
            </div>
            <div style={{ height: '33%', width: '33%' }}>
              <a href="">
                <div className="w-full max-w-md h-51 bg-red-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                  <div>
                    <h3 className="text-xl font-bold">Locations</h3>
                    <p className="text-sm">35 Lessons</p>
                    <div className="relative w-12 h-12 mt-4">
                      <div className="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                        <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-5xl">🖊️</div>
                </div>
              </a>
            </div>
            <div style={{ height: '33%', width: '33%' }}>
              <a href="">
                <div className="w-full max-w-md h-51 bg-yellow-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                  <div>
                    <h3 className="text-xl font-bold">Locations</h3>
                    <p className="text-sm">35 Lessons</p>
                    <div className="relative w-12 h-12 mt-4">
                      <div className="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                        <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-5xl">📝</div>
                </div>
              </a>
            </div>
            <div style={{ height: '33%', width: '33%' }}>
            <Link to="/studentregration">
              <div className="w-full max-w-md h-51 bg-orange-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                <div>
                  <h3 className="text-xl font-bold">Regester Students</h3>
                  <p className="text-sm">35 Lessons</p>
                  <div className="relative w-12 h-12 mt-4">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                      <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                    </div>
                  </div>
                </div>
                <div className="text-5xl">👤</div>
              </div>
              </Link>
            </div>
            <div style={{ height: '33%', width: '33%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full max-w-md h-51 bg-purple-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                <div>
                  <input type="submit" className="text-xl font-bold" value={"Pending Request"}/>
                  <p className="text-sm">Pending_request</p>
                  <div className="relative w-12 h-12 mt-4">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                      <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                    </div>
                  </div>
                 
                </div>
                <div className="text-5xl">👨🏻‍🎓</div>
              </div>
              </form>

            </div>
            <div style={{ height: '33%', width: '33%' }}>
              <div className="w-full max-w-md h-51 bg-gray-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                <div>
                  <h3 className="text-xl font-bold">Locations</h3>
                  <p className="text-sm">35 Lessons</p>
                  <div className="relative w-12 h-12 mt-4">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                      <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                    </div>
                  </div>
                </div>
                <div className="text-5xl">🧑🏻‍🏫</div>
              </div>
            </div>
            <div style={{ height: '33%', width: '33%' }}>
              <div className="w-full max-w-md h-51 bg-pink-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                <div>
                  <h3 className="text-xl font-bold">Locations</h3>
                  <p className="text-sm">35 Lessons</p>
                  <div className="relative w-12 h-12 mt-4">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                      <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                    </div>
                  </div>
                </div>
                <div className="text-5xl">⌚</div>
              </div>
            </div>
            <div style={{ height: '33%', width: '33%' }}>
              <div className="w-full max-w-md h-51 bg-blue-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                <div>
                  <h3 className="text-xl font-bold">Locations</h3>
                  <p className="text-sm">35 Lessons</p>
                  <div className="relative w-12 h-12 mt-4">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                      <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold" style={{ color: 'black' }}>75%</div>
                    </div>
                  </div>
                </div>
                <div className="text-5xl">😂</div>
              </div>
            </div>
            <div style={{ height: '33%', width: '33%' }}>
              <div className="w-full max-w-md h-51 bg-red-500 rounded-lg p-6 text-white flex items-center justify-between shadow-lg">
                <div>
                  <h3 className="text-xl font-bold">Locations</h3>
                  <p className="text-sm">35 Lessons</p>
                  <div className="relative w-12 h-12 mt-4">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full" style={{ backgroundColor: 'conic-gradient' }}>
                      <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">75%</div>
                    </div>
                  </div>
                </div>
                <div className="text-5xl">📤</div>
              </div>
            </div>
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
          <p>&copy; Rishabh Gusain. All rights reserved.</p>
          <div className="links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies Setting</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
