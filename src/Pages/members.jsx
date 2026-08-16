import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../components/Logout'
import '../App.css'

function Members() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [savedMembers, setSavedMembers] = useState([])

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

  // Load all saved members
  useEffect(() => {
    const savedMembersData =
      JSON.parse(localStorage.getItem('members')) || []

    const invitedMembers =
      JSON.parse(localStorage.getItem('invitedMembers')) || []

    setSavedMembers([
      ...savedMembersData,
      ...invitedMembers,
    ])
  }, [])

  // Combine default + saved members
  const allMembers = [
    ...defaultMembers,
    ...savedMembers,
  ]

  // Remove duplicate IDs
  const uniqueMembers = allMembers.filter(
    (member, index, array) =>
      index ===
      array.findIndex(
        (item) =>
          String(item.id) === String(member.id)
      )
  )

  // Search and filter
  const filteredMembers = uniqueMembers.filter(
    (member) => {
      const name =
        member.name?.toLowerCase() || ''

      const email =
        member.email?.toLowerCase() || ''

      const community =
        member.community?.toLowerCase() || ''

      const searchText =
        search.toLowerCase()

      const matchesSearch =
        name.includes(searchText) ||
        email.includes(searchText) ||
        community.includes(searchText)

      const matchesFilter =
        filter === 'All' ||
        member.type === filter

      return matchesSearch && matchesFilter
    }
  )

  // Statistics
  const totalMembers =
    uniqueMembers.length

  const activeMembers =
    uniqueMembers.filter(
      (member) =>
        member.status === 'Active'
    ).length

  // Count members who joined this month
  const currentMonth =
    new Date().getMonth()

  const currentYear =
    new Date().getFullYear()

  const newThisMonth =
    uniqueMembers.filter((member) => {
      if (!member.joined) return false

      const joinedDate =
        new Date(member.joined)

      return (
        !isNaN(joinedDate.getTime()) &&
        joinedDate.getMonth() === currentMonth &&
        joinedDate.getFullYear() === currentYear
      )
    }).length

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

          <Logout />

        </div>

      </aside>


      {/* MAIN */}

      <main className="dashboard-main">

        {/* HEADER */}

        <header className="page-header">

          <div>

            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h1>
              Community Members
            </h1>

            <p>
              View and manage people connected
              to your communities.
            </p>

          </div>

          <Link
            to="/invite-member"
            className="create-community-btn"
          >
            + Invite Member
          </Link>

        </header>


        {/* STATISTICS */}

        <section className="member-stats">

          <div className="member-stat-card">

            <div className="member-stat-icon">
              👥
            </div>

            <div>

              <span>
                Total Members
              </span>

              <strong>
                {totalMembers}
              </strong>

            </div>

          </div>


          <div className="member-stat-card">

            <div className="member-stat-icon">
              🟢
            </div>

            <div>

              <span>
                Active Members
              </span>

              <strong>
                {activeMembers}
              </strong>

            </div>

          </div>


          <div className="member-stat-card">

            <div className="member-stat-icon">
              🆕
            </div>

            <div>

              <span>
                New This Month
              </span>

              <strong>
                {newThisMonth}
              </strong>

            </div>

          </div>

        </section>


        {/* SEARCH */}

        <section className="members-toolbar">

          <div className="member-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="member-filters">

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

                {type === 'Muslim' &&
                  '🕌 '}

                {type === 'Christian' &&
                  '⛪ '}

                {type === 'General' &&
                  '🤝 '}

                {type}

              </button>

            ))}

          </div>

        </section>


        {/* TABLE */}

        <section className="members-table-card">

          <div className="members-table-header">

            <div>

              <h2>
                All Members
              </h2>

              <p>
                {filteredMembers.length}{' '}
                members displayed
              </p>

            </div>

          </div>


          <div className="members-table-wrapper">

            <table className="members-table">

              <thead>

                <tr>

                  <th>
                    Member
                  </th>

                  <th>
                    Community
                  </th>

                  <th>
                    Type
                  </th>

                  <th>
                    Joined
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredMembers.map(
                  (member) => (

                    <tr
                      key={member.id}
                    >

                      <td>

                        <div className="member-info">

                          <div className="member-avatar">

                            {member.name
                              ? member.name
                                  .charAt(0)
                                  .toUpperCase()
                              : 'M'}

                          </div>

                          <div>

                            <strong>
                              {member.name}
                            </strong>

                            <span>
                              {member.email}
                            </span>

                          </div>

                        </div>

                      </td>


                      <td>
                        {member.community ||
                          'General Community'}
                      </td>


                      <td>

                        <span
                          className={`member-type ${
                            member.type?.toLowerCase() ||
                            'general'
                          }`}
                        >
                          {member.type ||
                            'General'}
                        </span>

                      </td>


                      <td>
                        {member.joined ||
                          'Recently'}
                      </td>


                      <td>

                        <span
                          className={`member-status ${
                            member.status?.toLowerCase() ||
                            'active'
                          }`}
                        >
                          ●{' '}
                          {member.status ||
                            'Active'}
                        </span>

                      </td>


                      <td>

                        <Link
                          to={`/member/${member.id}`}
                          className="member-view-btn"
                        >
                          View
                        </Link>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>


        {/* NO RESULTS */}

        {filteredMembers.length === 0 && (

          <div className="empty-events">

            <div>
              👥
            </div>

            <h2>
              No members found
            </h2>

            <p>
              Try another search or select
              a different community type.
            </p>

          </div>

        )}

      </main>

    </div>
  )
}

export default Members