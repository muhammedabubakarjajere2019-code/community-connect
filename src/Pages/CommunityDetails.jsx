import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logout from '../components/Logout'
import '../App.css'

function CommunityDetails() {
  const { id } = useParams()

  const [community, setCommunity] = useState(null)
  const [joined, setJoined] = useState(false)

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

  // LOAD COMMUNITY
  useEffect(() => {
    const savedCommunities =
      JSON.parse(
        localStorage.getItem('communities')
      ) || []

    const allCommunities = [
      ...sampleCommunities,
      ...savedCommunities,
    ]

    const selectedCommunity =
      allCommunities.find(
        (item) =>
          String(item.id) === String(id)
      )

    setCommunity(
      selectedCommunity || null
    )
  }, [id])

  // CHECK IF USER ALREADY JOINED
  useEffect(() => {
    const joinedCommunities =
      JSON.parse(
        localStorage.getItem(
          'joinedCommunities'
        )
      ) || []

    const alreadyJoined =
      joinedCommunities.some(
        (communityId) =>
          String(communityId) === String(id)
      )

    setJoined(alreadyJoined)
  }, [id])

  // JOIN / LEAVE COMMUNITY
  const handleJoinCommunity = () => {
    const joinedCommunities =
      JSON.parse(
        localStorage.getItem(
          'joinedCommunities'
        )
      ) || []

    if (joined) {
      const updatedCommunities =
        joinedCommunities.filter(
          (communityId) =>
            String(communityId) !== String(id)
        )

      localStorage.setItem(
        'joinedCommunities',
        JSON.stringify(updatedCommunities)
      )

      setJoined(false)

      alert('You have left this community.')
    } else {
      const alreadyJoined =
        joinedCommunities.some(
          (communityId) =>
            String(communityId) === String(id)
        )

      if (alreadyJoined) {
        setJoined(true)
        return
      }

      const updatedCommunities = [
        ...joinedCommunities,
        String(id),
      ]

      localStorage.setItem(
        'joinedCommunities',
        JSON.stringify(updatedCommunities)
      )

      setJoined(true)

      alert('You have joined this community!')
    }
  }

  // COMMUNITY NOT FOUND
  if (!community) {
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

            <Logout />

          </div>

        </aside>

        {/* MAIN */}

        <main className="dashboard-main">

          <Link
            to="/communities"
            className="back-link"
          >
            ← Back to Communities
          </Link>

          <div className="empty-communities">

            <div>
              🔍
            </div>

            <h2>
              Community Not Found
            </h2>

            <p>
              We could not find this community.
            </p>

            <Link
              to="/communities"
              className="create-community-btn"
            >
              ← Return to Communities
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

        <Link
          to="/communities"
          className="back-link"
        >
          ← Back to Communities
        </Link>

        {/* COMMUNITY HEADER */}

        <section className="community-details-hero">

          <div className="community-details-icon">
            {community.icon || '🤝'}
          </div>

          <div className="community-details-info">

            <span
              className={`community-type ${
                community.type?.toLowerCase() ||
                'general'
              }`}
            >
              {community.type || 'General'}
            </span>

            <h1>
              {community.name}
            </h1>

            <p>
              {community.description}
            </p>

            <div className="community-detail-meta">

              <span>
                👥 {community.members || 0} Members
              </span>

              <span>
                📍 Community Connect
              </span>

            </div>

          </div>

          {/* JOIN BUTTON */}

          <button
            type="button"
            className={
              joined
                ? 'join-community-btn joined'
                : 'join-community-btn'
            }
            onClick={handleJoinCommunity}
          >
            {joined
              ? '✓ Joined Community'
              : '+ Join Community'}
          </button>

        </section>

        {/* COMMUNITY OPTIONS */}

        <section className="community-details-grid">

          <div className="details-card">

            <div className="details-card-icon">
              📅
            </div>

            <h2>
              Upcoming Events
            </h2>

            <p>
              Discover events and activities
              organized by this community.
            </p>

            <Link to="/events">
              View Events →
            </Link>

          </div>

          <div className="details-card">

            <div className="details-card-icon">
              📢
            </div>

            <h2>
              Announcements
            </h2>

            <p>
              Stay updated with important
              community announcements.
            </p>

            <Link to="/announcements">
              View Announcements →
            </Link>

          </div>

          <div className="details-card">

            <div className="details-card-icon">
              👥
            </div>

            <h2>
              Community Members
            </h2>

            <p>
              Connect with members of this
              community.
            </p>

            <Link to="/members">
              View Members →
            </Link>

          </div>

        </section>

        {/* WELCOME MESSAGE */}

        <section className="community-welcome">

          <span>
            🤝
          </span>

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h2>
              Connect. Participate. Grow Together.
            </h2>

            <p>
              This community is a place where
              people can connect, share ideas,
              participate in activities and
              support one another.
            </p>

          </div>

        </section>

      </main>

    </div>
  )
}

export default CommunityDetails