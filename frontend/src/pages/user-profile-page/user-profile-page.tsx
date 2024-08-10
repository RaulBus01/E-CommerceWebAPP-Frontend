import React, { useEffect, useState } from "react";
import "./user-profile-page.css";
import SideMenu from "../../components/side-menu/sideMenu";
import PersonalInformationMenu from "../../components/user-account-submenus/personal-information-menu/personal-information-menu";
import MyOrdersMenu from "../../components/user-account-submenus/my-orders-menu/my-orders-menu";
import MyReviewsMenu from "../../components/user-account-submenus/my-reviews-menu/my-reviews-menu";
import MyQuestionsMenu from "../../components/user-account-submenus/my-questions-menu/my-questions-menu";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useParams } from "react-router-dom";


const UserProfilePage: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>("Personal Information");
    const { token, user, logout } = useAuth();
    const { id: userIdPath } = useParams<{ id: string }>();
    console.log(user);
    const navigate = useNavigate();
 
    useEffect(() => {
        if (user) {
            switch (user.role) {
                case "admin":
                    navigate("/admin-dashboard");
                    break;
                case "distributor":
                    navigate(`/distributor-dashboard/${user.id}`);
                    break;
                default:
                    break;
            }
        }
    }, [user, navigate]);
  

    const loadSelectedMenu = () => {
        switch (selectedMenu) {
            case "Personal Information":
                return <PersonalInformationMenu user={user}/>;
            case "My orders":
                return <MyOrdersMenu token={token}/>;
            case "My reviews":
                return <MyReviewsMenu token={token} />;
            case "My questions":
                return <MyQuestionsMenu userId={userIdPath} token={token}/>;
            default:
                return <PersonalInformationMenu user={user} />;
        }
    };

    const handleLogOut = () => {
        logout();
        navigate('/');
        toast.success('You have been logged out');
    };

    return (
        <div className="user-profile-main-container">
            <div className="top-container">
                <h2>Your account</h2>
                <button className="signOut-btn" onClick={handleLogOut}>Sign out</button>
            </div>
            <div className="user-info-container">
                <SideMenu 
                    setSelectedMenu={setSelectedMenu} 
                    name={user?.name || ""} 
                    sectionList={['Personal Information','My orders','My reviews','My questions']}
                />
                <div className="user-info">{loadSelectedMenu()}</div>
            </div>
        </div>
    );
}

export default UserProfilePage;