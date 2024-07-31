import React, { useState } from "react";
import './personal-information-menu.css';
import Spinner from "../../spinner/spinner";
import { formatDateTime, getNumberOfDays } from "../../../utils/formatDataTime";
import InfoCell from "../../info-cell/info-cell";
import useUser from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";

const PersonalInformationMenu = ({user, loading, userType}) => {
    const {userId, token} = useAuth();
    const {editUser} = useUser(userId, token);
    const [editingField, setEditingField] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [county, setCounty] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [zip, setZip] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    console.log(user);

    const handleEdit = (fieldName, currentFirstName, currentLastName, currentEmail, currentCountry, currentCounty, currentCity, currentStreet, currentNumber, currentZip, currentPhone) => {
        setEditingField(fieldName);
        setFirstName(currentFirstName);
        setLastName(currentLastName);
        setEmail(currentEmail);
        setCountry(currentCountry);
        setCounty(currentCounty);
        setCity(currentCity);
        setStreet(currentStreet);
        setNumber(currentNumber);
        setZip(currentZip);
        setPhoneNumber(currentPhone);
    };

    const handleSave = async () => {
        if (!editingField) return;
        const updates = {
            ...(editingField === "full_name" && { first_name: firstName, last_name: lastName }),
            ...(editingField === "email" && { email }),
            ...(editingField === "address" && { 
                address: {
                    country: country,
                    county: county,
                    city: city,
                    street: street,
                    number: number,
                    zip: zip
                } 
            }),
            ...(editingField === "phone" && { phoneNumber: phoneNumber }),
        };
        try{
            await editUser(updates);
        } catch(error){
            console.log("error at updating user", error);
        }finally{
            setEditingField(null);
            window.location.reload();
        }   
    };

    if(loading){
        return(
            <div className="personal-info-menu">
                <Spinner/>
            </div>
        );
    }
    const formattedDate = formatDateTime(user.createdAt);
    const numberOfDays = getNumberOfDays(user.createdAt);
    return(
        <>
            <div className="personal-info-menu">
                <h2>Personal Information</h2>
                <div className="info-wrapper">
                    <div className="small-data-cells">
                        <div className="info-cell-small">
                            <h2>Member since</h2>
                            <div>
                                <p className="user-info-text">{formattedDate} ({numberOfDays} days)</p>
                            </div>     
                        </div>
                        <div className="info-cell-small">
                            {userType === 'User' ?
                            <>
                                <h2>Account status</h2>
                                <div>
                                    <p className="user-info-text">{user.isVerified ? 'Verified' : 'Not verified'}</p>
                                </div> 
                            </>
                            : userType === 'Distributor' ?
                            <>
                                <h2>Distributor status</h2>
                                <div className="user-info-text">
                                    <p>{user.isAuthorized ? 'Authorized' : 'Not Authorized'}</p>
                                </div>
                            </>
                            : null}
                        </div>
                        <div className="info-cell-small">
                            <h2>Email</h2>
                            <div className="user-info-text">
                                <p>{user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="medium-data-cells">
                        <InfoCell
                            title={userType === 'User' ? 'Full Name' : 'Distributor Name'}
                            content={
                                editingField === "full_name" ? (
                                    <div className="name-data-display">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <div className="name-info-text">
                                        {userType === 'User' ? (<div className="name-info-text"><p>First name: {user.first_name}</p> <p>Last name: {user.last_name}</p></div>) : (user.name)}
                                    </div>
                                )
                            }
                            displayEditButton={editingField !== "full_name"}
                            handleEdit={() =>
                                handleEdit(
                                    "full_name",
                                    userType === "User" ? user.first_name : user.name,
                                    userType === "User" ? user.last_name : "", "", "", "", "", "", "", "", ""
                                )
                            }
                            type=""
                        >
                            {editingField === "full_name" && (
                                <div className="edit-controls">
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={() => setEditingField(null)}>Cancel</button>
                                </div>
                            )}
                        </InfoCell>
                        <InfoCell 
                            title="Phone number"
                            content={
                                editingField === "phone" ? (
                                    <div>
                                        <input
                                            type="tel"
                                            placeholder="Phone number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)} 
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <p className="user-info-text">{user.phoneNumber}</p>
                                    </div>
                                )
                            }
                            displayEditButton={editingField !== "phone"}
                            handleEdit={() =>
                                handleEdit(
                                    "phone", "", "", "", "", "", "", "", "", "", user.phoneNumber
                                )
                            }
                            type=""
                        >
                            {editingField === "phone" && (
                                <div className="edit-controls">
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={() => setEditingField(null)}>Cancel</button>
                                </div>
                            )}
                        </InfoCell>                   
                    </div>
                    <div className="big-data-cells">
                        <InfoCell
                            title="Your saved address"
                            content={
                                editingField === "address" ? (
                                    <div className="address-data-display">
                                        <input
                                            type="text"
                                            placeholder="Country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)} 
                                        />
                                        <input
                                            type="text"
                                            placeholder="County"
                                            value={county}
                                            onChange={(e) => setCounty(e.target.value)} 
                                        />
                                        <input
                                            type="text"
                                            placeholder="City"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)} 
                                        />
                                        <input
                                            type="text"
                                            placeholder="Street"
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)} 
                                        />
                                        <input
                                            type="text"
                                            placeholder="Number"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)} 
                                        />
                                        <input
                                            type="text"
                                            placeholder="Zip code"
                                            value={zip}
                                            onChange={(e) => setZip(e.target.value)} 
                                        />
                                    </div>
                                ) : (
                                    <div className="address-info-text">
                                        <p>Country: {user.address.country}</p>
                                        <p>County: {user.address.county}</p>
                                        <p>City: {user.address.city}</p>
                                        <p>Street: {user.address.street}</p>
                                        <p>Number: {user.address.number}</p>
                                        <p>Zip code: {user.address.zip}</p>
                                    </div>
                                )
                            }
                            displayEditButton={editingField !== "address"}
                            handleEdit={() => 
                                handleEdit("address", "", "", "", user.address.country, user.address.county, user.address.city, user.address.street, user.address.number, user.address.zip, "")
                            }
                            type="big"
                        >
                            {editingField === "address" && (
                                <div className="edit-controls">
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={() => setEditingField(null)}>Cancel</button>
                                </div>
                            )}
                        </InfoCell>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PersonalInformationMenu