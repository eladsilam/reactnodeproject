import React from "react";
import "../css/Contact.css";
import facebookLogo from "../assets/contact_assets/facebook.png";
import linkedinLogo from "../assets/contact_assets/linkedin.png";
import gmailLogo from "../assets/contact_assets/gmail.png";

export default function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-item">
          <img src={gmailLogo} alt="Gmail" className="contact-logo" />
          <div className="contact-details">
            <p>
              Email Elad:{" "}
              <a href="mailto:eladsilam8@gmail.com">eladsilam8@gmail.com</a>
            </p>
            <p>
              Email Shai:{" "}
              <a href="mailto:shaisalem15@gmail.com">shaisalem15@gmail.com</a>
            </p>
          </div>
        </div>
        <div className="contact-item">
          <img src={facebookLogo} alt="Facebook" className="contact-logo" />
          <div className="contact-details">
            <p>
              Facebook Elad:{" "}
              <a
                href="https://www.facebook.com/eladsila"
                target="_blank"
                rel="noopener noreferrer"
              >
                Elad Silam
              </a>
            </p>
            <p>
              Facebook Shai:{" "}
              <a
                href="https://www.facebook.com/shai.salem"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shai Salem
              </a>
            </p>
          </div>
        </div>
        <div className="contact-item">
          <img src={linkedinLogo} alt="LinkedIn" className="contact-logo" />
          <div className="contact-details">
            <p>
              LinkedIn Elad:{" "}
              <a
                href="https://www.linkedin.com/in/elad-silam-a62b69277/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Elad Silam
              </a>
            </p>
            <p>
              LinkedIn Shai:{" "}
              <a
                href="https://www.linkedin.com/in/shai-salem-431bb7244/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shai Salem
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
