
import React, { useState } from 'react';
import { CarFront, LogOut } from 'lucide-react'; // Example of using icons
import ParkingSystem from '../ParkingSystem/ParkingSystem'; // Make sure to import the ParkingSystem component
import './ParkingHomePage.css'; // Make sure to add your styles

const ParkingHomepage = () => {
  const [view, setView] = useState('home');
  const [exitData, setExitData] = useState({ vehicleNo: '', mobileNo: '' });

  const renderHome = () => (
    <div className="grid-container">
      <div className="card">
        <div className="card-content">
          <div className="icon-wrapper">
            <CarFront size={48} className="icon-blue" />
          </div>
          <h2 className="card-title">Book a Parking Slot</h2>
          <p className="card-description">Find and book an available parking slot for your vehicle</p>
          <button className="button button-primary" onClick={() => setView('booking')}>
            Book Now
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="icon-wrapper">
            <LogOut size={48} className="icon-green" />
          </div>
          <h2 className="card-title">Exit Parking</h2>
          <p className="card-description">Process exit for your currently parked vehicle</p>
          <button className="button button-outline" onClick={() => setView('exit')}>
            Exit Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderExitForm = () => (
    <div className="card form-container">
      <h2 className="card-title">Exit Parking</h2>
      <form>
        <div className="form-group">
          <label className="form-label">Vehicle Number</label>
          <input
            className="form-input"
            value={exitData.vehicleNo}
            onChange={(e) => setExitData({ ...exitData, vehicleNo: e.target.value })}
            placeholder="Enter vehicle number"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mobile Number</label>
          <input
            className="form-input"
            value={exitData.mobileNo}
            onChange={(e) => setExitData({ ...exitData, mobileNo: e.target.value })}
            placeholder="Enter mobile number"
            required
            type="tel"
          />
        </div>
        <div className="button-container">
          <button
            className="button button-primary"
            onClick={() => {
              alert('Exit processed successfully!');
              setView('home');
            }}
          >
            Process Exit
          </button>
          <button
            className="button button-outline"
            onClick={() => setView('home')}
          >
            Back to Home
          </button>
        </div>
      </form>
    </div>
  );

  const renderBookingProcess = () => (
    <div className="card booking-container">
      <h2 className="card-title">Book a Parking Slot</h2>
      {/* Add the ParkingSystem component here */}
      <ParkingSystem />
      <div className="text-center">
        <button
          className="button button-outline"
          onClick={() => setView('home')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="page-title">
          Smart Parking System
        </h1>

        {view === 'home' && renderHome()}
        {view === 'exit' && renderExitForm()}
        {view === 'booking' && renderBookingProcess()}
      </div>
    </div>
  );
};

export default ParkingHomepage;
