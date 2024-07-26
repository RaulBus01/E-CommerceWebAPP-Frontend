import React from "react";
import './personal-information-menu.css';
import Spinner from "../../spinner/spinner";

const PersonalInformationMenu = ({user, loading}) => {
    if(loading){
        return(
            <div className="personal-info-menu">
                <Spinner/>
            </div>
        );
    }
    
    return(
        <>
            <div className="personal-info-menu">
                <h2>Personal Information</h2>
                <div className="info-wrapper">
                    <div className="info-cell">
                        <h3>Full name</h3>
                        <p>{user.first_name} {user.last_name}</p>
                    </div>
                    <div className="info-cell">
                        <h3>Email</h3>
                        <p>{user.email}</p>
                    </div>
                    <div className="info-cell">
                        <h3>Member since</h3>
                        <p>{user.createdAt}</p>
                    </div>
                    <div className="info-cell">
                        <h3>Account status</h3>
                        <p>{user.isVerified ? 'Verified' : 'Not verified'}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PersonalInformationMenu