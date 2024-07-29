import React, { useEffect, useState } from "react";
import "./user-profile-page.css"
import SideMenu from "../../components/side-menu/sideMenu";
import PersonalInformationMenu from "../../components/user-account-submenus/personal-information-menu/personal-information-menu";
import MyOrdersMenu from "../../components/user-account-submenus/my-orders-menu/my-orders-menu";
import MyReviewsMenu from "../../components/user-account-submenus/my-reviews-menu/my-reviews-menu";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useUser from "../../hooks/useUser";
import useOrder from "../../hooks/useOrder";
import useReview from "../../hooks/useReview";
import useQuestion from "../../hooks/useQuestion";
import { useParams } from "react-router-dom";
import MyQuestionsMenu from "../../components/user-account-submenus/my-questions-menu/my-questions-menu";

const UserProfilePage = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>("Personal information");
    const {userId, token, logout} = useAuth();
    const { userId: userIdPath } = useParams<{ userId: string }>();

   

    const {user, loading: userLoading} = useUser(userId, token);
    const {orders, loading: ordersLoading} = useOrder(userId, token);
    const {reviews, loading: reviewsLoading} = useReview(userId, token);
    const {questions, loading: questionLoading} = useQuestion(userId, token);
    const navigate = useNavigate();
    if(userIdPath && userIdPath !== userId){
        navigate('/404/');
    }
    const loadSelectedMenu = () => {
        if(user){
            switch (selectedMenu) {
                case "Personal information":
                    return <PersonalInformationMenu user={user} loading={userLoading} userType={'User'}/>;
                case "My orders":
                    return <MyOrdersMenu orders={orders} loading={ordersLoading} />;
                case "My reviews":
                    return <MyReviewsMenu reviews={reviews} loading={reviewsLoading} />;
                case "My questions":
                    return <MyQuestionsMenu questions={questions} loading={questionLoading} />;
                default:
                    return <PersonalInformationMenu user={user} loading={userLoading}  userType={'User'}/>;
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
                    <SideMenu setSelectedMenu={setSelectedMenu} name={`${user?.first_name} ${user?.last_name}`} 
                    sectionList={['Personal information','My orders','My reviews','My questions']}>
                        </SideMenu>
                    }   
                    <div className="user-info">{loadSelectedMenu()}</div>
                </div>
            </div>
        </>
    );
}
export default UserProfilePage