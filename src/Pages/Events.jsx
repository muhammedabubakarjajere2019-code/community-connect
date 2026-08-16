import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../components/Logout'
import '../App.css'

function Events() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [events, setEvents] = useState([])
  const [joinedEvents, setJoinedEvents] = useState([])

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
    const storedEvents =
      JSON.parse(localStorage.getItem('events')) || []

    const allEvents = [
      ...defaultEvents,
      ...storedEvents,
    ]

    const uniqueEvents = allEvents.filter(
      (event, index, array) => {
        return (
          index ===
          array.findIndex(
            (item) =>
              String(item.id) === String(event.id)
          )
        )
      }
    )

    setEvents(uniqueEvents)

    const storedJoinedEvents =
      JSON.parse(localStorage.getItem('joinedEvents')) || []

    setJoinedEvents(storedJoinedEvents)
  }, [])

  const getEventDate = (event) => {
    if (event.date) {
      const date = new Date(
        event.date + 'T00:00:00'
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

  const handleJoinEvent = (eventId) => {
    const alreadyJoined = joinedEvents.some(
      (id) =>
        String(id) === String(eventId)
    )

    let updatedJoinedEvents

    if (alreadyJoined) {
      updatedJoinedEvents =
        joinedEvents.filter(
          (id) =>
            String(id) !== String(eventId)
        )
    } else {
      updatedJoinedEvents = [
        ...joinedEvents,
        eventId,
      ]
    }

    setJoinedEvents(updatedJoinedEvents)

    localStorage.setItem(
      'joinedEvents',
      JSON.stringify(updatedJoinedEvents)
    )
  }

  const filteredEvents = events.filter((event) => {
    const title =
      event.title?.toLowerCase() || ''

    const description =
      event.description?.toLowerCase() || ''

    const location =
      event.location?.toLowerCase() || ''

    const searchText =
      search.toLowerCase()

    const matchesSearch =
      title.includes(searchText) ||
      description.includes(searchText) ||
      location.includes(searchText)

    const matchesFilter =
      filter === 'All' ||
      event.type === filter

    return (
      matchesSearch &&
      matchesFilter
    )
  })

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

        <header className="page-header">

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h1>
              Community Events
            </h1>

            <p>
              Discover meetings, programs and activities
              happening in your communities.
            </p>

          </div>

          <Link
            to="/create-event"
            className="create-community-btn"
          >
            + Create Event
          </Link>

        </header>

        {/* SEARCH AND FILTERS */}

        <section className="events-toolbar">

          <div className="event-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="event-filters">

            {[
              'All',
              'Muslim',
              'Christian',
              'General',
            ].map((type) => (

              <button
                key={type}
                type="button"
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

        {/* RESULTS COUNT */}

        <div className="event-results">

          <strong>
            {filteredEvents.length}
          </strong>

          <span>
            {' '}
            upcoming events
          </span>

        </div>

        {/* EVENTS */}

        <section className="events-grid">

          {filteredEvents.map((event) => {

            const eventDate =
              getEventDate(event)

            const isJoined =
              joinedEvents.some(
                (id) =>
                  String(id) ===
                  String(event.id)
              )

            return (

              <article
                className="event-card"
                key={event.id}
              >

                <div className="event-card-top">

                  <div className="large-event-date">

                    <strong>
                      {eventDate.day}
                    </strong>

                    <span>
                      {eventDate.month}
                    </span>

                  </div>

                  <span
                    className={`event-type ${
                      event.type?.toLowerCase() ||
                      'general'
                    }`}
                  >
                    {event.type || 'General'}
                  </span>

                </div>

                <h2>
                  {event.title}
                </h2>

                <p className="event-description">
                  {event.description}
                </p>

                <div className="event-details">

                  <div>
                    <span>🕓</span>
                    {event.time}
                  </div>

                  <div>
                    <span>📍</span>
                    {event.location}
                  </div>

                </div>

                <div className="event-card-footer">

                  <span className="upcoming-status">
                    ● {event.status || 'Upcoming'}
                  </span>

                  <div className="event-actions">

                    <button
                      type="button"
                      className={
                        isJoined
                          ? 'joined-event-btn'
                          : 'join-event-btn'
                      }
                      onClick={() =>
                        handleJoinEvent(event.id)
                      }
                    >
                      {isJoined
                        ? '✓ Joined'
                        : 'Join Event'}
                    </button>

                    <Link
                      to={`/event/${event.id}`}
                      className="view-event-btn"
                    >
                      View Event →
                    </Link>

                  </div>

                </div>

              </article>

            )
          })}

        </section>

        {/* NO EVENTS */}

        {filteredEvents.length === 0 && (

          <div className="empty-events">

            <div>
              📅
            </div>

            <h2>
              No events found
            </h2>

            <p>
              Try another search or select
              a different community type.
            </p>

          </div>

        )}

        {/* CREATE EVENT CTA */}

        <section className="event-cta">

          <div className="event-cta-icon">
            📅
          </div>

          <div>

            <h2>
              Have an event to share?
            </h2>

            <p>
              Create an event and invite
              your community members.
            </p>

          </div>

          <Link
            to="/create-event"
            className="create-community-btn"
          >
            + Create Event
          </Link>

        </section>

      </main>

    </div>
  )
}

export default Events