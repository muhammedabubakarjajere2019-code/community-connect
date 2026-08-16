import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logout from '../components/Logout'
import '../App.css'

function AnnouncementDetails() {
  const { id } = useParams()

  const [announcement, setAnnouncement] = useState(null)

  const defaultAnnouncements = [
    {
      id: 1,
      title: 'Important Community Meeting',
      message:
        'All community members are invited to attend the upcoming community development meeting.',
      author: 'Community Admin',
      date: '12 August 2026',
      time: '2 hours ago',
      type: 'General',
      icon: '📢',
    },
    {
      id: 2,
      title: 'Youth Development Program',
      message:
        'Registration is now open for our youth development and skills training program.',
      author: 'Youth Coordinator',
      date: '11 August 2026',
      time: 'Yesterday',
      type: 'General',
      icon: '🎓',
    },
    {
      id: 3,
      title: 'Muslim Youth Gathering',
      message:
        'Members are invited to participate in the upcoming Muslim youth community gathering.',
      author: 'Community Admin',
      date: '10 August 2026',
      time: '2 days ago',
      type: 'Muslim',
      icon: '🕌',
    },
    {
      id: 4,
      title: 'Christian Youth Meeting',
      message:
        'The Christian youth community meeting will take place at the community hall.',
      author: 'Community Coordinator',
      date: '09 August 2026',
      time: '3 days ago',
      type: 'Christian',
      icon: '⛪',
    },
    {
      id: 5,
      title: 'Community Clean-up Exercise',
      message:
        'Everyone is encouraged to participate in our upcoming community clean-up exercise.',
      author: 'Community Admin',
      date: '08 August 2026',
      time: '4 days ago',
      type: 'General',
      icon: '🌱',
    },
  ]

  useEffect(() => {
    const savedAnnouncements =
      JSON.parse(
        localStorage.getItem('announcements')
      ) || []

    const allAnnouncements = [
      ...defaultAnnouncements,
      ...savedAnnouncements,
    ]

    // Remove duplicate IDs
    const uniqueAnnouncements =
      allAnnouncements.filter(
        (announcementItem, index, array) =>
          index ===
          array.findIndex(
            (item) =>
              String(item.id) ===
              String(announcementItem.id)
          )
      )

    const selectedAnnouncement =
      uniqueAnnouncements.find(
        (item) =>
          String(item.id) === String(id)
      )

    setAnnouncement(
      selectedAnnouncement || null
    )
  }, [id])

  // Announcement not found
  if (!announcement) {
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

        {/* MAIN */}

        <main className="dashboard-main">

          <Link
            to="/announcements"
            className="back-link"
          >
            ← Back to Announcements
          </Link>

          <div className="empty-announcements">

            <div>
              📢
            </div>

            <h2>
              Announcement Not Found
            </h2>

            <p>
              We could not find this announcement.
            </p>

            <Link
              to="/announcements"
              className="create-community-btn"
            >
              ← Return to Announcements
            </Link>

          </div>

        </main>

      </div>
    )
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

        {/* ANNOUNCEMENT HEADER */}

        <section className="community-details-hero">

          <div className="community-details-icon">
            {announcement.icon || '📢'}
          </div>

          <div className="community-details-info">

            <span
              className={`community-type ${
                announcement.type?.toLowerCase() ||
                'general'
              }`}
            >
              {announcement.type || 'General'}
            </span>

            <h1>
              {announcement.title}
            </h1>

            <p>
              {announcement.message}
            </p>

            <div className="community-detail-meta">

              <span>
                👤{' '}
                {announcement.author ||
                  'Community Admin'}
              </span>

              <span>
                📅{' '}
                {announcement.date ||
                  'Recently'}
              </span>

              <span>
                🕓{' '}
                {announcement.time ||
                  'Recently'}
              </span>

            </div>

          </div>

        </section>

        {/* ANNOUNCEMENT INFORMATION */}

        <section className="community-details-grid">

          <div className="details-card">

            <div className="details-card-icon">
              📢
            </div>

            <h2>
              Announcement Type
            </h2>

            <p>
              {announcement.type ||
                'General'}
            </p>

          </div>

          <div className="details-card">

            <div className="details-card-icon">
              👤
            </div>

            <h2>
              Posted By
            </h2>

            <p>
              {announcement.author ||
                'Community Admin'}
            </p>

          </div>

          <div className="details-card">

            <div className="details-card-icon">
              📅
            </div>

            <h2>
              Published
            </h2>

            <p>
              {announcement.date ||
                'Recently'}
            </p>

          </div>

        </section>

        {/* MESSAGE */}

        <section className="community-welcome">

          <span>
            📢
          </span>

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h2>
              Community Announcement
            </h2>

            <p>
              {announcement.message}
            </p>

          </div>

        </section>

        {/* BACK BUTTON */}

        <div
          style={{
            marginTop: '24px',
          }}
        >

          <Link
            to="/announcements"
            className="view-event-btn"
          >
            ← Back to Announcements
          </Link>

        </div>

      </main>

    </div>
  )
}

export default AnnouncementDetails