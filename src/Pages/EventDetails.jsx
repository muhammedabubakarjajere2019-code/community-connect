import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logout from '../components/Logout'
import '../App.css'

function EventDetails() {
  const { id } = useParams()

  const [event, setEvent] = useState(null)
  const [joined, setJoined] = useState(false)

  const defaultEvents = [
    {
      id: 1,
      date: '2026-08-20',
      title: 'Community Development Meeting',
      description:
        'Discuss community development plans and upcoming activities.',
      time: '4:00 PM',
      location: 'Community Center',
      type: 'General',
      status: 'Upcoming',
    },
    {
      id: 2,
      date: '2026-08-24',
      title: 'Youth Development Event',
      description:
        'A youth-focused program for learning, skills and development.',
      time: '10:00 AM',
      location: 'Main Hall',
      type: 'General',
      status: 'Upcoming',
    },
    {
      id: 3,
      date: '2026-08-28',
      title: 'Muslim Youth Gathering',
      description:
        'An opportunity for Muslim youth to connect and participate.',
      time: '3:00 PM',
      location: 'Community Hall',
      type: 'Muslim',
      status: 'Upcoming',
    },
    {
      id: 4,
      date: '2026-09-02',
      title: 'Christian Youth Meeting',
      description:
        'Youth fellowship, discussion and community activities.',
      time: '5:00 PM',
      location: 'Church Hall',
      type: 'Christian',
      status: 'Upcoming',
    },
    {
      id: 5,
      date: '2026-09-06',
      title: 'Community Clean-up',
      description:
        'Working together to keep our community clean and healthy.',
      time: '8:00 AM',
      location: 'Community Center',
      type: 'General',
      status: 'Upcoming',
    },
    {
      id: 6,
      date: '2026-09-10',
      title: 'Community Skills Workshop',
      description:
        'Learn practical skills and discover new opportunities.',
      time: '11:00 AM',
      location: 'Training Hall',
      type: 'General',
      status: 'Upcoming',
    },
  ]

  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem('events')) || []

    const allEvents = [
      ...defaultEvents,
      ...savedEvents,
    ]

    const selectedEvent = allEvents.find(
      (item) =>
        String(item.id) === String(id)
    )

    setEvent(selectedEvent || null)

    const savedJoinedEvents =
      JSON.parse(
        localStorage.getItem('joinedEvents')
      ) || []

    const alreadyJoined =
      savedJoinedEvents.some(
        (eventId) =>
          String(eventId) === String(id)
      )

    setJoined(alreadyJoined)
  }, [id])

  const handleJoinEvent = () => {
    const savedJoinedEvents =
      JSON.parse(
        localStorage.getItem('joinedEvents')
      ) || []

    if (joined) {
      const updatedJoinedEvents =
        savedJoinedEvents.filter(
          (eventId) =>
            String(eventId) !== String(id)
        )

      localStorage.setItem(
        'joinedEvents',
        JSON.stringify(updatedJoinedEvents)
      )

      setJoined(false)

      alert('You have left this event.')
    } else {
      const alreadyJoined =
        savedJoinedEvents.some(
          (eventId) =>
            String(eventId) === String(id)
        )

      if (alreadyJoined) {
        setJoined(true)
        return
      }

      const updatedJoinedEvents = [
        ...savedJoinedEvents,
        id,
      ]

      localStorage.setItem(
        'joinedEvents',
        JSON.stringify(updatedJoinedEvents)
      )

      setJoined(true)

      alert('You have joined this event!')
    }
  }

  const getEventDate = () => {
    if (!event) {
      return {
        day: '--',
        month: '---',
      }
    }

    if (event.date) {
      const date = new Date(
        `${event.date}T00:00:00`
      )

      return {
        day: date.getDate(),
        month: date
          .toLocaleDateString('en-US', {
            month: 'short',
          })
          .toUpperCase(),
      }
    }

    return {
      day: event.day || '--',
      month: event.month || '---',
    }
  }

  // EVENT NOT FOUND
  if (!event) {
    return (
      <div className="dashboard">

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

            <Link
              to="/events"
              className="active"
            >
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

            <Logout />

          </div>

        </aside>

        <main className="dashboard-main">

          <Link
            to="/events"
            className="back-link"
          >
            ← Back to Events
          </Link>

          <div className="empty-events">

            <div>
              📅
            </div>

            <h2>
              Event Not Found
            </h2>

            <p>
              We could not find this event.
            </p>

            <Link
              to="/events"
              className="create-community-btn"
            >
              ← Return to Events
            </Link>

          </div>

        </main>

      </div>
    )
  }

  const eventDate = getEventDate()

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

          <Link
            to="/events"
            className="active"
          >
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

        <Link
          to="/events"
          className="back-link"
        >
          ← Back to Events
        </Link>

        {/* EVENT HEADER */}

        <section className="community-details-hero">

          <div className="community-details-icon">
            📅
          </div>

          <div className="community-details-info">

            <span
              className={`community-type ${
                event.type?.toLowerCase() ||
                'general'
              }`}
            >
              {event.type || 'General'}
            </span>

            <h1>
              {event.title}
            </h1>

            <p>
              {event.description}
            </p>

            <div className="community-detail-meta">

              <span>
                📅 {eventDate.day} {eventDate.month}
              </span>

              <span>
                🕓 {event.time}
              </span>

              <span>
                📍 {event.location}
              </span>

            </div>

          </div>

          <button
            type="button"
            className={
              joined
                ? 'join-community-btn joined'
                : 'join-community-btn'
            }
            onClick={handleJoinEvent}
          >
            {joined
              ? '✓ Joined Event'
              : '+ Join Event'}
          </button>

        </section>

        {/* EVENT INFORMATION */}

        <section className="community-details-grid">

          <div className="details-card">

            <div className="details-card-icon">
              📅
            </div>

            <h2>
              Event Date
            </h2>

            <p>
              {eventDate.day} {eventDate.month}
            </p>

          </div>

          <div className="details-card">

            <div className="details-card-icon">
              🕓
            </div>

            <h2>
              Event Time
            </h2>

            <p>
              {event.time || 'Time not specified'}
            </p>

          </div>

          <div className="details-card">

            <div className="details-card-icon">
              📍
            </div>

            <h2>
              Location
            </h2>

            <p>
              {event.location || 'Location not specified'}
            </p>

          </div>

        </section>

        {/* EVENT DESCRIPTION */}

        <section className="community-welcome">

          <span>
            🤝
          </span>

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h2>
              You are welcome to participate
            </h2>

            <p>
              Join this event, connect with
              other community members and
              participate in meaningful
              activities.
            </p>

          </div>

        </section>

      </main>

    </div>
  )
}

export default EventDetails