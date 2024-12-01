import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../APIConfig';

const AddEmployee = () => {

    const [employeeData, setEmployeeData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      position: "",
      salary: "",
      date_of_joining: "",
      department: "",
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddEmployee = async (event) => {
      event.preventDefault();
      setLoading(true); 

      try{
        const response = await api.post("/emp/employees", employeeData);
        console.log(response.data.message);
        navigate("/employees");
      } catch (e){
        setError("Failed to add employee")
        if (e.response) {
          setError(e.response.data.message || 'Adding employee failed');
        } else {
          setError('Network error. Please try again later.');
        }
      }
    }

    return (
      <div>
      <h2>Add Employee</h2>

      {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}

      <form onSubmit={handleAddEmployee}>
        {[
          { label: "First Name", name: "first_name", type: "text" },
          { label: "Last Name", name: "last_name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Position", name: "position", type: "text" },
          { label: "Salary", name: "salary", type: "number" },
          { label: "Date of Joining", name: "date_of_joining", type: "date" },
          { label: "Department", name: "department", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label>{field.label}:</label>
            <input
              type={field.type}
              value={employeeData[field.name]}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, [field.name]: e.target.value })
              }
              style={{marginBottom: '15px'}}
              required
            />
          </div>
          ))}
        <div>
          <button type="submit" disabled={loading} style={styles.signUpButton}>
            {loading ? 'Adding Employee...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/employees')}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>

      </div>
      );
}

const styles = {
  signUpButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100',
    transition: 'background-color 0.3s ease',
  },
  cancelButton : {
    marginLeft: 10,
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  }
}

export default AddEmployee;