import React, { useState, useEffect } from "react";
import './personal-information-menu.css';
import Spinner from "../../spinner/spinner";
import { formatDateTime, getNumberOfDays } from "../../../utils/formatDataTime";
import InfoCell from "../../info-cell/info-cell";
import useUser from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";

const defaultAddress = {
  country: "",
  county: "",
  city: "",
  street: "",
  number: "",
  zip: ""
};

const PersonalInformationMenu = ({ usera, loading, title = "Personal Information" }) => {
  const { user } = useAuth();
  const { editUser } = useUser();
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: defaultAddress,
    phoneNumber: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.customerInfo?.address || user.distributorInfo?.address || defaultAddress,
        phoneNumber: user.phoneNumber || ""
      });
    }
  }, [user]);

  const handleEdit = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => 
      field === 'address' 
        ? { ...prev, address: { ...prev.address, ...value } }
        : { ...prev, [field]: value }
    );
  };

  const handleSave = async () => {
    if (!editingField) return;
    try {
      await editUser({ id: user?.id, [editingField]: formData[editingField] });
      setEditingField(null);
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  if (loading) return <div className="personal-info-menu"><Spinner /></div>;

  const formattedDate = formatDateTime(user?.role === 'customer' ? user?.customerInfo?.createdAt : user?.distributorInfo?.createdAt);
  const numberOfDays = getNumberOfDays(user?.role === 'customer' ? user?.customerInfo?.createdAt : user?.distributorInfo?.createdAt);

  const renderEditableField = (field, placeholder) => (
    <input
      type="text"
      placeholder={placeholder}
      value={formData[field]}
      onChange={(e) => handleInputChange(field, e.target.value)}
    />
  );

  const renderEditableAddress = () => (
    <div className="address-data-display">
      {Object.entries(formData.address).map(([key, value]) => (
        <input
          key={key}
          type="text"
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          onChange={(e) => handleInputChange('address', { [key]: e.target.value })}
        />
      ))}
    </div>
  );

  const renderAddressContent = () => (
    <div className="address-info-text">
      {Object.entries(formData.address).map(([key, value]) => (
        <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value || 'Not provided'}`}</p>
      ))}
    </div>
  );

  return (
    <div className="personal-info-menu">
      <h2>{title}</h2>
      <div className="info-wrapper">
        <div className="small-data-cells">
          <InfoCell title="Member since" content={`${formattedDate} (${numberOfDays} days)`} />
          <InfoCell 
            title={user?.role === 'customer' ? "Account status" : "Distributor status"}
            content={user?.role === 'customer' 
              ? (user?.customerInfo?.isVerified ? 'Verified' : 'Not verified')
              : (user?.distributorInfo?.isAuthorized ? 'Authorized' : 'Not Authorized')}
          />
          <InfoCell title="Email" content={user?.email} />
        </div>
        <div className="medium-data-cells">
          <InfoCell
            title={user?.role === 'customer' ? 'Name' : 'Distributor Name'}
            content={editingField === "name" ? renderEditableField("name", "Your name") : user?.name}
            displayEditButton={editingField !== "name"}
            handleEdit={() => handleEdit("name")}
          >
            {editingField === "name" && (
              <div className="edit-controls">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingField(null)}>Cancel</button>
              </div>
            )}
          </InfoCell>
          <InfoCell
            title="Phone number"
            content={editingField === "phoneNumber" ? renderEditableField("phoneNumber", "Phone number") : user?.phoneNumber}
            displayEditButton={editingField !== "phoneNumber"}
            handleEdit={() => handleEdit("phoneNumber")}
          >
            {editingField === "phoneNumber" && (
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
            content={editingField === "address" ? renderEditableAddress() : renderAddressContent()}
            displayEditButton={editingField !== "address"}
            handleEdit={() => handleEdit("address")}
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
  );
};

export default PersonalInformationMenu;
