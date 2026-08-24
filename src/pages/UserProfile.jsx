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
        profileImage: "",
    });

    const [imageError, setImageError] = useState(false);

    // ==========================================
    // FETCH PROFILE
    // ==========================================

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user) {
                console.log("No logged-in user found.");
                return;
            }

            console.log(
                "Logged-in User:",
                user
            );

            const res = await axios.get(
                `https://job-portal-backend-qlnk.onrender.com/api/profile/${user._id}`
            );

            console.log(
                "PROFILE RESPONSE:",
                res.data
            );

            const profileData =
                res.data.profile || {};

            setProfile({
                fullName:
                    profileData.fullName ||
                    user.name ||
                    "User",

                email:
                    user.email ||
                    profileData.email ||
                    "",

                phone:
                    profileData.phone || "",

                location:
                    profileData.location || "",

                qualification:
                    profileData.qualification || "",

                experience:
                    profileData.experience || "",

                skills:
                    profileData.skills || "",

                about:
                    profileData.about || "",

                github:
                    profileData.github || "",

                linkedin:
                    profileData.linkedin || "",

                portfolio:
                    profileData.portfolio || "",

                resume:
                    profileData.resume || "",

                profileImage:
                    profileData.profileImage ||
                    "",
            });

            // Reset image error after profile loads
            setImageError(false);

        } catch (err) {
            console.log(
                "Profile Fetch Error:",
                err
            );
        }
    }

    // ==========================================
    // PROFILE IMAGE URL
    // ==========================================

    const getProfileImageUrl = () => {

        // No image saved
        if (
            !profile.profileImage ||
            imageError
        ) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile.fullName || "User"
            )}&background=2563eb&color=fff&size=200`;
        }

        // Already a complete URL
        if (
            profile.profileImage.startsWith(
                "http://"
            ) ||
            profile.profileImage.startsWith(
                "https://"
            )
        ) {
            return profile.profileImage;
        }

        // Backend stored relative path
        return `https://job-portal-backend-qlnk.onrender.com${
            profile.profileImage.startsWith("/")
                ? profile.profileImage
                : `/${profile.profileImage}`
        }`;
    };

    // ==========================================
    // HANDLE IMAGE ERROR
    // ==========================================

    const handleImageError = () => {
        console.log(
            "PROFILE IMAGE FAILED:",
            profile.profileImage
        );

        setImageError(true);
    };

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="user-profile-page">

            {/* ==========================================
                PROFILE BANNER
            ========================================== */}

            <div className="profile-banner"></div>

            {/* ==========================================
                PROFILE CARD
            ========================================== */}

            <div className="profile-card">

                {/* ======================================
                    PROFILE IMAGE
                ====================================== */}

                <div className="profile-image">

                    <img
                        src={getProfileImageUrl()}
                        alt="Profile"
                        onError={
                            handleImageError
                        }
                    />

                </div>

                {/* ======================================
                    NAME
                ====================================== */}

                <h1>
                    {profile.fullName}
                </h1>

                {/* ======================================
                    DESIGNATION / EXPERIENCE
                ====================================== */}

                <p className="designation">
                    {profile.experience ||
                        "Job Seeker"}
                </p>

                {/* ======================================
                    EDIT PROFILE
                ====================================== */}

                <button
                    className="edit-btn"
                    onClick={() =>
                        navigate(
                            "/edit-profile"
                        )
                    }
                >
                    <FaEdit />
                    Edit Profile
                </button>

                {/* ======================================
                    PROFILE INFORMATION
                ====================================== */}

                <div className="profile-grid">

                    {/* Email */}

                    <div className="info-box">

                        <FaEnvelope />

                        <span>
                            {profile.email ||
                                "N/A"}
                        </span>

                    </div>

                    {/* Phone */}

                    <div className="info-box">

                        <FaPhone />

                        <span>
                            {profile.phone ||
                                "N/A"}
                        </span>

                    </div>

                    {/* Location */}

                    <div className="info-box">

                        <FaMapMarkerAlt />

                        <span>
                            {profile.location ||
                                "N/A"}
                        </span>

                    </div>

                    {/* Qualification */}

                    <div className="info-box">

                        <FaGraduationCap />

                        <span>
                            {profile.qualification ||
                                "N/A"}
                        </span>

                    </div>

                    {/* Experience */}

                    <div className="info-box">

                        <FaBriefcase />

                        <span>
                            {profile.experience ||
                                "N/A"}
                        </span>

                    </div>

                    {/* Skills */}

                    <div className="info-box">

                        <FaTools />

                        <span>
                            {profile.skills ||
                                "N/A"}
                        </span>

                    </div>

                </div>

                {/* ======================================
                    ABOUT ME
                ====================================== */}

                <div className="about-box">

                    <h2>
                        About Me
                    </h2>

                    <p>
                        {profile.about ||
                            "No information added yet."}
                    </p>

                </div>

                {/* ======================================
                    PROFESSIONAL LINKS
                ====================================== */}

                <div className="links-box">

                    <h2>
                        Professional Links
                    </h2>

                    {/* GitHub */}

                    {profile.github && (

                        <a
                            href={
                                profile.github
                            }
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub />

                            <span>
                                View GitHub
                            </span>

                        </a>

                    )}

                    {/* LinkedIn */}

                    {profile.linkedin && (

                        <a
                            href={
                                profile.linkedin
                            }
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaLinkedin />

                            <span>
                                View LinkedIn
                            </span>

                        </a>

                    )}

                    {/* Portfolio */}

                    {profile.portfolio && (

                        <a
                            href={
                                profile.portfolio
                            }
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGlobe />

                            <span>
                                View Portfolio
                            </span>

                        </a>

                    )}

                    {/* Resume */}

                    {profile.resume && (

                        <a
                            href={
                                profile.resume.startsWith(
                                    "http://"
                                ) ||
                                profile.resume.startsWith(
                                    "https://"
                                )
                                    ? profile.resume
                                    : `https://job-portal-backend-qlnk.onrender.com${
                                          profile.resume.startsWith(
                                              "/"
                                          )
                                              ? profile.resume
                                              : `/${profile.resume}`
                                      }`
                            }
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaFilePdf />

                            <span>
                                View Resume
                            </span>

                        </a>

                    )}

                    {/* No links */}

                    {!profile.github &&
                        !profile.linkedin &&
                        !profile.portfolio &&
                        !profile.resume && (

                            <p>
                                No professional
                                links added yet.
                            </p>

                        )}

                </div>

            </div>

        </div>
    );
}

export default UserProfile;