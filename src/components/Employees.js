import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../APIConfig";
import "./assets/Employees.css";

const Employees = () =>{
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchEmployees = async () =>{
        try{
            const response = await api.get("/emp/employees");
            setEmployees(response.data);
        } catch(e){
            setError("Failed to load employees")
        }
    };

    useEffect(()=>{
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this employee?")) {
        try {
          await api.delete(`/emp/employees?eid=${id}`);
          setEmployees((prev) => prev.filter((emp) => emp.employee_id !== id));
        } catch (error) {
          setError("Failed to delete employee");
        }
      }
    };

    const handleLogOut = async () =>{
      localStorage.removeItem('authToken');
      navigate("/");
    }

    return(
        <div className="employees-container">
          <h1>Employees List</h1>
          {error && <p style={{color: 'red'}}>{error}</p>}
          <button
            className="addEmployee-button"
            onClick={() => navigate("/addEmployee")}>
            Add Employee
          </button>
          <button className="logout-button" onClick={handleLogOut}>
            Logout
          </button>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.employee_id}</td>
                <td>
                <button
                  className="action-button view-details-button"
                  onClick={() => navigate(`/employees/${employee.employee_id}`)}
                >
                  View Details
                </button>
                <button
                  className="action-button update-button"
                  onClick={() => navigate(`/employees/update/${employee.employee_id}`)}
                >
                  Update
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(employee.employee_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    )
}


export default Employees;

