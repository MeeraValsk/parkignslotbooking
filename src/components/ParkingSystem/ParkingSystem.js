import React, { useState } from 'react';
import './ParkingSystem.css';

const ParkingSystem = () => {
  // Move all hooks to the top level of the component
  const [slots, setSlots] = useState(() => {
    return Array(100).fill(null).map((_, index) => ({
      id: index,
      row: Math.floor(index / 10),
      col: index % 10,
      status: Math.random() > 0.7 ? 'occupied' : 'available'
    }));
  });

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState('grid');
  
  // Combine all form data into a single state
  const [formData, setFormData] = useState({
    vehicleNo: '',
    mobileNo: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    vehicleType: '',
    duration: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSlotClick = (slot) => {
    if (slot.status === 'available') {
      setSelectedSlot(slot);
      setStep('form');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStep('payment');
    }
  };

  const handlePayment = () => {
    setSlots(slots.map(slot => 
      slot.id === selectedSlot.id ? { ...slot, status: 'occupied' } : slot
    ));
    // Show success message
    setIsSubmitted(true);
    // Reset after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setStep('grid');
      setSelectedSlot(null);
      setFormData({
        vehicleNo: '',
        mobileNo: '',
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        vehicleType: '',
        duration: ''
      });
    }, 3000);
  };

  const renderGrid = () => (
    <div className="card">
      <h2 className="subtitle">Select a Parking Slot</h2>
      <div className="grid-container">
        {slots.map((slot) => (
          <div
            key={slot.id}
            onClick={() => handleSlotClick(slot)}
            className={`parking-slot ${slot.status}`}
          >
            {`${slot.row}-${slot.col}`}
          </div>
        ))}
      </div>
      <div className="legend">
        <span className="legend-item">
          <span className="legend-box available"></span>
          Available
        </span>
        <span className="legend-item">
          <span className="legend-box occupied"></span>
          Occupied
        </span>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="booking-form-container animate-slide-up">
      <div className="booking-header">
        <h2 className="booking-title">Book Your Parking Spot</h2>
        <p className="booking-subtitle">Fill in the details below to reserve your space</p>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error-message">⚠️ {errors.name}</div>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-message">⚠️ {errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="error-message">⚠️ {errors.phone}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <div className="error-message">⚠️ {errors.date}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Time</label>
            <input
              type="time"
              name="time"
              className="form-input"
              value={formData.time}
              onChange={handleChange}
            />
            {errors.time && <div className="error-message">⚠️ {errors.time}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Vehicle Type</label>
            <select
              name="vehicleType"
              className="form-input"
              value={formData.vehicleType}
              onChange={handleChange}
            >
              <option value="">Select vehicle type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="suv">SUV</option>
              <option value="van">Van</option>
            </select>
            {errors.vehicleType && <div className="error-message">⚠️ {errors.vehicleType}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Duration (hours)</label>
            <select
              name="duration"
              className="form-input"
              value={formData.duration}
              onChange={handleChange}
            >
              <option value="">Select duration</option>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="4">4 hours</option>
              <option value="8">8 hours</option>
              <option value="24">24 hours</option>
            </select>
            {errors.duration && <div className="error-message">⚠️ {errors.duration}</div>}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Book Now
        </button>

        {isSubmitted && (
          <div className="success-message">
            ✅ Booking submitted successfully! We'll send you a confirmation email shortly.
          </div>
        )}
      </form>
    </div>
  );

  const renderPayment = () => (
    <div className="card form">
      <h2 className="subtitle">Payment</h2>
      <div className="payment-details">
        <p>Slot: {selectedSlot.row}-{selectedSlot.col}</p>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Phone: {formData.phone}</p>
        <p>Vehicle Type: {formData.vehicleType}</p>
        <p>Duration: {formData.duration} hours</p>
        <p className="amount">Amount: ₹100</p>
      </div>
      <div className="button-group">
        <button className="button button-outline" onClick={() => setStep('form')}>
          Back
        </button>
        <button className="button button-primary" onClick={handlePayment}>
          Complete Payment
        </button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <h1 className="title">Parking Slot Booking System</h1>
      {step === 'grid' && renderGrid()}
      {step === 'form' && renderForm()}
      {step === 'payment' && renderPayment()}
    </div>
  );
};

export default ParkingSystem;