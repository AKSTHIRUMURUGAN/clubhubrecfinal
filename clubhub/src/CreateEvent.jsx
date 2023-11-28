// CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';
import { addEvent } from "./redux/eventSlice";
import { useDispatch } from "react-redux";
import Events from "./events";
import { Link } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import './CreateEvent.css'; // Import your custom styles

const CreateEvent = () => {
  const [image, setImage] = useState(null); // Set initial value to null
  const [imagePreview, setImagePreview] = useState("../public/images/default_avatar.png"); // Set initial value to null
  const [userData, setUserData] = useState({
    eventName: '',
    clubName: '',
    venue: '',
    capacity: '',
    date: '',
    time: '',
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('eventName', userData.eventName);
      formData.append('clubName', userData.clubName);
      formData.append('venue', userData.venue);
      formData.append('capacity', userData.capacity);
      formData.append('date', userData.date);
      formData.append('time', userData.time);
      formData.append('image', image);

      await axios.post('http://localhost:3002/create', formData)
        .then(res => {
          dispatch(addEvent(res.data));
          console.log(res);
        })
        .catch(err => console.log(err));

      // Handle success, redirect, or show a success message
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }

    // Clear form data
    setUserData({
      eventName: '',
      clubName: '',
      venue: '',
      capacity: '',
      date: '',
      time: '',
    });

    // Clear image preview
    setImage(null);
    setImagePreview("../public/images/default_avatar.png");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="shadow-lg glassmorphism-form" encType='multipart/form-data'>
      <div className='form-group'>
        <input
          type="text"
          name="eventName"
          value={userData.eventName}
          onChange={handleInputChange}
          placeholder="Event Name"
          required
        />
        <input
          type="text"
          name="clubName"
          value={userData.clubName}
          onChange={handleInputChange}
          placeholder="Club Name"
          required
        />
        <input
          type="text"
          name="venue"
          value={userData.venue}
          onChange={handleInputChange}
          placeholder="Venue"
          required
        />
        <input
          type="number"
          name="capacity"
          value={userData.capacity}
          onChange={handleInputChange}
          placeholder="Capacity"
          required
        />
        <input
          type="date"
          name="date"
          value={userData.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="time"
          value={userData.time}
          onChange={handleInputChange}
          required
        />
       
          <label htmlFor='image_upload'>Image</label>

            <div className='image-preview'>
              <img src={imagePreview} alt='Image' />
            </div>
            <div className='custom-file'>
              <input
                type='file'
                name='image'
                onChange={handleInputChange}
                className='custom-file-input'
                id='customFile'
                style={{ display: 'none' }}
              />
              <label className='custom-file-label' htmlFor='customFile'>
                Choose Image
              </label>
            </div>
          </div>

        <button type="submit" className="btn btn-primary glass-button">
          Submit
          <div className="click-effect"></div>
        </button>
        <Link to="/" className="link-button">
          Go to Events
        </Link>
      </form>
      {/* <Events /> */}
    </div>
  );
};

export default CreateEvent;
