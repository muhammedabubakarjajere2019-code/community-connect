import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

function CreateEvent() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('General')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location
    ) {
      alert('Please fill in all fields.')
      return
    }

    const existingEvents =
      JSON.parse(localStorage.getItem('events')) || []

    const newEvent = {
      id: Date.now(),
      title,
      description,
      date,
      time,
      location,
      type,
      status: 'Upcoming',
    }

    localStorage.setItem(
      'events',
      JSON.stringify([
        ...existingEvents,
        newEvent,
      ])
    )

    alert('Event created successfully!')

    navigate('/events')
  }

  return (
    <div className="dashboard">

      {/* Sidebar */}

      <aside className="dashboard-sidebar">

        <Link to="/" className="dashboard-logo">
          <div className="brand-icon">C</div>

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

          <Link to="/events" className="active">
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

          <Link to="/">
            <span>🚪</span>
            Logout
          </Link>

        </div>

      </aside>


      {/* Main Content */}

      <main className="dashboard-main">

        <Link
          to="/events"
          className="back-link"
        >
          ← Back to Events
        </Link>

        <section className="create-event-container">

          <div className="page-header">

            <div>

              <p className="dashboard-label">
                COMMUNITY CONNECT
              </p>

              <h1>
                Create an Event
              </h1>

              <p>
                Create an event and invite
                your community members.
              </p>

            </div>

          </div>


          <form
            className="create-event-form"
            onSubmit={handleSubmit}
          >

            {/* Title */}

            <div className="form-group">

              <label>
                Event Title
              </label>

              <input
                type="text"
                placeholder="Enter event title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>


            {/* Description */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                placeholder="Describe your event..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows="5"
              />

            </div>


            {/* Date */}

            <div className="form-group">

              <label>
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />

            </div>


            {/* Time */}

            <div className="form-group">

              <label>
                Time
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
              />

            </div>


            {/* Location */}

            <div className="form-group">

              <label>
                Location
              </label>

              <input
                type="text"
                placeholder="Enter event location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />

            </div>


            {/* Type */}

            <div className="form-group">

              <label>
                Community Type
              </label>

              <select
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


            {/* Buttons */}

            <div className="form-actions">

              <Link
                to="/events"
                className="cancel-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="create-community-btn"
              >
                Create Event
              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  )
}

export default CreateEvent