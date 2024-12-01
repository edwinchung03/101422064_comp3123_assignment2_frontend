import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../APIConfig';


const EditEmployee = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: "",
    department: "",
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/emp/employees/${id}`);

        const formattedDate = response.data.date_of_joining
          ? response.data.date_of_joining.split("T")[0]
          : "";

        setEmployeeData({
          ...response.data,
          date_of_joining: formattedDate,
        });
      } catch (error) {
        setError("Failed to load employee data");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedEmployeeData = {
        ...employeeData,
        date_of_joining: new Date(employeeData.date_of_joining).toISOString(),
      };

      const response = await api.put(`/emp/employees/${id}`, updatedEmployeeData);
      console.log(response.data.message);

      navigate("/employees"); 
    } catch (error) {
      setError("Failed to update employee");
    }
  };

  return (
    <div>
      <h1>Edit Employee</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {[
          { label: "First Name", name: "first_name", type: "text" },
          { label: "Last Name", name: "last_name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Position", name: "position", type: "text" },
          { label: "Salary", name: "salary", type: "number" },
          { label: "Date of Joining", name: "date_of_joining", type: "date" },
          { label: "Department", name: "department", type: "text" },
        ].map((field) => (
          <div key={field.name} >
            <label>{field.label}:</label>
            <input
              type={field.type}
              value={employeeData[field.name]}
              onChange={(e) =>
                setEmployeeData({...employeeData, [field.name]: e.target.value})
              }
              style={{marginBottom: "15px"}}
              required
            />
          </div>
        ))}

        <button type="submit" disabled={loading} style={styles.actionButton}>
          {loading ? 'Editing Employee...' : 'Edit'}
        </button>
        <button
            type="button"
            onClick={() => navigate('/employees')}
            style={styles.cancelButton}
        >
            Cancel
        </button>
      </form>
    </div>
  );
};

const styles = {
  actionButton: {
    display: 'inline-block',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '5px',
    whiteSpace: 'nowrap',
    backgroundColor: '#4caf50',
    color: 'white'
  },
  cancelButton : {
    marginLeft: 10,
    backgroundColor: '#f44336',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  }
}

export default EditEmployee;