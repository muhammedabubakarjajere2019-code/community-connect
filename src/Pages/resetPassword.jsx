import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

function ResetPassword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const savedUser = JSON.parse(
      localStorage.getItem('communityUser')
    )

    if (!savedUser) {
      setError('No account found.')
      return
    }

    const updatedUser = {
      ...savedUser,
      password: password,
    }

    localStorage.setItem(
      'communityUser',
      JSON.stringify(updatedUser)
    )

    alert('Password reset successfully!')

    navigate('/login')
  }

  return (
    <div className="auth-page">

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
            Create a new
            <span> password.</span>
          </h1>

          <p>
            Choose a new password for your Community Connect account.
          </p>

        </div>

      </div>

      <div className="auth-form-container">

        <div className="auth-form">

          <Link to="/login" className="mobile-back">
            ← Back to login
          </Link>

          <div className="form-heading">

            <h2>
              Reset password 🔐
            </h2>

            <p>
              Enter your new password below.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="new-password">
                New password
              </label>

              <input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="confirm-new-password">
                Confirm new password
              </label>

              <input
                id="confirm-new-password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
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

            <button
              type="submit"
              className="primary-btn auth-submit"
            >
              Reset Password →
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

export default ResetPassword