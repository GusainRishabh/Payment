import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './masterpage.css';
import { Link } from 'react-router-dom';

function AddQuestion() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Question added successfully!');
        // Optionally, navigate or reset form here
      } else {
        toast.error('Question add failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while submitting the form');
    }
  };

  return (
    <>
      <div>
        <nav>
          <div className="logo">
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/education-logo-best-teacher-logo-design-template-7e9b38bf124afd7bbeae2c4aaa59480a_screen.jpg?ts=1677768434"
              alt="Logo"
            />
            <a href="#" target="_blank" rel="noopener noreferrer">Rishabh</a>
          </div>
          <ul>
            <li><a href="#main">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#about">About Me</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#feedback">Feedback</a></li>
          </ul>
          <ul>
            <li><Link to="/studentlogin">Student Login</Link></li>
            <li><Link to="/Loginform">Company Login</Link></li>
            <li><Link to="/Dashboard">Dashboard Login</Link></li>
            <li><Link to="/addquestion">Add Question</Link></li>
          </ul>
        </nav>

        <div style={{ marginTop: '20px' }}>
          <ToastContainer />
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="PaperCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <h1>Select Paper Code</h1>
            </label>
            <select id="PaperCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register('t1')}>
              <option value="">Select Paper Code</option>
              <option value="Paper A">Paper A</option>
              <option value="Paper B">Paper B</option>
              <option value="Paper C">Paper C</option>
              <option value="Paper D">Paper D</option>
            </select>

            <label htmlFor="SerialNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Serial Number
            </label>
            <input type="text" id="SerialNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Serial Number" required {...register('t2')} />

            <label htmlFor="Section" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <h1>Select Section</h1>
            </label>
            <select id="Section" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register('t3')}>
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>

            <label htmlFor="AddQuestion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ marginTop: '20px' }}>
              Add Question
            </label>
            <input type="text" id="AddQuestion" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Questions" {...register('t4')} />

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="Option1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Option 1
                </label>
                <input type="text" id="Option1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Option 1" required {...register('t5')} />
              </div>
              <div>
                <label htmlFor="Option2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Option 2
                </label>
                <input type="text" id="Option2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Option 2" required {...register('t6')} />
              </div>
              <div>
                <label htmlFor="Option3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Option 3
                </label>
                <input type="text" id="Option3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Option 3" required {...register('t7')} />
              </div>
              <div>
                <label htmlFor="Option4" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Option 4
                </label>
                <input type="text" id="Option4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Option 4" required {...register('t8')} />
              </div>
              <div>
                <label htmlFor="RightAnswer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Right Answer
                </label>
                <input type="text" id="RightAnswer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Right Answer" required {...register('t10')} />
              </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Submit
            </button>
          </form>
        </div>

        <footer style={{ bottom: '0', width: '100%', padding: '55px' }}>
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
              <a href="https://www.instagram.com/rishabh_singh1520?igsh=MWthemxrdXZxanR2OQ%3D%3D" target="_blank" rel="noopener noreferrer">
                <i className='bx bxl-instagram'></i>
              </a>
              <a href="https://www.linkedin.com/in/rishabh-gusain-1a319b299/" target="_blank" rel="noopener noreferrer">
                <i className='bx bxl-linkedin-square'></i>
              </a>
              <a href="https://twitter.com/Rishabh152022" target="_blank" rel="noopener noreferrer">
                <i className='bx bxl-twitter'></i>
              </a>
              <a href="https://www.facebook.com/RishabhGusain1520" target="_blank" rel="noopener noreferrer">
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
    </>
  );
}

export default AddQuestion;
