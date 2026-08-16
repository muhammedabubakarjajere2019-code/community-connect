import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logout from '../components/Logout'
import '../App.css'

function CreateAnnouncement() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [author, setAuthor] = useState('')
  const [type, setType] = useState('General')
  const [icon, setIcon] = useState('📢')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !title.trim() ||
      !message.trim() ||
      !author.trim()
    ) {
      alert('Please fill in all required fields.')
      return
    }

    const savedAnnouncements =
      JSON.parse(
        localStorage.getItem('announcements')
      ) || []

    const newAnnouncement = {
      id: Date.now(),
      title: title.trim(),
      message: message.trim(),
      author: author.trim(),
      date: new Date().toLocaleDateString(
        'en-GB',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
      time: 'Just now',
      type,
      icon,
    }

    const updatedAnnouncements = [
      newAnnouncement,
      ...savedAnnouncements,
    ]

    localStorage.setItem(
      'announcements',
      JSON.stringify(updatedAnnouncements)
    )

    alert('Announcement published successfully!')

    navigate('/announcements')
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

          <Link to="/members">
            <span>👥</span>
            Members
          </Link>

          <Link to="/events">
            <span>📅</span>
            Events
          </Link>

          <Link
            to="/announcements"
            className="active"
          >
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

        <Link
          to="/announcements"
          className="back-link"
        >
          ← Back to Announcements
        </Link>

        <header className="page-header">

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h1>
              Create Announcement
            </h1>

            <p>
              Share important information with
              your community members.
            </p>

          </div>

        </header>

        {/* FORM */}

        <section className="create-form-card">

          <form onSubmit={handleSubmit}>

            {/* TITLE */}

            <div className="form-group">

              <label htmlFor="title">
                Announcement Title
              </label>

              <input
                id="title"
                type="text"
                placeholder="Enter announcement title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />

            </div>

            {/* MESSAGE */}

            <div className="form-group">

              <label htmlFor="message">
                Announcement Message
              </label>

              <textarea
                id="message"
                rows="6"
                placeholder="Write your announcement..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                required
              />

            </div>

            {/* AUTHOR */}

            <div className="form-group">

              <label htmlFor="author">
                Your Name
              </label>

              <input
                id="author"
                type="text"
                placeholder="Enter your name"
                value={author}
                onChange={(e) =>
                  setAuthor(e.target.value)
                }
                required
              />

            </div>

            {/* TYPE */}

            <div className="form-group">

              <label htmlFor="type">
                Community Type
              </label>

              <select
                id="type"
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
              >

                <option value="General">
                  🤝 General
                </option>

                <option value="Muslim">
                  🕌 Muslim
                </option>

                <option value="Christian">
                  ⛪ Christian
                </option>

              </select>

            </div>

            {/* ICON */}

            <div className="form-group">

              <label htmlFor="icon">
                Announcement Icon
              </label>

              <select
                id="icon"
                value={icon}
                onChange={(e) =>
                  setIcon(e.target.value)
                }
              >

                <option value="📢">
                  📢 Announcement
                </option>

                <option value="🎓">
                  🎓 Education
                </option>

                <option value="📅">
                  📅 Event
                </option>

                <option value="🌱">
                  🌱 Community
                </option>

                <option value="🕌">
                  🕌 Muslim
                </option>

                <option value="⛪">
                  ⛪ Christian
                </option>

              </select>

            </div>

            {/* BUTTONS */}

            <div className="form-actions">

              <Link
                to="/announcements"
                className="cancel-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="create-community-btn"
              >
                📢 Publish Announcement
              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  )
}

export default CreateAnnouncement