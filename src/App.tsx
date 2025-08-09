import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import SupportModal from "./components/SupportModal";
import OrderModal from "./components/OrderModal";
import ProfileModal from "./components/ProfileModal";
import NotificationSystem from "./components/NotificationSystem";
import VideoReviews from "./components/VideoReviews";
import FloatingElements from "./components/FloatingElements";
import Dashboard from "./components/Dashboard";
import Terms from "./components/Terms";

import { AppContextProvider, useApp } from "./context/AppContext";

function AppContent() {
  const { 
    currentUser, 
    isAuthOpen, 
    isSupportOpen, 
    isOrderOpen, 
    isProfileOpen,
    closeProfileModal,
    notifications,
    removeNotification
  } = useApp();
  const [showDashboard, setShowDashboard] = useState(false);

  const scrollToShop = () => {
    const shopElement = document.getElementById('shop');
    if (shopElement) {
      shopElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <Router>
      <Routes>
        {/* Main page */}
        <Route path="/" element={
          showDashboard && currentUser ? (
            <div className="relative bg-black text-white font-rajdhani overflow-x-hidden">
              <Header />
              <Dashboard user={currentUser} onBack={() => setShowDashboard(false)} />
              <FloatingElements />
            </div>
          ) : (
            <div className="relative bg-black text-white font-rajdhani overflow-x-hidden">
              <Header />
              <Hero onBuyClick={scrollToShop} />
              <Features />
              <Shop />
              <VideoReviews />
              <Footer />
              <FloatingElements />
            </div>
          )
        } />

        {/* Terms page */}
        <Route path="/terms" element={
          <div className="animate-fade-in bg-black min-h-screen text-white font-rajdhani">
            <Header />
            <Terms />
            <Footer />
            <FloatingElements />
          </div>
        } />
      </Routes>

      {/* Modals */}
      {isAuthOpen && <AuthModal />}
      {isSupportOpen && <SupportModal />}
      {isOrderOpen && <OrderModal />}
      {isProfileOpen && <ProfileModal isOpen={isProfileOpen} onClose={closeProfileModal} />}
      
      {/* Notification System */}
      <NotificationSystem 
        notifications={notifications}
        onRemove={removeNotification}
      />
    </Router>
  );
}

function App() {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}

export default App;