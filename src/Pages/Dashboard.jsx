import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../components/Logout'
import '../App.css'

function Dashboard() {
  const [profile, setProfile] = useState({
    name: 'Muhammed',
    email: '',
    phone: '',
    bio: '',
    photo: '',
  })

  const [events, setEvents] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [members, setMembers] = useState([])

  // Default events
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

  // Default members
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

  useEffect(() => {
    // Load profile
    const savedProfile =
      JSON.parse(localStorage.getItem('profile')) || null

    if (savedProfile) {
      setProfile(savedProfile)
    }

    // Load saved events
    const savedEvents =
      JSON.parse(localStorage.getItem('events')) || []

    // Show default events + created events
    setEvents([
      ...defaultEvents,
      ...savedEvents,
    ])

    // Load saved announcements
    const savedAnnouncements =
      JSON.parse(localStorage.getItem('announcements')) || []

    // Show default announcements + created announcements
    setAnnouncements([
      ...savedAnnouncements,
      ...defaultAnnouncements,
    ])

    // Load saved members
    const savedMembers =
      JSON.parse(localStorage.getItem('members')) || []

    // Load invited members too
    const invitedMembers =
      JSON.parse(localStorage.getItem('invitedMembers')) || []

    // Show default members + saved members + invited members
    setMembers([
      ...defaultMembers,
      ...savedMembers,
      ...invitedMembers,
    ])
  }, [])

  // Format event date
  const formatEventDate = (eventDate) => {
    if (!eventDate) {
      return {
        day: '--',
        month: '---',
      }
    }

    const dateString = eventDate + 'T00:00:00'
    const date = new Date(dateString)

    return {
      day: date.getDate(),
      month: date
        .toLocaleDateString('en-US', {
          month: 'short',
        })
        .toUpperCase(),
    }
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

          <Link
            to="/dashboard"
            className="active"
          >
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


      {/* MAIN CONTENT */}

      <main className="dashboard-main">

        {/* HEADER */}

        <header className="dashboard-header">

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h1>
              Welcome back,{' '}
              {profile.name || 'Community Member'} 👋
            </h1>

            <p>
              Here's what's happening in your community today.
            </p>

          </div>


          <div className="dashboard-user">

            <Link
              to="/announcements"
              className="notification"
              title="View Announcements"
            >
              🔔
            </Link>


            {profile.photo ? (

              <img
                src={profile.photo}
                alt={profile.name || 'Profile'}
                className="user-avatar user-avatar-image"
              />

            ) : (

              <div className="user-avatar">
                {profile.name
                  ? profile.name.charAt(0).toUpperCase()
                  : 'C'}
              </div>

            )}

          </div>

        </header>


        {/* STATISTICS */}

        <section className="dashboard-stats">

          {/* MEMBERS */}

          <div className="stat-card">

            <div className="stat-icon">
              👥
            </div>

            <div>

              <p>
                Total Members
              </p>

              <h2>
                {members.length}
              </h2>

              <small>
                Community members
              </small>

            </div>

          </div>


          {/* EVENTS */}

          <div className="stat-card">

            <div className="stat-icon">
              📅
            </div>

            <div>

              <p>
                Upcoming Events
              </p>

              <h2>
                {events.length}
              </h2>

              <small>
                Events available
              </small>

            </div>

          </div>


          {/* ANNOUNCEMENTS */}

          <div className="stat-card">

            <div className="stat-icon">
              📢
            </div>

            <div>

              <p>
                Announcements
              </p>

              <h2>
                {announcements.length}
              </h2>

              <small>
                Community announcements
              </small>

            </div>

          </div>

        </section>


        {/* CONTENT GRID */}

        <section className="dashboard-grid">

          {/* UPCOMING EVENTS */}

          <div className="dashboard-card">

            <div className="card-header">

              <div>

                <p className="card-label">
                  COMMUNITY EVENTS
                </p>

                <h2>
                  Upcoming Events
                </h2>

              </div>

              <Link to="/events">
                View all
              </Link>

            </div>


            {events.length > 0 ? (

              events
                .slice(0, 3)
                .map((event) => {

                  const formattedDate =
                    formatEventDate(event.date)

                  return (

                    <div
                      className="event-item"
                      key={event.id}
                    >

                      <div className="event-date">

                        <strong>
                          {formattedDate.day}
                        </strong>

                        <span>
                          {formattedDate.month}
                        </span>

                      </div>


                      <div className="event-info">

                        <h3>
                          {event.title}
                        </h3>

                        <p>
                          🕓 {event.time}
                          {' • '}
                          📍 {event.location}
                        </p>

                      </div>


                      <Link
                        to={`/event/${event.id}`}
                        className="event-arrow"
                        title="View event"
                      >
                        →
                      </Link>

                    </div>

                  )
                })

            ) : (

              <div className="empty-dashboard-message">

                <p>
                  No events available yet.
                </p>

                <Link to="/events">
                  View Events →
                </Link>

              </div>

            )}

          </div>


          {/* ANNOUNCEMENTS */}

          <div className="dashboard-card">

            <div className="card-header">

              <div>

                <p className="card-label">
                  COMMUNITY NEWS
                </p>

                <h2>
                  Announcements
                </h2>

              </div>

              <Link to="/announcements">
                View all
              </Link>

            </div>


            {announcements.length > 0 ? (

              announcements
                .slice(0, 2)
                .map((announcement) => (

                  <div
                    className="announcement"
                    key={announcement.id}
                  >

                    <div className="announcement-icon">
                      {announcement.icon || '📢'}
                    </div>

                    <div>

                      <h3>
                        {announcement.title}
                      </h3>

                      <p>
                        {announcement.message}
                      </p>

                      <small>
                        {announcement.time || 'Recently'}
                      </small>

                    </div>

                  </div>

                ))

            ) : (

              <div className="empty-dashboard-message">

                <p>
                  No announcements available yet.
                </p>

                <Link to="/announcements">
                  View Announcements →
                </Link>

              </div>

            )}

          </div>

        </section>


        {/* COMMUNITY SECTION */}

        <section className="community-banner">

          <div>

            <p>
              YOUR COMMUNITY
            </p>

            <h2>
              Build stronger connections together.
            </h2>

            <span>
              Manage your members, events and
              announcements from one place.
            </span>

          </div>

          <Link to="/communities">
            Explore Communities →
          </Link>

        </section>

      </main>

    </div>
  )
}

export default Dashboard