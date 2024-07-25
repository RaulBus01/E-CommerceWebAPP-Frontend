import React, { useState } from "react";
import "./user-profile-page.css"
import SideMenu from "../../components/sideMenu/sideMenu";
import PersonalInformationMenu from "../../components/user-account-submenus/personal-information-menu/personal-information-menu";
import MyOrdersMenu from "../../components/user-account-submenus/my-orders-menu/my-orders-menu";
import MyReviewsMenu from "../../components/user-account-submenus/my-reviews-menu/my-reviews-menu";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useUser from "../../hooks/useUser";

const UserProfilePage = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>("Personal information");
    const {logout, userId, token} = useAuth();
    const {user, loading} = useUser(userId, token);
    const navigate = useNavigate();

    const loadSelectedMenu = () => {
        if(user){
            switch (selectedMenu) {
                case "Personal information":
                    return <PersonalInformationMenu user={user} />;
                case "My orders":
                    return <MyOrdersMenu />;
                case "My reviews":
                    return <MyReviewsMenu />;
                default:
                    return <PersonalInformationMenu user={user} />;
            }
        }
    };

    const handleLogOut = () => {
        logout();
        navigate('/')
        toast.success('You have been logged out')
    };

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