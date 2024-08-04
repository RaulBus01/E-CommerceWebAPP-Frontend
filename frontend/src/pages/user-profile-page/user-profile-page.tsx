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
import useUser from "../../hooks/useUser";
import useOrder from "../../hooks/useOrder";
import useReview from "../../hooks/useReview";
import useQuestion from "../../hooks/useQuestion";
import { useParams } from "react-router-dom";
import { orderData } from "../../types/OrderType";
import { reviewData } from "../../types/ReviewType";
import { questionData } from "../../types/Question";

const UserProfilePage: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>("Personal information");
    const { token,user, logout } = useAuth();
    const { id: userIdPath } = useParams<{ id: string }>();

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
    const isCustomer = user?.role === "customer";
    const { orders, loading: ordersLoading } =  isCustomer ? useOrder(token as string) : { orders:[], loading: false };
    const { reviews, loading: reviewsLoading } = isCustomer ? useReview(token as string) : { reviews:[], loading: false };
    const { questions, loading: questionLoading } = isCustomer ? useQuestion(userIdPath as string, token as string) : { questions:[], loading: false };
    

    const loadSelectedMenu = () => {
        switch (selectedMenu) {
            case "Personal information":
                return <PersonalInformationMenu user={user}/>;
            case "My orders":
                return <MyOrdersMenu orders={orders} loading={ordersLoading} />;
            case "My reviews":
                return <MyReviewsMenu reviews={reviews} loading={reviewsLoading} />;
            case "My questions":
                return <MyQuestionsMenu questions={questions} loading={questionLoading} />;
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
                    sectionList={['Personal information','My orders','My reviews','My questions']}
                />
                <div className="user-info">{loadSelectedMenu()}</div>
            </div>
        </div>
    );
}

export default UserProfilePage;