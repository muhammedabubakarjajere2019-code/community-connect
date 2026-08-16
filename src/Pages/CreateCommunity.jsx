import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logout from '../components/Logout'
import '../App.css'

function CreateCommunity() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    type: 'General',
    description: '',
    location: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newCommunity = {
      id: Date.now(),
      type: formData.type,
      icon:
        formData.type === 'Muslim'
          ? '🕌'
          : formData.type === 'Christian'
            ? '⛪'
            : '🤝',
      name: formData.name.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
      members: 1,
    }

    const existingCommunities =
      JSON.parse(localStorage.getItem('communities')) || []

    const updatedCommunities = [
      ...existingCommunities,
      newCommunity,
    ]

    localStorage.setItem(
      'communities',
      JSON.stringify(updatedCommunities)
    )

    navigate('/communities')
  }

  return (
    <div className="dashboard">

      {/* SIDEBAR */}

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

          <Link
            to="/communities"
            className="active"
          >
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

          <Link to="/profile">
            <span>👤</span>
            Profile
          </Link>

          {/* REAL LOGOUT */}

          <Logout />

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="dashboard-main">

        <div className="form-back">

          <Link to="/communities">
            ← Back to Communities
          </Link>

        </div>


        <header className="page-header">

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h1>
              Create a Community
            </h1>

            <p>
              Create a welcoming space where people can connect,
              participate and grow together.
            </p>

          </div>

        </header>


        <div className="community-form-layout">

          {/* FORM */}

          <section className="community-form-card">

            <h2>
              Community Information
            </h2>

            <p className="form-description">
              Tell people about the community you want to create.
            </p>


            <form onSubmit={handleSubmit}>

              {/* COMMUNITY NAME */}

              <div className="form-group">

                <label htmlFor="name">
                  Community Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="e.g. Youth Development Community"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* COMMUNITY TYPE */}

              <div className="form-group">

                <label htmlFor="type">
                  Community Type
                </label>

                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >

                  <option value="General">
                    🤝 General Community
                  </option>

                  <option value="Muslim">
                    🕌 Muslim Community
                  </option>

                  <option value="Christian">
                    ⛪ Christian Community
                  </option>

                </select>

              </div>


              {/* DESCRIPTION */}

              <div className="form-group">

                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the purpose of your community..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  required
                />

              </div>


              {/* LOCATION */}

              <div className="form-group">

                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="e.g. Potiskum, Yobe State"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* BUTTONS */}

              <div className="form-actions">

                <Link
                  to="/communities"
                  className="cancel-form-btn"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="submit-community-btn"
                >
                  Create Community →
                </button>

              </div>

            </form>

          </section>


          {/* PREVIEW */}

          <aside className="community-preview">

            <p className="preview-label">
              PREVIEW
            </p>


            <div className="preview-icon">

              {formData.type === 'Muslim'
                ? '🕌'
                : formData.type === 'Christian'
                  ? '⛪'
                  : '🤝'}

            </div>


            <h2>
              {formData.name || 'Your Community Name'}
            </h2>


            <span className="preview-type">
              {formData.type} Community
            </span>


            <p>
              {formData.description ||
                'Your community description will appear here.'}
            </p>


            <div className="preview-location">
              📍 {formData.location || 'Community location'}
            </div>


            <div className="preview-message">

              <strong>
                Connect. Participate. Grow Together.
              </strong>

              <span>
                A welcoming space for everyone.
              </span>

            </div>

          </aside>

        </div>

      </main>

    </div>
  )
}

export default CreateCommunity