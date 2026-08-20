import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import '../App.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // DEBUG: Confirm this file is running
    console.log('🔥 FORGOT PASSWORD FILE IS RUNNING')

    setMessage('')
    setError('')
    setLoading(true)

    try {
      const redirectUrl =
        `${window.location.origin}/reset-password`

      console.log('📧 RESET PASSWORD EMAIL:', email.trim())
      console.log('🔗 RESET REDIRECT URL:', redirectUrl)

      const { data, error } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: redirectUrl,
          }
        )

      console.log('📦 RESET PASSWORD RESPONSE:', {
        data,
        error,
      })

      if (error) {
        console.error(
          '❌ Password reset error:',
          error
        )

        setError(error.message)
        setLoading(false)
        return
      }

      console.log(
        '✅ Password reset email request completed successfully'
      )

      setMessage(
        'Password reset email sent! Please check your email and click the reset link.'
      )

      setLoading(false)
    } catch (err) {
      console.error(
        '❌ Unexpected error:',
        err
      )

      setError(
        'Something went wrong. Please try again.'
      )

      setLoading(false)
    }
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

            {/* Error message */}
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

            {/* Success message */}
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
              disabled={loading}
            >
              {loading
                ? 'Sending...'
                : 'Continue →'}
            </button>

          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-register">

            Remember your password?{' '}

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