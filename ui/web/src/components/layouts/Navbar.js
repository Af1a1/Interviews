import React from 'react';

const Navbar = ({ username }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <h3 className='text-white'>Login System</h3>
        <h5 className='text-white'>{username}</h5>
      </div>
    </nav>
  );
};

export default Navbar;
