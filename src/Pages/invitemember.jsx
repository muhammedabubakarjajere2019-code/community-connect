import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

function InviteMember() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    community: 'General Community',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please enter the member name and email.')
      return
    }

    const existingMembers =
      JSON.parse(localStorage.getItem('invitedMembers')) || []

    const selectedCommunity = formData.community

    let memberType = 'General'

    if (
      selectedCommunity === 'Muslim Youth Community' ||
      selectedCommunity === 'Muslim Women Development'
    ) {
      memberType = 'Muslim'
    } else if (
      selectedCommunity === 'Christian Youth Community' ||
      selectedCommunity === 'Christian Family Community'
    ) {
      memberType = 'Christian'
    }

    const newMember = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      community: selectedCommunity,
      type: memberType,
      joined: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Active',
    }

    localStorage.setItem(
      'invitedMembers',
      JSON.stringify([
        ...existingMembers,
        newMember,
      ])
    )

    alert('Member invited successfully!')

    navigate('/members')
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('rememberMe')

    navigate('/login')
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

          <Link to="/communities">
            <span>🏘️</span>
            Communities
          </Link>

          <Link
            to="/members"
            className="active"
          >
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

          <button
            type="button"
            onClick={handleLogout}
            className="dashboard-logout-btn"
          >
            <span>🚪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="dashboard-main">

        <Link
          to="/members"
          className="back-link"
        >
          ← Back to Members
        </Link>


        <header className="page-header">

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h1>
              Invite a Member
            </h1>

            <p>
              Invite someone to join one of
              your communities.
            </p>

          </div>

        </header>


        {/* INVITE FORM */}

        <section className="create-form-card">

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter member name"
                value={formData.name}
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
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Community
              </label>

              <select
                name="community"
                value={formData.community}
                onChange={handleChange}
              >

                <option value="General Community">
                  General Community
                </option>

                <option value="Muslim Youth Community">
                  Muslim Youth Community
                </option>

                <option value="Muslim Women Development">
                  Muslim Women Development
                </option>

                <option value="Christian Youth Community">
                  Christian Youth Community
                </option>

                <option value="Christian Family Community">
                  Christian Family Community
                </option>

              </select>

            </div>


            <div className="form-actions">

              <Link
                to="/members"
                className="cancel-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="create-community-btn"
              >
                Send Invitation
              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  )
}

export default InviteMember