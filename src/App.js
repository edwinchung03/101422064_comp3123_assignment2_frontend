import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import TopHeader from './components/top_header';
import Login from './components/Login';
import SignUp from './components/Signup'
import Employees from './components/Employees';
import AddEmployee from './components/AddEmployee';
import EmployeeDetails from './components/EmployeeDetails';
import EditEmployee from './components/EditEmployee';

const App = () => {

  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    setIsLoggedin(!!localStorage.getItem("token"));
  }, []);

  const updateStatus = (status) => {
    setIsLoggedin(status);
  };

  return (
    <BrowserRouter>
      <TopHeader />
      <div style={styles.pageContainer}>
        <div style={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={
              isLoggedin ? (
                <Navigate to="/employees" />
              ) : (
                <Login updateStatus={updateStatus} />
              )
            } />
            <Route path="/signup" element={
              isLoggedin ? (
                <Navigate to="/employees" />
              ) : (
                <SignUp updateStatus={updateStatus} />
              )
            } />
            <Route path="/employees" element={
              isLoggedin ? <Employees /> : <Navigate to="/" />
            } />
            <Route path="/addEmployee" element={
              isLoggedin ? <AddEmployee /> : <Navigate to="/" />
            } />
            <Route path="/employees/:id" element={
              isLoggedin ? <EmployeeDetails /> : <Navigate to="/" />
            } />
            <Route path="/employees/update/:id" element={
              isLoggedin ? <EditEmployee /> : <Navigate to="/" />
            } />

            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

const styles = {
  pageContainer: {
    margin: 0,               
    padding: 0,               
    height: '100vh',          
    width: '100vw',           
    backgroundColor: 'lightgreen', 
    display: 'flex',         
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentWrapper: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: 10,
    textAlign: 'center',
    maxWidth: '1700px',
    width: '100%',
    overflowX: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },  

  centerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',      
  },
};

export default App;
