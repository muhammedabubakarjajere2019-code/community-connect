import '../App.css'
import { Link } from 'react-router-dom'
import communityImage from './images/community.png'
function LandingPage() {
  return (
    <div className="app">

      {/* Navigation */}
      <header className="navbar">

        <div className="brand">
          <div className="brand-icon">C</div>
          <span>Community Connect</span>
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="#communities">Communities</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-buttons">

          <a href="/login">
            <button className="login-btn">
              Login
            </button>
          </a>

          <a href="/register">
            <button className="primary-btn">
              Get Started
            </button>
          </a>

        </div>

      </header>


      {/* Hero */}
      <main>

        <section className="hero">

          {/* Left Side */}
          <div className="hero-content">

            <div className="badge">
              🤝 Connecting communities together
            </div>

            <h1>
              Connect.
              <span> Participate.</span>
              <br />
              Grow Together.
            </h1>

            <p>
              Community Connect is a simple platform where communities can
              manage members, share announcements, organize events, and build
              stronger connections.
            </p>

            <div className="hero-buttons">

              <a href="/register">
                <button className="primary-btn large">
                  Get Started →
                </button>
              </a>

              <a href="#communities">
                <button className="secondary-btn">
                  Explore Communities
                </button>
              </a>

            </div>

            <div className="community-types">

              <span>
                🕌 Muslim Communities
              </span>

              <span>
                ⛪ Christian Communities
              </span>

              <span>
                🤝 General Communities
              </span>

            </div>

          </div>


          {/* Right Side - Image */}
          <div className="hero-card">

            <img
              src={communityImage}
              alt="Community Connect"
              className="hero-image"
            />

            <div className="image-overlay">

              <h3>
                Community Connect
              </h3>

              <p>
                Building stronger communities together
              </p>

            </div>

          </div>

        </section>


        {/* Features */}
        <section
          className="features"
          id="communities"
        >

          <div className="section-heading">

            <span>
              OUR PLATFORM
            </span>

            <h2>
              Everything your community needs
            </h2>

            <p>
              Manage your community activities from one simple platform.
            </p>

          </div>


          <div className="feature-grid">

            <div className="feature-card">

              <div className="feature-icon">
                👥
              </div>

              <h3>
                Manage Members
              </h3>

              <p>
                Keep your community members organized and connected in one
                place.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📅
              </div>

              <h3>
                Organize Events
              </h3>

              <p>
                Create and share upcoming community events with your members.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📢
              </div>

              <h3>
                Share Announcements
              </h3>

              <p>
                Make sure important community information reaches your members.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🏘️
              </div>

              <h3>
                Build Communities
              </h3>

              <p>
                Create spaces for religious, social, educational and charity
                communities.
              </p>

            </div>

          </div>

        </section>


        {/* Events */}
        <section
          className="events-section"
          id="events"
        >

          <div>

            <span className="section-label">
              COMMUNITY EVENTS
            </span>

            <h2>
              Stay involved in your community.
            </h2>

            <p>
              Discover upcoming activities, meetings, development programs and
              community events.
            </p>

           <Link to="/events" className="primary-btn">
            Explore Events →
          </Link>

          </div>


          <div className="event-highlight">

            <span>
              UPCOMING EVENT
            </span>

            <h3>
              Community Development Meeting
            </h3>

            <p>
              📅 20 August 2026
            </p>

            <p>
              🕓 4:00 PM
            </p>

            <p>
              📍 Community Center
            </p>

           <Link to="/event/1" className="secondary-btn">
            View Event
          </Link>

          </div>

        </section>


        {/* About */}
        <section
          className="about"
          id="about"
        >

          <span className="section-label">
            ABOUT COMMUNITY CONNECT
          </span>

          <h2>
            Different communities. One simple platform.
          </h2>

          <p>
            Community Connect is designed to help religious, social,
            educational and charitable organizations communicate, organize
            activities and manage their members digitally.
          </p>

        </section>


        {/* Call To Action */}
        <section className="cta">

          <h2>
            Ready to connect with your community?
          </h2>

          <p>
            Create your community space and start bringing people together.
          </p>

          <a href="/register">
            <button className="primary-btn large">
              Create Your Community →
            </button>
          </a>

        </section>

      </main>


      {/* Footer */}
      <footer>

        <div className="brand">

          <div className="brand-icon">
            C
          </div>

          <span>
            Community Connect
          </span>

        </div>

        <p>
          Connect. Participate. Grow.
        </p>

        <small>
          © 2026 Community Connect. All rights reserved.
        </small>

      </footer>

    </div>
  )
}

export default LandingPage