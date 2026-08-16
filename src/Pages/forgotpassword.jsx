import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setMessage('')
    setError('')

    const savedUser = JSON.parse(
      localStorage.getItem('communityUser')
    )

    if (!savedUser) {
      setError('No account has been registered yet.')
      return
    }

    if (
      email.toLowerCase() !== savedUser.email.toLowerCase()
    ) {
      setError('No account was found with this email address.')
      return
    }

    setMessage(
      'Email verified. You can now reset your password.'
    )

    setTimeout(() => {
      navigate('/reset-password')
    }, 1000)
  }

  return (
    <div className="auth-page">

      {/* Left side */}
      <div className="auth-brand">

        <Link to="/" className="auth-logo">
          <div className="brand-icon">C</div>
          <span>Community Connect</span>
        </Link>

        <div className="auth-message">

          <div className="auth-symbol">
            🔐
          </div>

          <h1>
            Recover your
            <span> account.</span>
          </h1>

          <p>
            Enter the email address connected to your
            Community Connect account.
          </p>

          <div className="auth-points">

            <div>
              <span>✓</span>
              Verify your account
            </div>

            <div>
              <span>✓</span>
              Create a new password
            </div>

            <div>
              <span>✓</span>
              Continue using Community Connect
            </div>

          </div>

        </div>

      </div>

      {/* Right side */}
      <div className="auth-form-container">

        <div className="auth-form">

          <Link to="/login" className="mobile-back">
            ← Back to login
          </Link>

          <div className="form-heading">

            <h2>
              Forgot your password? 🔑
            </h2>

            <p>
              Enter your email to recover your account.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="forgot-email">
                Email address
              </label>

              <input
                id="forgot-email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                  setMessage('')
                }}
                required
              />

            </div>

            {error && (
              <p
                style={{
                  color: '#d93025',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                {error}
              </p>
            )}

            {message && (
              <p
                style={{
                  color: '#188038',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="primary-btn auth-submit"
            >
              Continue →
            </button>

          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-register">

            Remember your password?

            <Link to="/login">
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default ForgotPassword