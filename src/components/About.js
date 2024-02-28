import React from "react";
import img1 from "./../images/myimage.jpg";
import img2 from "./../images/iimg.jpg";

import Card from "./Card";
import "../css/About.css";

const About = () => (
  <div className="AboutContent">
    <Card
      title="Vedhas Naik"
      imageUrl="https://res.cloudinary.com/drf1yrgws/image/upload/c_crop,g_auto,h_500,w_490/about%20us/uix5jbu6qkgoxoarijqd.jpg"
      textClassName="VedhasText"
      imageClassName="VedhasImage"
      positionContent="Full Stack Web3 Developer"
      contribution="Contribution- (Team Leader) Smartcontracts, Integration"
      linkedinLink="https://www.linkedin.com/in/vedhas-naik-005378253?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BTjV5vZLCSmmmNhiC1OEZyw%3D%3D"
      instagramLink="https://www.instagram.com/vedhas_1201/"
      githubLink="https://github.com/NaikVedhas"
      twitterLink="https://x.com/NaikVedhas58616?t=8h08Xbvh3GMAlb9y-SOmuQ&s=08"
    />
    <Card
      title="Aastha Mhatre"
      imageUrl="https://res.cloudinary.com/drf1yrgws/image/upload/c_crop,g_auto,h_1150,w_1150/about%20us/jdmozb4ckfqmvw3nqi7x.jpg"
      textClassName="AasthaText"
      imageClassName="AasthaImage"
      positionContent="Front- End Developer"
      contribution="Contribution- Front end "
      linkedinLink="https://www.linkedin.com/in/aastha-mhatre-3226722b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      instagramLink="https://www.instagram.com/aastha_2675/"
      githubLink="https://github.com/Aastha2675"
      twitterLink="https://x.com/AasthaMhatre?t=YxEVqip8ExYRDolX16OCEg&s=08"
    />
    <Card
      title="Nisarga Kale"
      imageUrl={img1}
      textClassName="NisargaText"
      imageClassName="NisargaImage"
      positionContent="Front- End Developer"
      contribution="Contribution- Front end "
      linkedinLink="https://www.linkedin.com/in/nisarga-kale-a35627258/"
      instagramLink="https://www.instagram.com/nisargakale/?next=%2F"
      githubLink="https://github.com/nisargakale2107"
      twitterLink="https://x.com/nisarga18225?t=I0jCpcD4nTHblz8CPJ8cIQ&s=03"
    />
    <Card
      title="Sushrut Dabholkar"
      imageUrl={img2}
      textClassName="SushrutText"
      imageClassName="SushrutImage"
      positionContent="Full-Stack Developer"
      contribution="Contribution- Front end "
      linkedinLink="https://in.linkedin.com/in/sushrut-dabholkar-a465a5289"
      instagramLink="sushrut2304"
      githubLink="https://github.com/SushrutDabholkar04"
    />
    {/* Add more Card components for other team members */}
  </div>
);

export default About;
