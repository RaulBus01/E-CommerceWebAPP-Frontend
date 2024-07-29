import React from "react";
import './personal-information-menu.css';
import Spinner from "../../spinner/spinner";

const PersonalInformationMenu = ({user, loading,userType}) => {
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
                        <h3>{
                            userType === 'User' ? 'Name' : 'Distributor Name'   
                            }
                        </h3>
                        <p>
                            {userType === 'User' ? user.first_name + ' ' + user.last_name : user.name}
                        </p>
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
                        {userType === 'User' ?
                        <>
                            <h3>Account status</h3>
                            <p>{user.isVerified ? 'Verified' : 'Not verified'}</p>
                        </>
                        : userType === 'Distributor' ?
                        <>
                            <h3>Distributor status</h3>
                            <p>{user.isAuthorized ? 'Authorized' : 'Not Authorized'}</p>
                        </>
                        : null}
                    </div>
                </div>
            </div>
        </>
    );
}
export default PersonalInformationMenu