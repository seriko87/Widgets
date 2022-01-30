import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <div className="contactMain">
      <h1 className="contactTitle">Contact Me</h1>
      <form action="" className="contactForm">
        <div className="contactNameCont">
          <div className="contactName">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <div className="contactName">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
        </div>

        <div className="contactMessage">
          <label htmlFor="message">Message</label>
          <textarea id="message" />
        </div>
        <button className="contactSendBtn">Send</button>
      </form>
    </div>
  );
};

export default Contact;
