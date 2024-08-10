import React, { useEffect, useState } from "react";
import "./user-profile-page.css";
import SideMenu from "../../components/side-menu/sideMenu";
import PersonalInformationMenu from "../../components/user-account-submenus/personal-information-menu/personal-information-menu";
import MyOrdersMenu from "../../components/user-account-submenus/my-orders-menu/my-orders-menu";
import MyReviewsMenu from "../../components/user-account-submenus/my-reviews-menu/my-reviews-menu";
import MyQuestionsMenu from "../../components/user-account-submenus/my-questions-menu/my-questions-menu";
import AdminMenu from "../../components/user-account-submenus/admin-menu/admin-menu";
import UsersMenu from "../../components/user-account-submenus/admin-menu/users-menu";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useParams } from "react-router-dom";

const UserProfilePage: React.FC = () => {

  

    

    const { token,user, logout } = useAuth();
    const { id: userIdPath } = useParams<{ id: string }>();

    const sectionList = (user) => {
        if(user.role === 'customer'){
            return ['Personal Information','My orders','My reviews','My questions'];
        }
        else if(user.role === 'admin'){
            return ['Users','Products','Orders','Reviews','Questions'];
        }
    }

    const [selectedMenu, setSelectedMenu] = useState<string>(sectionList[0]);
    const navigate = useNavigate();

   

 
    useEffect(() => {
      
        switch (user?.role) {
            case "distributor":
                navigate(`/distributor-dashboard/${user.id}`);
                break;
            default:
                break;
        }
        
    }, [user, navigate]);

  

    const loadSelectedMenu = () => {
        console.log(user?.role)
        switch (selectedMenu) {
            case "Personal Information":
                return <PersonalInformationMenu user={user}/>;
            case "My orders":
                return <MyOrdersMenu token={token}/>;
            case "My reviews":
                return <MyReviewsMenu token={token} />;
            case "My questions":
                return <MyQuestionsMenu userId={userIdPath} token={token as string}/>;
            case "Users":
                return <UsersMenu />;
            case "Products":
                return <UsersMenu />; 
            case "Orders":
                return <MyOrdersMenu token={token}/>;
            case "Reviews":
                return <MyReviewsMenu user={user} token={token} />;
            case "Questions":
                return <MyQuestionsMenu  user={user} token={token as string}/>;
            default:
                return user?.role === 'customer' ? <PersonalInformationMenu user={user} /> : <AdminMenu />;
                
           
        }
    }



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
                {user?.role === 'customer ' ?
                <SideMenu 
                    setSelectedMenu={setSelectedMenu} 
                    name={user?.name || ""} 
                    sectionList={sectionList(user)}
                />
                : user?.role ==='admin' ?
                <SideMenu 
                    setSelectedMenu={setSelectedMenu}
                    name={user?.name || ""}
                    sectionList={sectionList(user)}
                />
                :null
                }

                <div className="user-info">{loadSelectedMenu()}</div>
            </div>
        </div>
    );
}

export default UserProfilePage;