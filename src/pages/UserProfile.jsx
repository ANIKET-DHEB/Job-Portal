import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserProfile.css";

import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGraduationCap,
    FaBriefcase,
    FaTools,
    FaGithub,
    FaLinkedin,
    FaGlobe,
    FaFilePdf,
    FaEdit,
} from "react-icons/fa";

function UserProfile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        fullName: "Loading...",
        email: "",
        phone: "",
        location: "",
        qualification: "",
        experience: "",
        skills: "",
        about: "",
        github: "",
        linkedin: "",
        portfolio: "",
        resume: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) return;

            const res = await axios.get(
                `https://job-portal-backend-qlnk.onrender.com /api/profile/${user._id}`
            );

            setProfile({
                ...res.data.profile,
                email: user.email,
            });
        } catch (err) {
            console.log("Profile Fetch Error:", err);
        }
    }

    return (
        <div className="user-profile-page">
            <div className="profile-banner"></div>

            <div className="profile-card">
                <div className="profile-image">
                    <img
                        src={
                            profile.profileImage
                                ? `https://job-portal-backend-qlnk.onrender.com ${profile.profileImage}`
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    profile.fullName
                                )}&background=2563eb&color=fff&size=200`
                        }
                        alt="Profile"
                    />
                </div>

                <h1>{profile.fullName}</h1>

                <p className="designation">{profile.experience}</p>

                <button
                    className="edit-btn"
                    onClick={() => navigate("/edit-profile")}
                >
                    <FaEdit />
                    Edit Profile
                </button>

                <div className="profile-grid">
                    <div className="info-box">
                        <FaEnvelope />
                        <span>{profile.email}</span>
                    </div>

                    <div className="info-box">
                        <FaPhone />
                        <span>{profile.phone}</span>
                    </div>

                    <div className="info-box">
                        <FaMapMarkerAlt />
                        <span>{profile.location}</span>
                    </div>

                    <div className="info-box">
                        <FaGraduationCap />
                        <span>{profile.qualification}</span>
                    </div>

                    <div className="info-box">
                        <FaBriefcase />
                        <span>{profile.experience}</span>
                    </div>

                    <div className="info-box">
                        <FaTools />
                        <span>{profile.skills}</span>
                    </div>
                </div>

                <div className="about-box">
                    <h2>About Me</h2>
                    <p>{profile.about}</p>
                </div>

                <div className="links-box">
                    <h2>Professional Links</h2>

                    {profile.github && (
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub />
                            <span>View GitHub</span>
                        </a>
                    )}

                    {profile.linkedin && (
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaLinkedin />
                            <span>View LinkedIn</span>
                        </a>
                    )}

                    {profile.portfolio && (
                        <a
                            href={profile.portfolio}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGlobe />
                            <span>View Portfolio</span>
                        </a>
                    )}

                    {profile.resume && (
                        <a
                            href={`https://job-portal-backend-qlnk.onrender.com ${profile.resume}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaFilePdf />
                            <span>View Resume</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;

