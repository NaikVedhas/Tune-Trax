import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';
import '../css/Card.css';

const Card = ({
  title,
  imageUrl,
  textClassName,
  imageClassName,
  positionContent,
  contribution,
  linkedinLink,
  instagramLink,
  githubLink,
  twitterLink
}) => (
  <article className="card">
    <div className="card-content">
      <div className={`card-image ${imageClassName}`}>
        <img src={imageUrl} alt={title} className="card-img" />
      </div>
      <div className={`card-text ${textClassName}`}>
        <h1>{title}</h1>
        <h2>{positionContent}</h2>
        <h3>{contribution}</h3>
      </div>
    </div>
    <div className="Socials">
      <a href={linkedinLink} target='_blank'><FaLinkedin style={{ fontSize: 24 }} /></a>
      <a href={instagramLink} target='_blank'><FaInstagram style={{ fontSize: 24 }} /></a>
      <a href={githubLink} target='_blank'><FaGithub style={{ fontSize: 24 }} /></a>
      <a href={twitterLink} target='_blank'><FaTwitter style={{ fontSize: 24 }} /></a>
    </div>
  </article>
);

export default Card;
