import React from 'react';

const TopHeader = () => {
    return (
        <div style={styles.header}>
            <h1>Employee Management App</h1>
        </div>
    );
};

const styles = {
    header: {
        backgroundColor: '#333',
        color: 'white',
        height: '80px',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
    },
};

export default TopHeader;
