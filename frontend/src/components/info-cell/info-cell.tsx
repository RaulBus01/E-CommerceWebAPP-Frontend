import React from "react";
import './info-cell.css';

const InfoCell = ({title, content, displayEditButton = false, handleEdit}) => {
    return(
        <div className="info-cell">
            <h3>{title}</h3>
            <p>{content}</p>
            {displayEditButton && (
                <button className="edit-info-button" onClick={handleEdit}>Edit</button>
            )}
        </div>
    );
}
export default InfoCell;