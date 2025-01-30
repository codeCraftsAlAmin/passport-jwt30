import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  // get user token and fetch user profile data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://passport-jwt30.onrender.com/profile", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setProfile(res.data.user);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          navigate("/");
        });
    }
  }, []);

  // User logout
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        {profile ? (
          <>
            <img
              src="/default-avatar.png"
              alt="Profile Avatar"
              className="profile-avatar"
              width={80}
              height={80}
            />
            <h1>{profile.username}</h1>
          </>
        ) : (
          <Skeleton circle width={80} height={80} />
        )}
      </div>

      <div className="profile-content">
        {profile ? (
          <div className="profile-section">
            <h2>Personal Information</h2>
            <div className="info-group">
              <label>Email:</label>
              <span>{profile.email}</span>
            </div>
            <div className="info-group">
              <label>Username:</label>
              <span>{profile.username}</span>
            </div>
            <div className="info-group">
              <label>Location:</label>
              <span>{profile.location || "Not provided"}</span>
            </div>
            <div className="info-group">
              <label>Member Since:</label>
              <span>{profile.memberSince || "N/A"}</span>
            </div>
            <div className="info-group">
              <label>Role:</label>
              <span>{profile.role || "N/A"}</span>
            </div>
            <button className="logout-button" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        ) : (
          // Skeleton for loading state
          <>
            <Skeleton width={200} height={30} />
            <Skeleton width={300} height={20} style={{ marginTop: "10px" }} />
            <Skeleton width={300} height={20} style={{ marginTop: "10px" }} />
            <Skeleton width={300} height={20} style={{ marginTop: "10px" }} />
            <Skeleton width={300} height={20} style={{ marginTop: "10px" }} />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
