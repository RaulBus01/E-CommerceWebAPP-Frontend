import React from "react";
import './info-cell.css';

const InfoCell = ({title, content, displayEditButton = false, handleEdit, type}) => {
    if(type === "big"){
        return(
            <div className="info-cell-big">
                <h2>{title}</h2>
                <p>{content}</p>
                {displayEditButton && (
                    <button className="edit-info-button-big" onClick={handleEdit}>Edit</button>
                )}
            </div>
        );
    }
    return(
        <div className="info-cell">
            <h2>{title}</h2>
            <p>{content}</p>
            {displayEditButton && (
                <button className="edit-info-button" onClick={handleEdit}>Edit</button>
            )}
        </div>
    );
}
export default InfoCell;