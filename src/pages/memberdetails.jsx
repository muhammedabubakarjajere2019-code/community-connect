import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logout from '../components/logout'
import '../App.css'

function MemberDetails() {
  const { id } = useParams()

  const defaultMembers = [
    {
      id: 1,
      name: 'Aisha Mohammed',
      email: 'aisha@example.com',
      community: 'Muslim Youth Community',
      type: 'Muslim',
      joined: '12 Aug 2026',
      status: 'Active',
    },
    {
      id: 2,
      name: 'David John',
      email: 'david@example.com',
      community: 'Christian Youth Community',
      type: 'Christian',
      joined: '10 Aug 2026',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Abdullahi Musa',
      email: 'abdullahi@example.com',
      community: 'Muslim Youth Community',
      type: 'Muslim',
      joined: '08 Aug 2026',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Grace Daniel',
      email: 'grace@example.com',
      community: 'Christian Family Community',
      type: 'Christian',
      joined: '05 Aug 2026',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Ibrahim Ali',
      email: 'ibrahim@example.com',
      community: 'General Community',
      type: 'General',
      joined: '02 Aug 2026',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Mary Joseph',
      email: 'mary@example.com',
      community: 'General Community',
      type: 'General',
      joined: '30 Jul 2026',
      status: 'Inactive',
    },
  ]

  const [member, setMember] = useState(null)

  useEffect(() => {
    const savedMembers =
      JSON.parse(localStorage.getItem('invitedMembers')) || []

    const allMembers = [
      ...defaultMembers,
      ...savedMembers,
    ]

    const selectedMember = allMembers.find(
      (item) => String(item.id) === String(id)
    )

    setMember(selectedMember || null)
  }, [id])

  // Member not found
  if (!member) {
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

            {/* LOGOUT */}
            <Logout />

          </div>

        </aside>

        {/* MAIN */}

        <main className="dashboard-main">

          <Link
            to="/members"
            className="back-link"
          >
            ← Back to Members
          </Link>

          <div className="empty-communities">

            <div>
              👤
            </div>

            <h2>
              Member Not Found
            </h2>

            <p>
              We could not find this member.
            </p>

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

          {/* ONLY ONE LOGOUT BUTTON */}
          <Logout />

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

        {/* MEMBER PROFILE */}

        <section className="member-details-card">

          <div className="member-details-avatar">
            {member.name
              ? member.name.charAt(0).toUpperCase()
              : 'M'}
          </div>

          <div className="member-details-info">

            <span
              className={`member-type ${
                member.type?.toLowerCase() || 'general'
              }`}
            >
              {member.type || 'General'}
            </span>

            <h1>
              {member.name}
            </h1>

            <p>
              👤 Community Member
            </p>

            <span
              className={`member-status ${
                member.status?.toLowerCase() || 'active'
              }`}
            >
              ● {member.status || 'Active'}
            </span>

          </div>

        </section>

        {/* MEMBER INFORMATION */}

        <section className="member-details-grid">

          <div className="details-card">

            <div className="details-card-icon">
              📧
            </div>

            <h2>
              Email
            </h2>

            <p>
              {member.email || 'No email provided'}
            </p>

          </div>

          <div className="details-card">

            <div className="details-card-icon">
              🏘️
            </div>

            <h2>
              Community
            </h2>

            <p>
              {member.community || 'Community Connect'}
            </p>

          </div>

          <div className="details-card">

            <div className="details-card-icon">
              📅
            </div>

            <h2>
              Joined
            </h2>

            <p>
              {member.joined || 'Recently joined'}
            </p>

          </div>

        </section>

        {/* COMMUNITY WELCOME */}

        <section className="community-welcome">

          <span>
            🤝
          </span>

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h2>
              Connected and Growing Together
            </h2>

            <p>
              Community Connect brings people
              together to participate, communicate
              and support positive community
              development.
            </p>

          </div>

        </section>

      </main>

    </div>
  )
}

export default MemberDetails