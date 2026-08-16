import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function Announcements() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [savedAnnouncements, setSavedAnnouncements] = useState([])

  // Load saved announcements from localStorage
  useEffect(() => {
    const storedAnnouncements =
      JSON.parse(localStorage.getItem('announcements')) || []

    setSavedAnnouncements(storedAnnouncements)
  }, [])

  // Default announcements
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

  // Saved announcements appear first
  const allAnnouncements = [
    ...savedAnnouncements,
    ...defaultAnnouncements,
  ]

  // Search + filter
  const filteredAnnouncements = allAnnouncements.filter(
    (announcement) => {
      const title =
        announcement.title?.toLowerCase() || ''

      const message =
        announcement.message?.toLowerCase() || ''

      const author =
        announcement.author?.toLowerCase() || ''

      const searchText =
        search.toLowerCase()

      const matchesSearch =
        title.includes(searchText) ||
        message.includes(searchText) ||
        author.includes(searchText)

      const matchesFilter =
        filter === 'All' ||
        announcement.type === filter

      return matchesSearch && matchesFilter
    }
  )

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

          <Link to="/">
            <span>🚪</span>
            Logout
          </Link>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="dashboard-main">

        {/* HEADER */}

        <header className="page-header">

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h1>
              Announcements
            </h1>

            <p>
              Stay informed about important
              community news and updates.
            </p>

          </div>


          <Link
            to="/create-announcement"
            className="create-community-btn"
          >
            + New Announcement
          </Link>

        </header>


        {/* SEARCH AND FILTERS */}

        <section className="announcements-toolbar">

          <div className="announcement-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="announcement-filters">

            {[
              'All',
              'Muslim',
              'Christian',
              'General',
            ].map((type) => (

              <button
                key={type}
                className={
                  filter === type
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  setFilter(type)
                }
              >

                {type === 'Muslim' && '🕌 '}

                {type === 'Christian' && '⛪ '}

                {type === 'General' && '🤝 '}

                {type}

              </button>

            ))}

          </div>

        </section>


        {/* RESULTS */}

        <div className="announcement-results">

          <strong>
            {filteredAnnouncements.length}
          </strong>

          <span>
            {' '}announcements available
          </span>

        </div>


        {/* ANNOUNCEMENT LIST */}

        <section className="announcement-list">

          {filteredAnnouncements.map(
            (announcement) => (

              <article
                className="announcement-card"
                key={announcement.id}
              >

                {/* Icon */}

                <div className="announcement-card-icon">
                  {announcement.icon || '📢'}
                </div>


                {/* Content */}

                <div className="announcement-content">

                  <div className="announcement-card-header">

                    <div>

                      <span
                        className={`announcement-type ${
                          announcement.type?.toLowerCase() ||
                          'general'
                        }`}
                      >
                        {announcement.type || 'General'}
                      </span>

                      <h2>
                        {announcement.title}
                      </h2>

                    </div>


                    <span className="announcement-time">
                      {announcement.time || 'Just now'}
                    </span>

                  </div>


                  <p>
                    {announcement.message}
                  </p>


                  {/* Footer */}

                  <div className="announcement-footer">

                    <span>
                      👤 {announcement.author || 'Community Admin'}
                    </span>

                    <span>
                      📅 {announcement.date || 'Recently'}
                    </span>


                    <Link
                      to={`/announcement/${announcement.id}`}
                      className="view-event-btn"
                    >
                      View →
                    </Link>

                  </div>

                </div>

              </article>

            )
          )}

        </section>


        {/* NO RESULTS */}

        {filteredAnnouncements.length === 0 && (

          <div className="empty-announcements">

            <div>
              📢
            </div>

            <h2>
              No announcements found
            </h2>

            <p>
              Try another search or select
              a different community type.
            </p>

          </div>

        )}


        {/* CTA */}

        <section className="announcement-cta">

          <div className="announcement-cta-icon">
            📢
          </div>


          <div>

            <h2>
              Have something important to share?
            </h2>

            <p>
              Create an announcement and keep
              your community informed.
            </p>

          </div>


          <Link
            to="/create-announcement"
            className="create-community-btn"
          >
            Create Announcement →
          </Link>

        </section>

      </main>

    </div>
  )
}

export default Announcements