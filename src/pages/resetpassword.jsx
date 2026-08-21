import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/SupabaseClient'
import '../App.css'

function ResetPassword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true

    const initializeRecovery = async () => {
      console.log('🔐 Reset password page loaded')
      console.log('Current URL:', window.location.href)

      // PKCE: Supabase will detect ?code= automatically
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (!mounted) return

      if (sessionError) {
        console.error(
          'Session error:',
          sessionError
        )

        setError(
          'Unable to verify the reset link. Please request a new one.'
        )

        return
      }

      if (session) {
        console.log(
          '✅ Recovery session found'
        )

        setReady(true)
      } else {
        console.log(
          '⏳ Waiting for recovery session...'
        )
      }
    }

    // Listen for Supabase authentication events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(
          'Supabase Auth Event:',
          event
        )

        if (!mounted) return

        if (
          event === 'PASSWORD_RECOVERY' &&
          session
        ) {
          console.log(
            '✅ PASSWORD_RECOVERY session received'
          )

          setReady(true)
          setError('')
        }

        if (
          event === 'SIGNED_IN' &&
          session
        ) {
          console.log(
            '✅ Session received'
          )

          setReady(true)
        }
      }
    )

    initializeRecovery()

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (password.length < 6) {
      setError(
        'Password must be at least 6 characters.'
      )
      return
    }

    if (password !== confirmPassword) {
      setError(
        'Passwords do not match.'
      )
      return
    }

    setLoading(true)

    try {
      const { error } =
        await supabase.auth.updateUser({
          password,
        })

      if (error) {
        console.error(
          'Password update error:',
          error
        )

        setError(error.message)
        setLoading(false)
        return
      }

      alert(
        'Password updated successfully!'
      )

      await supabase.auth.signOut()

      navigate('/login')
    } catch (err) {
      console.error(
        'Unexpected error:',
        err
      )

      setError(
        'Something went wrong. Please try again.'
      )
    }

    setLoading(false)
  }

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-brand">

        <Link
          to="/"
          className="auth-logo"
        >
          <div className="brand-icon">
            C
          </div>

          <span>
            Community Connect
          </span>
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
            Choose a new password for your
            Community Connect account.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="auth-form-container">

        <div className="auth-form">

          <Link
            to="/login"
            className="mobile-back"
          >
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

          {error && (
            <p
              style={{
                color: '#d93025',
                marginBottom: '10px',
                textAlign: 'center',
              }}
            >
              {error}
            </p>
          )}

          {ready ? (
            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label htmlFor="new-password">
                  New password
                </label>

                <input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  minLength={6}
                  required
                  placeholder="Enter your new password"
                />

              </div>

              <div className="form-group">

                <label htmlFor="confirm-new-password">
                  Confirm new password
                </label>

                <input
                  id="confirm-new-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  minLength={6}
                  required
                  placeholder="Confirm your new password"
                />

              </div>

              <button
                type="submit"
                className="primary-btn auth-submit"
                disabled={loading}
              >
                {loading
                  ? 'Resetting...'
                  : 'Reset Password →'}
              </button>

            </form>
          ) : (
            <p
              style={{
                textAlign: 'center',
                color: '#666',
                marginTop: '20px',
              }}
            >
              Verifying your password recovery link...
            </p>
          )}

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

export default ResetPassword