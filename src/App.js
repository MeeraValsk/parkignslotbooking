import React from 'react';
import ParkingSystem from './components/ParkingSystem/ParkingSystem';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParkingHomePage from './components/ParkingHomePage/ParkingHomePage'; // Import the new Parking Home Page
const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Smart Parking Management</h1>
      </header>
      <main className="app-main">
       
        <Router>
      <Routes>
        {/* Define the route for the parking homepage */}
        <Route path="/" element={<ParkingHomePage />} />
        <Route path="/parking" element={<ParkingSystem />} />
        {/* You can define other routes here */}
      </Routes>
    </Router>
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Help & Support</h3>
            <ul className="footer-links">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="footer-contact">
              <p>📍 123 Parking Street, City</p>
              <p>📞 +1 234 567 890</p>
              <p>✉️ info@smartparking.com</p>
            </div>
            <div className="footer-social">
              <a href="#facebook" className="social-icon">f</a>
              <a href="#twitter" className="social-icon">t</a>
              <a href="#linkedin" className="social-icon">in</a>
              <a href="#instagram" className="social-icon">ig</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Smart Parking Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;