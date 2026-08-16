import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../components/Logout'
import '../App.css'

function Communities() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [savedCommunities, setSavedCommunities] = useState([])

  // Load communities saved from Create Community
  useEffect(() => {
    const storedCommunities =
      JSON.parse(localStorage.getItem('communities')) || []

    setSavedCommunities(storedCommunities)
  }, [])

  // Sample communities
  const sampleCommunities = [
    {
      id: 1,
      type: 'Muslim',
      icon: '🕌',
      name: 'Muslim Youth Community',
      description:
        'A welcoming community for Muslim youth, learning, development and collaboration.',
      members: 120,
    },
    {
      id: 2,
      type: 'Christian',
      icon: '⛪',
      name: 'Christian Youth Community',
      description:
        'Connect, participate and grow through Christian youth activities and programs.',
      members: 85,
    },
    {
      id: 3,
      type: 'General',
      icon: '🤝',
      name: 'General Community',
      description:
        'A shared community for social activities, development and positive connections.',
      members: 64,
    },
    {
      id: 4,
      type: 'Muslim',
      icon: '🕌',
      name: 'Muslim Women Development',
      description:
        'A community focused on learning, empowerment and development activities.',
      members: 72,
    },
    {
      id: 5,
      type: 'Christian',
      icon: '⛪',
      name: 'Christian Family Community',
      description:
        'A space for families to connect, communicate and participate in community activities.',
      members: 91,
    },
    {
      id: 6,
      type: 'General',
      icon: '🤝',
      name: 'Youth Development Network',
      description:
        'Young people working together on education, skills and community development.',
      members: 110,
    },
  ]

  // Combine sample communities with newly created communities
  const allCommunities = [
    ...sampleCommunities,
    ...savedCommunities,
  ]

  // Search and filter
  const filteredCommunities = allCommunities.filter((community) => {
    const matchesFilter =
      filter === 'All' || community.type === filter

    const matchesSearch =
      community.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      community.description
        .toLowerCase()
        .includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

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


      {/* Main content */}

      <main className="dashboard-main">

        <header className="page-header">

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h1>
              Find your community
            </h1>

            <p>
              Connect with people, participate in activities
              and grow together.
            </p>

          </div>

          {/* Create Community */}

          <Link
            to="/create-community"
            className="create-community-btn"
          >
            + Create Community
          </Link>

        </header>


        {/* Search and filters */}

        <section className="community-controls">

          <div className="community-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search communities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="community-filters">

            {['All', 'Muslim', 'Christian', 'General'].map(
              (type) => (

                <button
                  key={type}
                  className={
                    filter === type ? 'selected' : ''
                  }
                  onClick={() => setFilter(type)}
                >

                  {type === 'Muslim' && '🕌 '}
                  {type === 'Christian' && '⛪ '}
                  {type === 'General' && '🤝 '}

                  {type}

                </button>

              )
            )}

          </div>

        </section>


        {/* Community count */}

        <div className="community-results">

          <div>

            <strong>
              {filteredCommunities.length}
            </strong>

            <span>
              {' '}communities available
            </span>

          </div>

          <span>
            Find a place where you belong.
          </span>

        </div>


        {/* Community cards */}

        <section className="community-grid">

          {filteredCommunities.map((community) => (

            <article
              className="community-card"
              key={community.id}
            >

              <div className="community-card-top">

                <div className="community-icon">
                  {community.icon}
                </div>

                <span
                  className={`community-type ${community.type.toLowerCase()}`}
                >
                  {community.type}
                </span>

              </div>

              <h2>
                {community.name}
              </h2>

              <p>
                {community.description}
              </p>

              <div className="community-card-footer">

                <div className="community-members">

                  <span>
                    👥
                  </span>

                  <strong>
                    {community.members}
                  </strong>

                  <span>
                    members
                  </span>

                </div>

                <Link
                  to={`/community/${community.id}`}
                  className="view-community-btn"
                >
                  View →
                </Link>

              </div>

            </article>

          ))}

        </section>


        {/* No results */}

        {filteredCommunities.length === 0 && (

          <div className="empty-communities">

            <div>
              🔍
            </div>

            <h2>
              No communities found
            </h2>

            <p>
              Try another search or select a different
              community type.
            </p>

          </div>

        )}


        {/* Bottom CTA */}

        <section className="community-cta">

          <div className="cta-icon">
            🤝
          </div>

          <div>

            <h2>
              Can't find your community?
            </h2>

            <p>
              Create a community and start bringing people together.
            </p>

          </div>

          <Link
            to="/create-community"
            className="create-community-btn"
          >
            + Create Community
          </Link>

        </section>

      </main>

    </div>
  )
}

export default Communities