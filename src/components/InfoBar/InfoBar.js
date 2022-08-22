import React from 'react';
import './InfoBar.css';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

export default function InfoBar({ room }) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img src={onlineIcon} alt="online image" className="onlineIcon" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="clase image" /></a>
            </div>
        </div>
    )
}
