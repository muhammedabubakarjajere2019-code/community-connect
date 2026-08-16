import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Communities from './pages/Communities'
import Members from './pages/Members'
import MemberDetails from './pages/MemberDetails'
import InviteMember from './pages/InviteMember'
import Events from './pages/Events'
import CreateEvent from './pages/CreateEvent'
import EventDetails from './pages/EventDetails'
import Announcements from './pages/Announcements'
import CreateAnnouncement from './pages/CreateAnnouncement'
import AnnouncementDetails from './pages/AnnouncementDetails'
import CreateCommunity from './pages/CreateCommunity'
import CommunityDetails from './pages/CommunityDetails'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGES */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* PROTECTED PAGES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/communities"
          element={
            <ProtectedRoute>
              <Communities />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-community"
          element={
            <ProtectedRoute>
              <CreateCommunity />
            </ProtectedRoute>
          }
        />

        <Route
          path="/community/:id"
          element={
            <ProtectedRoute>
              <CommunityDetails />
            </ProtectedRoute>
          }
        />


        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/:id"
          element={
            <ProtectedRoute>
              <MemberDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invite-member"
          element={
            <ProtectedRoute>
              <InviteMember />
            </ProtectedRoute>
          }
        />


        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/event/:id"
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          }
        />


        <Route
          path="/announcements"
          element={
            <ProtectedRoute>
              <Announcements />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-announcement"
          element={
            <ProtectedRoute>
              <CreateAnnouncement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/announcement/:id"
          element={
            <ProtectedRoute>
              <AnnouncementDetails />
            </ProtectedRoute>
          }
        />


        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App