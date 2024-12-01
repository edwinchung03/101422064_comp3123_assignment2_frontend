import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../APIConfig';

const EmployeeDetails = () =>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try{
                const response = await api.get(`/emp/employees/${id}`);
                setEmployee(response.data);
            } catch (e) {
                setError('Failed to fetch employee data');
            }
        };
        fetchEmployeeDetails();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    if (error) {
        return <p style={{color: 'red'}}>{error}</p>;
    }
    
    if (!employee) {
        return <p style={{color: 'red'}}>Failed loading employee details</p>;
    }

    return (
        <div>
          <h1>Employee Details</h1>
          {error && <p style={{color: 'red'}}>{error}</p>}
          <div>
            <p>
              <strong>Name: </strong> {employee.first_name} {employee.last_name}
            </p>
            <p>
              <strong>Email: </strong> {employee.email}
            </p>
            <p>
              <strong>Position: </strong> {employee.position}
            </p>
            <p>
              <strong>Salary: </strong> ${employee.salary}
            </p>
            <p>
              <strong>Date of Joining:</strong>{" "}
              {formatDate(employee.date_of_joining)}
            </p>
            <p>
              <strong>Department:</strong> {employee.department}
            </p>
            <button
              className="back-button"
              onClick={() => navigate("/employees")}
              style={styles.actionButton}
            >
              Back to Employee List
            </button>
          </div>
        </div>
      );
};

const styles = {
  actionButton: {
    display: 'inline-block',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '5px',
    whiteSpace: 'nowrap',
    backgroundColor: '#4caf50',
    color: 'white'
  }
}

export default EmployeeDetails;