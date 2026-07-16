function Profile() {
  const userName =
    localStorage.getItem("userName");

  const userEmail =
    localStorage.getItem("userEmail");

  return (
    <div className="content">
      <div className="form-container">
        <div className="book-card">
          <div className="profile-icon">
            👤
          </div>

          <h2>User Profile</h2>

          <br />

          <p>
            <strong>Name:</strong>{" "}
            {userName || "Not Available"}
          </p>

          <br />

          <p>
            <strong>Email:</strong>{" "}
            {userEmail || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;