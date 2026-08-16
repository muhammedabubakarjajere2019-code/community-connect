import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../components/Logout'
import '../App.css'

function Profile() {
  const [profile, setProfile] = useState({
    name: 'Community Member',
    email: 'member@example.com',
    phone: '',
    bio: 'I am a member of the Community Connect platform.',
    photo: '',
  })

  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const savedProfile =
      JSON.parse(localStorage.getItem('profile')) || null

    const savedUser =
      JSON.parse(localStorage.getItem('communityUser')) || null

    // If a profile already exists, use it
    if (savedProfile) {
      setProfile(savedProfile)
      return
    }

    // Otherwise use information from the registered account
    if (savedUser) {
      const newProfile = {
        name: savedUser.name || 'Community Member',
        email: savedUser.email || 'member@example.com',
        phone: savedUser.phone || '',
        bio: 'I am a member of the Community Connect platform.',
        photo: '',
      }

      setProfile(newProfile)

      localStorage.setItem(
        'profile',
        JSON.stringify(newProfile)
      )
    }
  }, [])

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      setProfile({
        ...profile,
        photo: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }

  const handleSave = (e) => {
    e.preventDefault()

    localStorage.setItem(
      'profile',
      JSON.stringify(profile)
    )

    // Also update the registered user's information
    const savedUser =
      JSON.parse(localStorage.getItem('communityUser')) || null

    if (savedUser) {
      const updatedUser = {
        ...savedUser,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      }

      localStorage.setItem(
        'communityUser',
        JSON.stringify(updatedUser)
      )

      // Keep current logged-in user updated
      localStorage.setItem(
        'currentUser',
        JSON.stringify(updatedUser)
      )
    }

    setEditing(false)

    alert('Profile updated successfully!')
  }

  return (
    <div className="dashboard">

      {/* Sidebar */}

      <aside className="dashboard-sidebar">

        <Link
          to="/"
          className="dashboard-logo"
        >
          <div className="brand-icon">
            C
          </div>

          <span>
            Community Connect
          </span>
        </Link>

        <nav className="dashboard-nav">

          <Link to="/dashboard">
            <span>🏠</span>
            Dashboard
          </Link>

          <Link to="/communities">
            <span>🏘️</span>
            Communities
          </Link>

          <Link to="/members">
            <span>👥</span>
            Members
          </Link>

          <Link to="/events">
            <span>📅</span>
            Events
          </Link>

          <Link to="/announcements">
            <span>📢</span>
            Announcements
          </Link>

        </nav>

        <div className="dashboard-bottom">

          <Link
            to="/profile"
            className="active"
          >
            <span>👤</span>
            Profile
          </Link>

          {/* REAL LOGOUT */}
          <Logout />

        </div>

      </aside>

      {/* Main content */}

      <main className="dashboard-main">

        <header className="page-header">

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your personal information
              and Community Connect profile.
            </p>

          </div>

        </header>

        {/* Profile header */}

        <section className="profile-header-card">

          <div className="profile-avatar">

            {profile.photo ? (

              <img
                src={profile.photo}
                alt="Profile"
                className="profile-avatar-image"
              />

            ) : (

              profile.name
                ? profile.name.charAt(0).toUpperCase()
                : 'C'

            )}

          </div>

          <div className="profile-header-info">

            <h2>
              {profile.name}
            </h2>

            <p>
              {profile.email}
            </p>

            <span>
              Community Member
            </span>

          </div>

          <button
            className="create-community-btn"
            onClick={() => setEditing(!editing)}
          >
            {editing
              ? 'Cancel Editing'
              : '✏️ Edit Profile'}
          </button>

        </section>

        {/* Profile information */}

        <section className="profile-card">

          <div className="profile-card-header">

            <div>

              <h2>
                Personal Information
              </h2>

              <p>
                Your basic profile information.
              </p>

            </div>

          </div>

          {editing ? (

            <form
              className="profile-form"
              onSubmit={handleSave}
            >

              <div className="form-group">

                <label>
                  Profile Picture
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={profile.phone}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Bio
                </label>

                <textarea
                  name="bio"
                  rows="5"
                  placeholder="Tell the community about yourself..."
                  value={profile.bio}
                  onChange={handleChange}
                />

              </div>

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="create-community-btn"
                >
                  💾 Save Changes
                </button>

              </div>

            </form>

          ) : (

            <div className="profile-information">

              <div className="profile-info-item">

                <span>
                  👤
                </span>

                <div>

                  <small>
                    Full Name
                  </small>

                  <strong>
                    {profile.name}
                  </strong>

                </div>

              </div>

              <div className="profile-info-item">

                <span>
                  📧
                </span>

                <div>

                  <small>
                    Email Address
                  </small>

                  <strong>
                    {profile.email}
                  </strong>

                </div>

              </div>

              <div className="profile-info-item">

                <span>
                  📱
                </span>

                <div>

                  <small>
                    Phone Number
                  </small>

                  <strong>
                    {profile.phone || 'Not provided'}
                  </strong>

                </div>

              </div>

              <div className="profile-info-item profile-bio">

                <span>
                  📝
                </span>

                <div>

                  <small>
                    About Me
                  </small>

                  <p>
                    {profile.bio}
                  </p>

                </div>

              </div>

            </div>

          )}

        </section>

        {/* Profile statistics */}

        <section className="profile-stats">

          <div className="profile-stat-card">

            <span>
              🏘️
            </span>

            <div>

              <strong>
                Communities
              </strong>

              <p>
                Connected communities
              </p>

            </div>

          </div>

          <div className="profile-stat-card">

            <span>
              📅
            </span>

            <div>

              <strong>
                Events
              </strong>

              <p>
                Community activities
              </p>

            </div>

          </div>

          <div className="profile-stat-card">

            <span>
              🤝
            </span>

            <div>

              <strong>
                Members
              </strong>

              <p>
                People connected
              </p>

            </div>

          </div>

        </section>

        {/* Bottom message */}

        <section className="community-welcome">

          <span>
            🤝
          </span>

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h2>
              Your community starts with you.
            </h2>

            <p>
              Complete your profile so other
              community members can better
              connect and communicate with you.
            </p>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Profile