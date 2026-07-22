function Profile() {
  const userName =
    localStorage.getItem("userName");

  const userEmail =
    localStorage.getItem("userEmail");

  return (
    <div className="content">
      <div className="form-container">
        <div className="profile-card">
          <div className="profile-icon">
            👨🏻‍💼
          </div>

          <h2>User Profile</h2>

          <br />

          <p>
            <strong>Name:</strong>{" "}
            {userName}
          </p>

          <br />

          <p>
            <strong>Email:</strong>{" "}
            {userEmail}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
``