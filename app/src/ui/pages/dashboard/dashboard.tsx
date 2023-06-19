import React from 'react';
import Navbar from '../../components/Navbar/navbar';
import Header from '../../components/Header/header';
import SidebarMenu from '../../components/SideMenu/sidemenu';
import SearchBar from '../../components/SearchBar/searchbar';
import CustomButton from '../../components/CustomButton/custombutton';


import './dashboard.css'


const username = "Fábio Bala";

const DashboardPage = () => {
  return (
    <div>
      <Navbar username={username}/>
      <Header />
      <SidebarMenu />
      <div className="searchbar">
        <SearchBar />
      </div>
      <div className="button-div">
        <div className='button-div-row1'>
        <CustomButton text="Nutricionistas"/>
        <CustomButton text="Academias" />
        </div>
        <div className='button-div-row2'>
        <CustomButton text="Playlists" />
        <CustomButton text="Personal" />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
