import React from 'react';
import '../index.css'
import { Button } from './Button';
import '../cssFiles/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      {/* <video src='/videos/video-3.mp4' autoPlay loop muted /> */}
      <h1>One Pledge Foundation</h1>
      <h2 style={{ color: "white" }}>Regenerating Life in Seas and Soils</h2>
      <div className='hero-btns'>
        <Button
          Linkto="becomeavolunteer"
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          takeWhere='BecomeVolunteer'
        >
          Become a Volunteer
          <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
