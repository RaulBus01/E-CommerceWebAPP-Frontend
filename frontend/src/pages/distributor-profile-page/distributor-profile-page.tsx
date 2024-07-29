import React, { useEffect, useState } from "react";
import "./distributor-profile-page.css"
import SideMenu from "../../components/side-menu/sideMenu";
import PersonalInformationMenu from "../../components/user-account-submenus/personal-information-menu/personal-information-menu";
import MyOrdersMenu from "../../components/user-account-submenus/my-orders-menu/my-orders-menu";
import MyReviewsMenu from "../../components/user-account-submenus/my-reviews-menu/my-reviews-menu";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useDistributor from "../../hooks/useDistributor";
import DistributorProductsMenu from "../../components/user-account-submenus/distributor-products-menu/distributor-products-menu";
import MyQuestionsMenu from "../../components/user-account-submenus/my-questions-menu/my-questions-menu";


const DistributorProfilePage = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>("Personal information");
    const {userId,userRole, token, logout} = useAuth();

    const {distributor, loading: userLoading,products,orders} = useDistributor(userId, token);



  
    const navigate = useNavigate();

    const loadSelectedMenu = () => {
        if(distributor){
            switch (selectedMenu) {
                case "Personal information":
                    return <PersonalInformationMenu user={distributor} loading={userLoading} userType={'Distributor'}/>;
                case "My products":
                    return <DistributorProductsMenu products={products} loading={userLoading} />;
                case "My orders":
                    return <MyOrdersMenu orders={orders} loading={userLoading} />;

                default:
                    return <PersonalInformationMenu user={distributor} loading={userLoading}  userType={'Distributor'}/>;
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
         { userLoading && <div className="loader"></div>}
            <div className="user-profile-main-container">
                <div className="top-container">
                    <h2>Your account</h2>
                    <button className="signOut-btn" onClick={handleLogOut}>Sign out</button>
                </div>
                <div className="user-info-container">
                {userLoading ? <div className="loader"></div> :
                    <SideMenu setSelectedMenu={setSelectedMenu} name={`${distributor?.name}`}
                    sectionList={['Personal information','My products','My orders']}
                    ></SideMenu>
                }
                    <div className="user-info">{loadSelectedMenu()}</div>
                </div>
            </div>
        </>
    );
}
export default DistributorProfilePage;