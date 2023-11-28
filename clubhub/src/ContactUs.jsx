import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your email.js service ID, template ID, and user ID
    const serviceID = 'service_o2ycykq';
    const templateID = 'template_ibw1gna';
    const userID = 'ew4AhcZelhLuXSrbM';

    // Form data
    const formData = {
      name: formValues.name,
      email: formValues.email,
      message: formValues.message,
    };

    // Send email using email.js
    emailjs
      .send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log('Email sent successfully:', response);

        // Clear form values
        setFormValues({
          name: '',
          email: '',
          message: '',
        });

        // Show success message
        toast.success('Thanks for contacting us!', { autoClose: 3000 });
      })
      .catch((error) => {
        console.error('Error sending email:', error);

        // Show error message
        toast.error('Error sending email. Please try again.', { autoClose: 3000 });
      });
  };

  return (
    <div className="container mt-4">
      <h2>Contact Us</h2>
      <p>If you have any questions or inquiries, feel free to reach out to us. We are here to help!</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            rows="4"
            name="message"
            value={formValues.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* React Toastify Container */}
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
