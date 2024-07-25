import React, { useState } from "react";
import "./user-profile-page.css"
import SideMenu from "../../components/sideMenu/sideMenu";
import PersonalInformationMenu from "../../components/user-account-submenus/personal-information-menu/personal-information-menu";
import MyOrdersMenu from "../../components/user-account-submenus/my-orders-menu/my-orders-menu";
import MyReviewsMenu from "../../components/user-account-submenus/my-reviews-menu/my-reviews-menu";

const UserProfilePage = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>("Personal information");

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

    return(
        <>
            <div className="main-container">
                <div className="top-container">
                    <h2>Your account</h2>
                    <button className="signOut-btn">Sign out</button>
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