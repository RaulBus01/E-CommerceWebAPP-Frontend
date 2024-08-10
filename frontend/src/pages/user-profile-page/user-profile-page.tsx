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
import DistributorProductsMenu from "../../components/user-account-submenus/distributor-products-menu/distributor-products-menu";
import { userData } from "../../types/UserType";

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
        else if(user.role === 'distributor'){
            return ['Personal Information','Products','Orders'];
        }

    }
    const [selectedMenu, setSelectedMenu] = useState<string>(sectionList[0]);
    const navigate = useNavigate();



    const loadSelectedMenu = () => {
        switch (selectedMenu) {
            case "Personal Information":
                return <PersonalInformationMenu user={user}/>;
            case "My orders":
                return <MyOrdersMenu token={token}/>;
            case "My reviews":
                return <MyReviewsMenu token={token as string} user={user}/>;
            case "My questions":
                return <MyQuestionsMenu userId={userIdPath} token={token as string}/>;
            case "Users":
                return <UsersMenu />;
            case "Products":
                return <DistributorProductsMenu user={user as userData} />;
            case "Orders":
                return <MyOrdersMenu token={token}/>;
            case "Reviews":
                return <MyReviewsMenu user={user} token={token as string} />;
            case "Questions":
                return <MyQuestionsMenu  user={user as userData} token={token as string}/>;
            default:
               if(user?.role === 'customer' || user?.role === 'distributor'){
                return <PersonalInformationMenu user={user}/>;
               }
                else if(user?.role === 'admin'){
                 return <UsersMenu />;
                }
               
                
           
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
               
            </div>
            <div className="user-info-container">
              
                <SideMenu 
                    setSelectedMenu={setSelectedMenu} 
                    name={user?.name || ""} 
                    sectionList={sectionList(user)}
                    logout={handleLogOut}
                />
               

                <div className="user-info">{loadSelectedMenu()}</div>
            </div>
        </div>
    );
}

export default UserProfilePage;