import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function PendingStudents() {
  const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
  const [usersInfo, setUsersInfo] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set()); // Set to track selected Student_Ids
  const navigate = useNavigate();

  useEffect(() => {
    fetch('pendingstudents.json')
      .then(response => response.json())
      .then(data => {
        setUsersInfo(data);
        data.forEach((user, index) => {
          setValue(`students[${index}].Student_Name`, user.Student_Name);
          setValue(`students[${index}].Last_Name`, user.Last_Name);
          setValue(`students[${index}].Phone_Number`, user.Phone_Number);
          setValue(`students[${index}].Payment_Id`, user.plan);
          setValue(`students[${index}].Status`, user.status);
          setValue(`students[${index}].Student_Id`, user.Student_Id);
          
        });
      })
      .catch(error => console.error('Error fetching user info:', error));
  }, [setValue]);

  const handleRowClick = (studentId) => {
    setSelectedIds(prevSelectedIds => {
      const newSelectedIds = new Set(prevSelectedIds);
      if (newSelectedIds.has(studentId)) {
        newSelectedIds.delete(studentId);
      } else {
        newSelectedIds.add(studentId);
      }
      return newSelectedIds;
    });
  };

  const onSubmit = async (data) => {
    try {
      const selectedStudents = data.students.filter(student => selectedIds.has(student.Student_Id));
      const studentIds = selectedStudents.map(student => student.Student_Id);
      const response = await fetch("http://localhost:3000/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentIds }),
      });
      if (response.ok) {
        navigate('/studentdetail');
      } else {
        console.error('Error submitting form data:', await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {usersInfo.map((user, index) => (
              <tr
                key={index}
                className={`border-b dark:border-gray-700 ${selectedIds.has(user.Student_Id) ? 'bg-gray-100 dark:bg-gray-900' : ''}`}
                onClick={() => handleRowClick(user.Student_Id)}
              >
                <td className="px-6 py-4">{user.Student_Name}</td>

                <td className="px-6 py-4">{user.Last_Name}</td>
                <td className="px-6 py-4">{user.Phone_Number}</td>
                <td className="px-6 py-4">{user.plan}</td>
                <td className="px-6 py-4">{user.status}</td>
                <td className="px-6 py-4"><button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Edit
                  </button></td>

                <td className="px-6 py-4">
                  <Controller
                    name={`students[${index}].Student_Id`}
                    control={control}
                    defaultValue={user.Student_Id}
                    render={({ field }) => <input type="hidden" {...field} />}
                  />
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default PendingStudents;
