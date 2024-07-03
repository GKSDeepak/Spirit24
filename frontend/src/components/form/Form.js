import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';
import { validate } from './validate';
import universities from './universities.json'; // Import local JSON data

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    contact: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [collegeSuggestions, setCollegeSuggestions] = useState([]);
  const navigate = useNavigate();
  const suggestionBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target)) {
        setCollegeSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(`Field changed: ${name}, Value: ${value}`);

    if (name === 'college') {
      if (value.length > 0) {
        try {
          const filteredData = universities.filter((university) =>
            university.name.toLowerCase().includes(value.toLowerCase())
          );
          setCollegeSuggestions(filteredData);
        } catch (error) {
          console.error('Error filtering college suggestions:', error);
          setCollegeSuggestions([]);
        }
      } else {
        setCollegeSuggestions([]);
      }
    }
  };

  const handleCollegeSelect = (collegeName) => {
    setFormData({
      ...formData,
      college: collegeName
    });
    setCollegeSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission attempted');
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      console.log('Validation errors found', validationErrors);
      setErrors(validationErrors);
      return;
    }
    console.log('Form submitted successfully:', formData);

    try {
      const response = await axios.post('https://spirit-kvql.onrender.com/signup', {
        name: formData.name,
        email: formData.email,
        mobile: formData.contact,
        college: formData.college,
        password: formData.password,
      });
      if (response.status === 200) {
        // Redirect to OTP verification page
        navigate('/ca/otpVerify');
      } else {
        throw new Error('Failed to sign up');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Error registering user');
    }
  };

  return (
    <div className="LApp animation">
      <h1 className='spirit'>SPIRIT</h1>
      <form onSubmit={handleSubmit}>
        <div className="underline-container">
          <p className="underline-text">Register</p>
          <hr className="underline" />
        </div>

        <div className="row">
          <div className="col">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="col">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>College Name</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
            />
            {errors.college && <span className="error">{errors.college}</span>}
            {collegeSuggestions.length > 0 && (
              <div className="suggestions" ref={suggestionBoxRef}>
                {collegeSuggestions.map((college, index) => (
                  <div
                    key={index}
                    className="suggestion"
                    onClick={() => handleCollegeSelect(college.name)}
                  >
                    {college.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="col">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
        </div>
        <div className="others">
          <button type="submit" className="Done">Done</button>
          <a className='cancel' href="/ca">cancel</a>
        </div>
      </form>
    </div>
  );
}

export default Form;
