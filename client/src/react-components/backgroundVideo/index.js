import React from 'react';
import './backgroundVideo.css';

export default function backgroundVideo() {
    return (
        <div>
            <video loop autoPlay muted id="bg-video">
                <source src={require('./backgroundVideo.mp4')} type="video/mp4"/>
            </video>
        </div>
    )
}