import React from "react";
import './info-cell.css';

const InfoCell = ({title, content, displayEditButton = false, handleEdit, type, children}) => {
    if(type === "big"){
        return(
            <div className="info-cell-big">
                <h2>{title}</h2>
                <div>{content}</div>
                {displayEditButton && (
                    <button className="edit-info-button-big" onClick={handleEdit}>Edit</button>
                )}
                {children}
            </div>
        );
    }
    return(
        <div className="info-cell">
            <h2>{title}</h2>
            <div className="info-cell-content">
                <div>{content}</div>
            </div>
            {displayEditButton && (
                <button className="edit-info-button" onClick={handleEdit}>Edit</button>
            )}
            {children}
        </div>
    );
}
export default InfoCell;