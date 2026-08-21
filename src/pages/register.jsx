import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from "../lib/SupabaseClient";
import '../App.css'
import registerImage from './images/community-register.png'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    communityType: '',
    password: '',
    confirmPassword: '',
  })
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => { // MAKE IT ASYNC
    e.preventDefault()

    if (!form.name || !form.email || !form.phone || !form.communityType || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (!agree) {
      setError('Please agree to the Community Connect terms.')
      return
    }

    setLoading(true)

    // 1. CREATE USER IN SUPABASE AUTH
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { // This saves extra info to user_metadata
          full_name: form.name,
          phone: form.phone,
          community_type: form.communityType,
        }
      }
    })

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    // 2. ALSO SAVE TO 'profiles' TABLE IF YOU HAVE ONE
    if (data.user) {
      await supabase.from('profiles').insert([{
        id: data.user.id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        community_type: form.communityType
      }])
    }

    alert('Account created successfully! Please check your email to confirm, then login.')
    navigate('/login')
  }

  return (
    <div className="auth-page register-page">
      {/* LEFT SIDE - KEEP ALL YOUR STUFF */}
      <section className="auth-brand register-brand">
        <Link to="/" className="auth-logo">
          <div className="brand-icon">C</div>
          <span>Community Connect</span>
        </Link>
        <div className="auth-message register-message">
          <div className="auth-symbol">🌍</div>
          <h1>Build your<span> community.</span></h1>
          <p>Create your Community Connect account and start bringing people together through meaningful activities, events and announcements.</p>
          <div className="auth-points">
            <div><span>✓</span>Create and manage communities</div>
            <div><span>✓</span>Organize community events</div>
            <div><span>✓</span>Share important announcements</div>
          </div>
        </div>
        <div className="register-image-wrapper">
          <img src={registerImage} alt="Community Connect" className="auth-community-image" />
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="auth-form-container register-form-container">
        <div className="auth-form">
          <Link to="/" className="mobile-back">← Back to home</Link>
          <div className="form-heading">
            <h2>Create an account ✨</h2>
            <p>Join Community Connect today.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" placeholder="Enter your full name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email address</label>
              <input id="register-email" name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input id="phone" name="phone" type="tel" placeholder="Enter your phone number" value={form.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="community-type">Community type</label>
              <select id="community-type" name="communityType" value={form.communityType} onChange={handleChange} required>
                <option value="">Select community type</option>
                <option value="Muslim">🕌 Muslim Community</option>
                <option value="Christian">⛪ Christian Community</option>
                <option value="General">🤝 General Community</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input id="register-password" name="password" type="password" placeholder="Create a password" value={form.password} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm password</label>
              <input id="confirm-password" name="confirmPassword" type="password" placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} required />
            </div>

            <label className="remember">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <span>I agree to the Community Connect terms.</span>
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="primary-btn auth-submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account →'}
            </button>
          </form>

          <div className="auth-divider"><span>OR</span></div>
          <p className="auth-register">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Register