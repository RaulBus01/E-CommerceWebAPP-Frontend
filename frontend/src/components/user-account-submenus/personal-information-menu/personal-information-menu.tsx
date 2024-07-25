import React from "react";
import './personal-information-menu.css';

const PersonalInformationMenu = () => {
    return(
        <>
            <div className="personal-info-menu">
                <h2>Personal Information</h2>
                <div className="info-wrapper">
                    <div className="info-cell">
                        <h3>Full name</h3>
                        <p>Vlad Cirlugea</p>
                    </div>
                    <div className="info-cell">
                        <h3>Email</h3>
                        <p>vladcirlugea@yahoo.com</p>
                    </div>
                    <div className="info-cell">
                        <h3>Full name</h3>
                        <p>Vlad Cirlugea</p>
                    </div>
                    <div className="info-cell">
                        <h3>Full name</h3>
                        <p>Vlad Cirlugea</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PersonalInformationMenu