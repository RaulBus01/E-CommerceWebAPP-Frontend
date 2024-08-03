import React, { useState } from "react";
import './personal-information-menu.css';
import Spinner from "../../spinner/spinner";
import { formatDateTime, getNumberOfDays } from "../../../utils/formatDataTime";
import InfoCell from "../../info-cell/info-cell";
import useUser from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";

const PersonalInformationMenu = ({user, loading}) => {
  
    const {token} = useAuth();
    const {editUser} = useUser();
    const [editingField, setEditingField] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [county, setCounty] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [zip, setZip] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleEdit = (fieldName, currentName, currentEmail, currentCountry, currentCounty, currentCity, currentStreet, currentNumber, currentZip, currentPhone) => {
        setEditingField(fieldName);
        setName(currentName);
        setEmail(currentEmail);
        setCountry(currentCountry);
        setCounty(currentCounty);
        setCity(currentCity);
        setStreet(currentStreet);
        setNumber(currentNumber);
        setZip(currentZip);
        setPhoneNumber(currentPhone);
    };
    console.log(user);

    const handleSave = async () => {
        if (!editingField) return;
        const updates = {
            ...(editingField === "full_name" && { name: name }),
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
            await new Promise(f => setTimeout(f, 2000));
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
    const formattedDate = formatDateTime(user.customerInfo.createdAt);
    const numberOfDays = getNumberOfDays(user.customerInfo.createdAt);
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
                            {user.role === 'customer' ?
                            <>
                                <h2>Account status</h2>
                                <div>
                                    <p className="user-info-text">{user.customerInfo.isVerified ? 'Verified' : 'Not verified'}</p>
                                </div> 
                            </>
                            : user.role === 'distributor' ?
                            <>
                                <h2>Distributor status</h2>
                                <div className="user-info-text">
                                    <p>{user.distributorInfo.isAuthorized ? 'Authorized' : 'Not Authorized'}</p>
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
                            title={user.role === 'customer' ? 'Name' : 'Distributor Name'}
                            content={
                                editingField === "full_name" ? (
                                    <div className="name-data-display">
                                        <input
                                            type="text"
                                            placeholder="Your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <div className="name-info-text">
                                        {user.role === 'customer' ? (<div className="name-info-text"><p>{user.name}</p></div>) : (user.name)}
                                    </div>
                                )
                            }
                            displayEditButton={editingField !== "full_name"}
                            handleEdit={() =>
                                handleEdit(
                                    "full_name",
                                    user.role === "customer" ? user.name : user.name,
                                    user.role === "distributor" ? user.name : "", "", "", "", "", "", "", ""
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
                                    "phone", "", "", "", "", "", "", "", "", user.phoneNumber
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
                            title="Saved address"
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
                                        <p>Country: {user.customerInfo.address?.country}</p>
                                        <p>County: {user.customerInfo.address?.county}</p>
                                        <p>City: {user.customerInfo.address?.city}</p>
                                        <p>Street: {user.customerInfo.address?.street}</p>
                                        <p>Number: {user.customerInfo.address?.number}</p>
                                        <p>Zip code: {user.customerInfo.address?.zip}</p>
                                    </div>
                                )
                            }
                            displayEditButton={editingField !== "address"}
                            handleEdit={() => 
                                handleEdit("address", "", "", user.customerInfo.address.country, user.customerInfo.address.county, user.customerInfo.address.city, user.customerInfo.address.street, user.customerInfo.address.number, user.customerInfo.address.zip, "")
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