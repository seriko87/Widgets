import React, { useState } from 'react';
import './contact.css';
import { init } from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
  const USER_ID = process.env.REACT_APP_USER_ID;
  const handleSend = async (data) => {
    const { name, email, message } = data;

    console.log('Name: ', name, SERVICE_ID);
    console.log('Email: ', email);
    console.log('Message: ', message);
    console.log(SERVICE_ID, TEMPLATE_ID, USER_ID);

    try {
      const templateParams = {
        name,
        email,
        message,
      };
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      reset();
      setEmailSent(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="contactMain" id="contactMain">
      <h1 className="contactTitle">Contact Me</h1>
      <form action="" className="contactForm" noValidate>
        <div className="contactNameCont">
          <div className="contactName">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: { value: true, message: 'Please enter your name' },
                maxLength: {
                  value: 30,
                  message: 'Please use 30 characters or less',
                },
              })}
            />
            {errors.name && (
              <span className="errorMessage">{errors.name.message}</span>
            )}
          </div>
          <div className="contactName">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            />
            {errors.email && (
              <span className="errorMessage">
                Please enter a valid email address
              </span>
            )}
          </div>
        </div>

        <div className="contactMessage">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            {...register('message', {
              required: true,
            })}
          />
          {errors.message && (
            <span className="errorMessage">Please enter a message</span>
          )}
        </div>
        {!emailSent ? (
          <button className="contactSendBtn" onClick={handleSubmit(handleSend)}>
            Send
          </button>
        ) : (
          'Thanks for contacting!!!'
        )}
      </form>
    </div>
  );
};

export default Contact;
