import React, { useEffect, useState } from "react";
import "./distributor-profile-page.css"
import SideMenu from "../../components/side-menu/sideMenu";
import PersonalInformationMenu from "../../components/user-account-submenus/personal-information-menu/personal-information-menu";
import MyOrdersMenu from "../../components/user-account-submenus/my-orders-menu/my-orders-menu";

import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import DistributorProductsMenu from "../../components/user-account-submenus/distributor-products-menu/distributor-products-menu";



const DistributorProfilePage = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>("Personal Information");
    const { token, user, logout } = useAuth();
    

    const navigate = useNavigate();


    const loadSelectedMenu = () => {
        if (user) {
            switch (selectedMenu) {
                case "Personal Information":
                    return <PersonalInformationMenu user={user} />;
                case "My Products":
                    return <DistributorProductsMenu />;
                case "My Orders":
                    return <MyOrdersMenu  token={token as string}/>;

                default:
                    return <PersonalInformationMenu user={user} />;
            }
        }
    };

    const handleLogOut = () => {
        logout();
        navigate('/');
        toast.success('You have been logged out');
    };

   

    return (
        <div className="distributor-profile-main-container">
            <div className="top-container">
                <h2>Your account</h2>
                <button className="signOut-btn" onClick={handleLogOut}>Sign out</button>
            </div>
            <div className="distributor-info-container">
                <SideMenu 
                    setSelectedMenu={setSelectedMenu} 
                    name={user?.name || ""} 
                    sectionList={['Personal Information','My Products','My Orders']}
                />
                <div className="user-info">{loadSelectedMenu()}</div>
            </div>
        </div>
    );
}
export default DistributorProfilePage;