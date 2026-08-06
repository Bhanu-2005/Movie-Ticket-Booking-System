import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Customer Pages
import Home from '../pages/customer/Home';
import MovieDetails from '../pages/customer/MovieDetails';
import Booking from '../pages/customer/Booking';
import Payment from '../pages/customer/Payment';
import MyBookings from '../pages/customer/MyBookings';
import Profile from '../pages/customer/Profile';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import AddMovie from '../pages/admin/AddMovie';
import ManageMovies from '../pages/admin/ManageMovies';
import EditMovie from '../pages/admin/EditMovie';
import ManageTheaters from '../pages/admin/ManageTheaters';
import ManageShows from '../pages/admin/ManageShows';
import ManageBookings from '../pages/admin/ManageBookings';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Public / Customer Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          
          {/* Protected Customer Routes */}
          <Route path="/book/:showId" element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } />
          <Route path="/payment/:bookingId" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route element={
          <ProtectedRoute adminOnly={true}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/movies" element={<ManageMovies />} />
          <Route path="/dashboard/movies/add" element={<AddMovie />} />
          <Route path="/dashboard/movies/edit/:id" element={<EditMovie />} />
          <Route path="/dashboard/theaters" element={<ManageTheaters />} />
          <Route path="/dashboard/shows" element={<ManageShows />} />
          <Route path="/dashboard/bookings" element={<ManageBookings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;