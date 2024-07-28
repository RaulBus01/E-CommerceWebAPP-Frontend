import React, { useState } from "react";
import "./user-profile-page.css"
import SideMenu from "../../components/side-menu/sideMenu";
import PersonalInformationMenu from "../../components/user-account-submenus/personal-information-menu/personal-information-menu";
import MyOrdersMenu from "../../components/user-account-submenus/my-orders-menu/my-orders-menu";
import MyReviewsMenu from "../../components/user-account-submenus/my-reviews-menu/my-reviews-menu";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const UserProfilePage = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>("Personal information");
    const {logout} = useAuth() 
    const navigate = useNavigate();

    const loadSelectedMenu = () => {
        switch (selectedMenu) {
            case "Personal information":
                return <PersonalInformationMenu />;
            case "My orders":
                return <MyOrdersMenu />;
            case "My reviews":
                return <MyReviewsMenu />;
            default:
                return <PersonalInformationMenu />;
        }
    }
    const handleLogOut = () => {
        
        logout();
        navigate('/')
        toast.success('You have been logged out')
    }

    return(
        <>
            <div className="main-container">
                <div className="top-container">
                    <h2>Your account</h2>
                    <button className="signOut-btn" onClick={handleLogOut}>Sign out</button>
                </div>
                <div className="user-info-container">
                    <SideMenu setSelectedMenu={setSelectedMenu}></SideMenu>
                    <div className="user-info">{loadSelectedMenu()}</div>
                </div>
            </div>
        </>
    );
}
export default UserProfilePage