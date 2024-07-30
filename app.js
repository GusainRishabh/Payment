import express, { response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { authenticator } from 'otplib';
import { Result } from 'postcss';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));


// Set up Express app
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Database setup
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Tech',
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rishabhgusain51@gmail.com', // Replace with your Gmail address
    pass: 'uozs pcjw bzbz krbb'     // Replace with your Gmail app password
  },
});



//// Academy Section
// Handle form submission and send OTP email
app.post('/form', async (req, res) => {
  const { t1, t2, t3, t4, t5, t6, t7 } = req.body;
  const otp = authenticator.generate('secret-key'); // Generate OTP
  const currentDateTime = new Date().toLocaleString(); // Get current datetime
  const otpCreatedAt = new Date(); // OTP creation time
  const subscription_start = new Date(); // Subscription start time
  const subscription_end = new Date(subscription_start.getTime() + 30 * 24 * 60 * 60 * 1000); // Subscription end time (30 days later)
  const subscription_status = 'active'; // Subscription status

  try {
    const connection = await pool.getConnection();
    const query = 'INSERT INTO academy(Academy_Name, Phone_Number, Plan, Company_Website, Company_Id, Email_Address, Password, otp, otp_created_at,subscription_start,subscription_end,subscription_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'; // Insert query



    await connection.execute(query, [t1, t2, t3, t4, t5, t6, t7, otp, otpCreatedAt,subscription_start,subscription_end,subscription_status]);

    connection.release();

    const mailOptions = {
      from: '"Rishabh Gusain" <rishabhgusain51@gmail.com>',
      to: t6,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="text-align: center; color: #0044cc;">Sand Box</h2>
        <p style="font-size: 16px;">Dear User,</p>
        <p style="font-size: 16px;">Your OTP code is:</p>
        <div style="text-align: center; font-size: 24px; font-weight: bold; color: #0044cc; margin: 20px 0;">
          ${otp}
        </div>
        <p style="font-size: 16px;">This code is valid for 5 minutes.</p>
        <p style="font-size: 16px;">If you did not request this code, please ignore this email or contact support if you have any concerns.</p>
        <p style="font-size: 16px;">Time of request: ${currentDateTime}</p>
        <p style="font-size: 16px;">Thank you,</p>
        <p style="font-size: 16px;">Sand Box </p>
      </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending OTP email');
        return;
      }
      console.log('Email sent:', info.response);
      res.status(200).send('success');
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error: ' + err);
  }
});

// API endpoint to handle OTP verification
// API endpoint to handle OTP verification
app.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;
  const currentDateTime = new Date();
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

  try {
    const connection = await pool.getConnection();
    const query = 'SELECT * FROM academy WHERE otp = ?';
    const [rows] = await connection.execute(query, [otp]);

    if (rows.length > 0) {
      const otpCreatedAt = new Date(rows[0].otp_created_at);
      const timeDifference = currentDateTime - otpCreatedAt;

      if (timeDifference <= fiveMinutes) {
        res.send('success');
      } else {
        res.send('otp_expired'); // Changed to match the expected response on the frontend
      }
    } else {
      res.send('invalid_otp'); // Changed to a more specific response for invalid OTP
    }
    connection.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error: ' + err);
  }
});


// API endpoint to handle second form submission
app.post('/form2', async (req, res) => {
  const { t1, t2 } = req.body;

  if (!t1 || !t2) {
    return res.status(400).json({ message: 'Both Company_Id and Password are required' });
  }

  let connection;

  try {
    connection = await pool.getConnection();
    const query = 'SELECT * FROM academy WHERE Company_Id = ? AND Password = ?';
    const [rows] = await connection.execute(query, [t1, t2]);

    if (rows.length === 0) {
      connection.release();
      return res.status(400).json({ message: 'Invalid Company_Id or Password' });
    }

    const subscription_end = new Date(rows[0].subscription_end);
    const currentDate = new Date();
    console.log("Current Date: " + currentDate);
    console.log("Expire Date: " + subscription_end);

    const jsonString = JSON.stringify(rows);
    const filePath = 'info.json';
    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        connection.release();
        return res.status(500).json({ message: 'Error writing file' });
      }
      console.log('JSON data has been saved to', filePath);
      
      if (subscription_end > currentDate) {
        connection.release();
        console.log("Subscription Is Valid")
        return res.json({ status: 'valid' });
      } else {
        connection.release();
        console.log("Subscription Is Invalid")
        return res.json({ status: 'expired' });
      }
    });

  } catch (err) {
    if (connection) connection.release(); // Ensure connection is released in case of error
    console.error(err);
    return res.status(500).json({ message: 'Database error: ' + err });
  }
});



// Repeated form handling endpoints (form3, form4, form5) optimized for clarity
const handleFormSubmission = async (req, res, planValue) => {
  try {
    const connection = await pool.getConnection();
    const query = 'INSERT INTO plan(plan) VALUES (?)';
    await connection.execute(query, [planValue]);

    const selectQuery = 'SELECT * FROM plan';
    const [rows] = await connection.execute(selectQuery);

    const jsonString = JSON.stringify(rows);
    const filePath = 'plan.json';

    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('JSON data has been saved to', filePath);
    });

    const deleteQuery = 'DELETE FROM plan';
    await connection.execute(deleteQuery);

    connection.release();
    res.redirect('/studentdashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error: ' + err);
  }
};

app.post('/form3', (req, res) => handleFormSubmission(req, res, req.body.t1));
app.post('/form4', (req, res) => handleFormSubmission(req, res, req.body.t2));
app.post('/form5', (req, res) => handleFormSubmission(req, res, req.body.t3));

// Edit profile endpoint
app.post('/editprofile', async (req, res) => {
  try {
    const { t1, t2, t3, t4, t5, t6, t7 } = req.body;

    const connection = await pool.getConnection();
    const query = 'UPDATE academy SET Academy_Name=?, Phone_Number=?, Plan=?, Company_Website=?, Company_Id=?, Email_Address=? WHERE Password=?';
    await connection.execute(query, [t1, t2, t3, t4, t5, t6, t7]);

    connection.release();

    res.send('Profile updated successfully');
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send('Internal server error');
  }
});


//// Question Section

app.post('/question', async (req, res) => {
  const { Paper_Code, Serial_Number, Section, Add_Question, Option_1, Option_2, Option_3, Option_4, Right_Answer } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `
      INSERT INTO question(Paper_Code, Serial_Number, Section, Add_Question, Option_1, Option_2, Option_3, Option_4, Right_Answer)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `; // Insert query

    await connection.execute(query, [Paper_Code, Serial_Number, Section, Add_Question, Option_1, Option_2, Option_3, Option_4, Right_Answer]);

    connection.release();

    res.json({ status: 'success', message: 'Question inserted successfully' });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});




//// End



app.post('/sliver', async (req, res) => {
  const { t1 } = req.body;
  try {
    const connection = await pool.getConnection();

    const insertQuery = 'INSERT INTO studentplan(plan) VALUES (?)';
    await connection.execute(insertQuery, [t1]);

    const selectQuery = 'SELECT * FROM studentplan';
    const [rows, fields] = await connection.execute(selectQuery);

    connection.release();

    // Respond with success message
    res.status(200).send({ message: 'Data inserted successfully' });

    // Write the JSON data to the file
    const jsonString = JSON.stringify(rows);
    const filePath = 'studentplan.json';
    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('JSON data has been saved to', filePath);
      
    });
    const deleteQuery = 'DELETE FROM studentplan';
    await connection.execute(deleteQuery);
  } catch (err) {
    console.error('Error processing request:', err);
    res.status(500).send('Internal server error');
  }
});


app.post('/gold', async (req, res) => {
  const { t2 } = req.body;
  try {
    const connection = await pool.getConnection();

    const insertQuery = 'INSERT INTO studentplan(plan) VALUES (?)';
    await connection.execute(insertQuery, [t2]);

    const selectQuery = 'SELECT * FROM studentplan';
    const [rows, fields] = await connection.execute(selectQuery);

    connection.release();

    // Respond with success message
    res.status(200).send({ message: 'Data inserted successfully' });

    // Write the JSON data to the file
    const jsonString = JSON.stringify(rows);
    const filePath = 'studentplan.json';
    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('JSON data has been saved to', filePath);
      
    });
    const deleteQuery = 'DELETE FROM studentplan';
    await connection.execute(deleteQuery);
  } catch (err) {
    console.error('Error processing request:', err);
    res.status(500).send('Internal server error');
  }
});
app.post('/plat', async (req, res) => {
  const { t3 } = req.body;
  try {
    const connection = await pool.getConnection();

    const insertQuery = 'INSERT INTO studentplan(plan) VALUES (?)';
    await connection.execute(insertQuery, [t3]);

    const selectQuery = 'SELECT * FROM studentplan';
    const [rows, fields] = await connection.execute(selectQuery);

    connection.release();

    // Respond with success message
    res.status(200).send({ message: 'Data inserted successfully' });

    // Write the JSON data to the file
    const jsonString = JSON.stringify(rows);
    const filePath = 'studentplan.json';
    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('JSON data has been saved to', filePath);
      
    });
    const deleteQuery = 'DELETE FROM studentplan';
    await connection.execute(deleteQuery);
  } catch (err) {
    console.error('Error processing request:', err);
    res.status(500).send('Internal server error');
  }
});
// Repeated form handling endpoints (form3, form4, form5) optimized for clarity

/// Student Regration Code


// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/studentregration', upload.single('t11'), async (req, res) => {
  const { t1, t2, t3, t4, t5, t6, t7, t8, t9, t10 } = req.body;
  const file_path = req.file ? req.file.path : null;

  try {
    const connection = await pool.getConnection();
    const query = 'INSERT INTO student (Student_Name, Last_Name, Address, Phone_Number, Father_Name, Student_Id, Email_Id, Password, plan, status, file_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await connection.execute(query, [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, file_path]);

    connection.release();

    res.send('Insert successfully');
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send('Internal server error');
  }
});

// Student Login Code
app.post('/studentlogin', async (req, res) => {
  const { t1, t2 } = req.body;

  let connection;
  try {
    connection = await pool.getConnection();
    const query = 'SELECT * FROM student WHERE Student_Id = ? AND Password = ?';
    const [rows] = await connection.execute(query, [t1, t2]);

    if (rows.length > 0) {
      const student = rows[0];
      if (student.status === 'Success') {
        res.send('Login successfully');
      } else {
        res.send('Login failed: status is not success');
      }
    } else {
      res.send('Login failed: invalid Student_Id or Password');
    }

    const jsonString = JSON.stringify(rows);
    const filePath = 'student.json';

    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('JSON data has been saved to', filePath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error: ' + err });
  } finally {
    if (connection) connection.release(); // Ensure connection is released in both success and error cases
  }
});


app.post('/viewpaper', async (req, res) => {
  const { section } = req.body;

  if (!section) {
    return res.status(400).send('Section is required');
  }

  try {
    const connection = await pool.getConnection();
    // Use the section parameter in the query
    const query = 'SELECT * FROM question WHERE Section = ?';
    const [rows] = await connection.execute(query, [section]);
    connection.release();

    const filePath = path.join(__dirname, 'SectionA.json');
    
    fs.writeFile(filePath, JSON.stringify(rows, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
        return res.status(500).send('Error writing JSON file');
      }
      console.log('JSON file created successfully' , filePath);
      res.json(rows); // Send data as JSON response
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error: ' + err.message);
  }
});

app.post('/viewpapersectionB', async (req, res) => {
  const { section } = req.body;

  if (!section) {
    return res.status(400).send('Section is required');
  }

  try {
    const connection = await pool.getConnection();
    // Use the section parameter in the query
    const query = 'SELECT * FROM question WHERE Section = ?';
    const [rows] = await connection.execute(query, [section]);
    connection.release();

    const filePath = path.join(__dirname, 'SectionB.json');
    
    fs.writeFile(filePath, JSON.stringify(rows, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
        return res.status(500).send('Error writing JSON file');
      }
      console.log('JSON file created successfully' , filePath);
      res.json(rows); // Send data as JSON response
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error: ' + err.message);
  }
});


app.post('/Pending_request', async (req, res) => {
  const query = "SELECT * FROM student WHERE status = 'pending'";
  
  let connection;

  try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(query);

    const studentCount = results.length;

    console.log("Number of pending students: " + studentCount);

    // Create JSON string with the pending students data
    const jsonString = JSON.stringify(results, null, 2);
    const filePath = 'pendingstudents.json';

    // Write JSON string to file
    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ message: 'Error writing file' });
      }
      console.log('JSON data has been saved to', filePath);
      res.json({ count: studentCount });
    });

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send({ message: 'Error executing query' });
  } finally {
    if (connection) connection.release(); // Ensure connection is released
  }
});











app.post('/submitAnswers', async (req, res) => {
  const {
    studentInfo: { Student_Name, Student_Id, Email_Id, Paper_Code ,attemptedQuestions, correctAnswers, wrongAnswers},
    score
  } = req.body;

  console.log('Request received:', { Student_Name, Student_Id, Email_Id, Paper_Code, attemptedQuestions, correctAnswers, wrongAnswers, score });

  try {
    // Get a connection from the pool
    let connection;

    console.log('Getting connection from pool...');
    connection = await pool.getConnection();
    console.log('Connection obtained.');

    // Prepare the query
    const query = `
      INSERT INTO answers (Student_Name, Student_Id, Email_Id, Total_Marks, Paper_Code, Attempt_questions, Right_Answer, Wrong_Answer)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    console.log('Executing query:', query);
    console.log('Query parameters:', [Student_Name, Student_Id, Email_Id, score, Paper_Code, 
      JSON.stringify(attemptedQuestions), JSON.stringify(correctAnswers), JSON.stringify(wrongAnswers)]);

    // Execute the query
    await connection.execute(query, [Student_Name, Student_Id, Email_Id, score, Paper_Code, 
      JSON.stringify(attemptedQuestions), JSON.stringify(correctAnswers), JSON.stringify(wrongAnswers)]);

    console.log('Query executed successfully.');

    // Release the connection back to the pool
    connection.release();
    console.log('Connection released back to the pool.');

    // Send response
    res.send('Insert successfully');
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send('Internal server error');
  }
});





app.post('/update', async (req, res) => {
  const { studentIds } = req.body; // studentIds is an array of Student_Id values

  let connection;
  try {
    connection = await pool.getConnection();
    const studentDetails = [];

    // Use for...of loop to handle asynchronous operations correctly
    for (const studentId of studentIds) {
      const query = 'SELECT * FROM student WHERE Student_Id = ?';
      const [rows] = await connection.execute(query, [studentId]);
      
      if (rows.length > 0) {
        studentDetails.push(rows[0]); // Assuming you want to push the first row of results
      }
    }

    const jsonString = JSON.stringify(studentDetails, null, 2);
    const filePath = 'studentdetail.json';

    // Use a promise to handle the fs.writeFile operation
    await new Promise((resolve, reject) => {
      fs.writeFile(filePath, jsonString, 'utf8', (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });

    console.log('JSON data has been saved to', filePath);
    res.status(200).json({ message: 'Data processed successfully' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Database error: ' + err.message });
  } finally {
    if (connection) connection.release(); // Ensure connection is released in both success and error cases
  }
});



app.post('/conform', async (req, res) => {
  try {
    const { a1, t6 } = req.body;

    if (!a1 || !t6) {
      return res.status(400).send('Missing required fields');
    }

    const connection = await pool.getConnection();

    // Update the student's status
    await connection.execute('UPDATE student SET status = ? WHERE Student_Id = ?', [a1, t6]);

    // Fetch the updated student details
    const [rows] = await connection.execute('SELECT * FROM student WHERE Student_Id = ?', [t6]);
    const student = rows[0];
    connection.release();
    console.log(student)

    // Send email if the status has changed
    if (student.status === a1) {
      const mailOptions = {
        from: `"Rishabh Gusain" <${process.env.EMAIL_USER}>`,
        to: student.Email_Id,
        subject: 'Your Status Has Been Updated',
        html: `
          <html>
            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <h2 style="color: #2c3e50; margin-bottom: 20px;">Status Update</h2>
                <p style="margin-bottom: 20px;">Dear ${student.Student_Name} ${student.Last_Name},</p>
                <p style="margin-bottom: 20px;">We wanted to inform you that your status has been updated.</p>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr style="background-color: #ffffff; border: 1px solid #ddd;">
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Current Status</th>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${student.status}</td>
                  </tr>
                  <tr style="background-color: #ffffff; border: 1px solid #ddd;">
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Login ID</th>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${student.Student_Id}</td>
                  </tr>
                  <tr style="background-color: #ffffff; border: 1px solid #ddd;">
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Password</th>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${student.Password}</td>
                  </tr>
                </table>
                <p style="margin-bottom: 20px;">If you have any questions or need further assistance, feel free to reply to this email.</p>
                <p style="margin-bottom: 10px;">Best regards,</p>
                <p style="margin-bottom: 10px;"><strong>Sand Box</strong></p>
                <p style="font-size: 14px; color: #777;">This is an automated message. Please do not reply directly to this email.</p>
              </div>
            </body>
          </html>`
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${student.Email_Id}`);
    }

    res.send('Profile updated successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});




/// Update Profile

app.post('/editprofilestudent', upload.single('profile_image'), async (req, res) => {
  try {
    const { t1, t2, t3, t4, t5, t6, t7, t8 } = req.body;
    const profileImage = req.file ? req.file.path : null; // Get the path of the uploaded file

    const connection = await pool.getConnection();
    const query = `UPDATE student SET Student_Name=?, Last_Name=?, Address=?, Phone_Number=?, Father_Name=?, Student_Id=?, Email_Id=?, file_path=? WHERE Password=?`;
    await connection.execute(query, [t1, t2, t3, t4, t5, t6, t7, profileImage, t8]);

    connection.release();

    res.send('Profile updated successfully');
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send('Internal server error');
  }
});





// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
