import React, { useState } from "react";
import "./review-modal.css";
import StarIcon from "@mui/icons-material/Star";

const ReviewModal = ({onsubmit, isOpen, onClose}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        onsubmit({title, content, rating});
        setTitle("");
        setContent("");
        setRating(0);

        onClose();
    }

    if(!isOpen){
        return null;
    }

    return(
        <div className="modal-container">
            <div className="modal-header">
                <h2>Your review</h2>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="form-field">
                            <label>Title</label>
                            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Review title">
                            </input>
                        </div>
                        <div className="form-field">
                            <label>Your message(optional, max. 500 characters)</label>
                            <textarea id="content" placeholder="Your message..." value={content} onChange={(e) => setContent(e.target.value)} maxLength={500}></textarea>
                        </div>
                        <div className="form-field">
                            <label>Your rating</label>
                            <select id="rating" value={rating} required onChange={(e) => setRating(parseInt(e.target.value))}>
                                <option value={0} disabled>Select a rating</option>
                                <option value={1}>
                                    <div className="stars-container">
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                    </div>
                                </option>
                                <option value={2}>
                                    <div className="stars-container">
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                    </div>
                                </option>
                                <option value={3}>
                                    <div className="stars-container">
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                    </div>
                                </option>
                                <option value={4}>
                                    <div className="stars-container">
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                    </div>
                                </option>
                                <option value={5}>
                                    <div className="stars-container">
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                        <StarIcon style={{ color: "yellow" }}></StarIcon>
                                    </div>
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="review-modal-button-container">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ReviewModal;