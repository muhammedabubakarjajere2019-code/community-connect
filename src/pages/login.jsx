import { useState, useEffect } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from "../lib/supabaseClient";
import communityImage from './images/community.png'
import '../App.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // FIXED: Auto redirect if user is already logged in
  // FIXED: Auto redirect if user is already logged in
useEffect(() => {
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      navigate('/communities')
    }
  }
  checkSession()
}, [navigate])

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email first in the email field')
      return
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Password reset link sent! Check your email inbox.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    if (data.user) {
      alert('Login successful!')
      navigate('/communities')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <Link to="/" className="auth-logo">
          <div className="brand-icon">C</div>
          <span>Community Connect</span>
        </Link>
        <div className="auth-message">
          <div className="auth-symbol">🤝</div>
          <h1>Welcome back to<span> Community Connect</span></h1>
          <p>Stay connected with your community, discover events, receive announcements and participate in meaningful activities.</p>
          <div className="auth-points">
            <div><span>✓</span>Connect with your community</div>
            <div><span>✓</span>Discover upcoming events</div>
            <div><span>✓</span>Stay informed with announcements</div>
          </div>
        </div>
        <div className="auth-image-wrapper">
          <img src={communityImage} alt="Community Connect" className="auth-community-image" />
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-form">
          <Link to="/" className="mobile-back">← Back to home</Link>
          <div className="form-heading">
            <h2>Welcome back 👋</h2>
            <p>Sign in to your Community Connect account.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  style={{background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: '14px', fontWeight: '500'}}
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                required
              />
            </div>

            <label className="remember">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span>Remember me</span>
            </label>

            {error && <p style={{ color: '#d93025', marginTop: '10px', marginBottom: '10px' }}>{error}</p>}

            <button type="submit" className="primary-btn auth-submit" disabled={loading}>
              {loading? 'Signing In...' : 'Sign In →'}
            </button>
          </form>

          <div className="auth-divider"><span>OR</span></div>
          <p className="auth-register">
            Don't have an account?
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login