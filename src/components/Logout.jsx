function Logout() {
  const handleLogout = () => {
    // Remove active login session
    localStorage.removeItem('currentUser')
    localStorage.removeItem('rememberMe')

    // Go to login with a full page reload
    window.location.replace('/login')
  }

  return (
    <button
      type="button"
      className="logout-button"
      onClick={handleLogout}
    >
      <span>🚪</span>
      Logout
    </button>
  )
}

export default Logout