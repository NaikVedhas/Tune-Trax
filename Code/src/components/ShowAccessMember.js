import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import "../css/artistform.css";

const ShowMember = ({ onClose, para }) => {

    const members = para.accessList;
    const CloseMe = () => {
        onClose();
    }

    return (
        <>
            <div className="access-member-popup">
                <div className="artist-form">
                    <div className="form-close-icon">
                        <IoCloseCircle onClick={onClose} className="close-icon" />
                    </div>
                    <h2>List of users who can download songs</h2>
                    <div>
                        {members.map((item, index) => (
                            <div className="access-member" key={index}>
                               
                                <p className="member-name">{index+1})  {item}</p>
                            </div>
                        ))}
                    </div>
                    <button type="submit" onClick={CloseMe}>Okay</button>
                </div>
            </div>
        </>
    );
};

export default ShowMember;
