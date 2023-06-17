import React from 'react';
import Navbar from '../../components/Navbar/navbar';

const username = "Fábio Bala"

const DashboardPage = () => {
  return (
    <div>
      <Navbar username={username}/>
      {/* Conteúdo da página de Dashboard */}
    </div>
  );
}

export default DashboardPage;
