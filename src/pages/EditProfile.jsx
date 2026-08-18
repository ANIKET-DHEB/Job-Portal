import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    qualification: "",
    experience: "",
    skills: "",
    about: "",
    github: "https://github.com/ANIKET-DHEB/NAMASTE-REACT",
    linkedin: "https://www.linkedin.com/in/aniket-dheb-569195283",
    portfolio: "https://namaste-react-fzgb.vercel.app/",
    resume: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const res = await axios.get(
        `http://localhost:5000/api/profile/${user._id}`
      );

      setProfile({
        ...res.data.profile,
        email: user.email,
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (files) {
      setProfile({
        ...profile,
        [name]: files[0],
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      const formData = new FormData();

      formData.append("fullName", profile.fullName);
      formData.append("phone", profile.phone);
      formData.append("location", profile.location);
      formData.append("qualification", profile.qualification);
      formData.append("experience", profile.experience);
      formData.append("skills", profile.skills);
      formData.append("about", profile.about);
      formData.append("github", profile.github);
      formData.append("linkedin", profile.linkedin);
      formData.append("portfolio", profile.portfolio);

      if (profile.profileImage instanceof File) {
        formData.append("profileImage", profile.profileImage);
      }

      if (profile.resume instanceof File) {
        formData.append("resume", profile.resume);
      }

      await axios.put(
        `http://localhost:5000/api/profile/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Profile Updated Successfully");

      navigate("/profile");
    } catch (err) {
      console.log("UPDATE PROFILE ERROR:", err);
      console.log("SERVER RESPONSE:", err.response?.data);

      alert(
        err.response?.data?.message ||
        err.message ||
        "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">

        <h1>Edit Profile</h1>
        <p>Update your professional information.</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={profile.email}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Qualification</label>
            <input
              type="text"
              name="qualification"
              value={profile.qualification}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>About</label>
            <textarea
              rows="5"
              name="about"
              value={profile.about}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>GitHub</label>
            <input
              type="text"
              name="github"
              value={profile.github}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Portfolio</label>
            <input
              type="text"
              name="portfolio"
              value={profile.portfolio}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Profile Image</label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Resume (PDF)</label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditProfile;

