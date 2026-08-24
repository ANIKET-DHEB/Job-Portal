const Application = require("../models/Application");
const Job = require("../models/Job");
const nodemailer = require("nodemailer");
require("dotenv").config();

// ===============================
// EMAIL TRANSPORTER
// ===============================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: String(process.env.EMAIL_PASS || "").replace(/\s/g, ""),
  },
});

// ===============================
// VERIFY EMAIL CONNECTION
// ===============================

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ EMAIL CONFIGURATION ERROR:");
    console.log(error.message);
  } else {
    console.log("✅ EMAIL SERVER READY");
  }
});

// ===============================
// Apply for a Job
// ===============================

const applyJob = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      coverLetter,
      jobId,
    } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    console.log("CHECK APPLICATION:", {
      userId: req.user.id,
      jobId: jobId,
    });

    // ===============================
    // CHECK DUPLICATE APPLICATION
    // ===============================

    const existingApplication = await Application.findOne({
      userId: req.user.id,
      jobId: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // ===============================
    // RESUME
    // ===============================

    let resumePath = "";

    if (req.file) {
      resumePath = `/uploads/resumes/${req.file.filename}`;
    } else if (req.body.resume) {
      resumePath = req.body.resume;
    }

    // ===============================
    // CREATE APPLICATION
    // ===============================

    const application = await Application.create({
      userId: req.user.id,
      fullName,
      email,
      phone,
      resume: resumePath,
      coverLetter,
      jobId,
    });

    // ===============================
    // GET JOB DETAILS
    // ===============================

    let jobTitle = "Job";
    let companyName = "Company";

    try {
      const job = await Job.findById(jobId);

      if (job) {
        jobTitle = job.title || "Job";
        companyName = job.company || "Company";
      }
    } catch (jobError) {
      console.log(
        "JOB DETAILS ERROR:",
        jobError.message
      );
    }

    // ===============================
    // SEND APPLICATION EMAIL
    // DO NOT WAIT FOR EMAIL
    // ===============================

    transporter
      .sendMail({
        from: `"Job Portal" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Application Received - ${jobTitle}`,
        html: `
          <div style="margin:0;padding:30px 15px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
            <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

              <div style="background:#2563eb;padding:25px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:26px;">
                  🎉 Application Received
                </h1>
              </div>

              <div style="padding:30px;">

                <p style="margin:0 0 15px;color:#334155;font-size:16px;">
                  Hi <strong>${fullName}</strong>,
                </p>

                <p style="color:#475569;font-size:15px;line-height:1.7;">
                  Thank you for applying through our Job Portal.
                  Your application has been successfully received.
                </p>

                <div style="margin:25px 0;padding:20px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">

                  <p style="margin:8px 0;color:#334155;">
                    <strong>Job:</strong> ${jobTitle}
                  </p>

                  <p style="margin:8px 0;color:#334155;">
                    <strong>Company:</strong> ${companyName}
                  </p>

                  <p style="margin:8px 0;color:#334155;">
                    <strong>Applicant:</strong> ${fullName}
                  </p>

                  <p style="margin:8px 0;color:#334155;">
                    <strong>Email:</strong> ${email}
                  </p>

                </div>

                <p style="color:#475569;font-size:15px;line-height:1.7;">
                  Our team will review your application.
                  If your profile is shortlisted, you will be contacted
                  with the next steps.
                </p>

                <div style="margin-top:30px;padding-top:20px;border-top:1px solid #e2e8f0;">

                  <p style="margin:0;color:#64748b;font-size:14px;">
                    Best regards,
                  </p>

                  <p style="margin:5px 0 0;color:#2563eb;font-size:15px;font-weight:bold;">
                    Job Portal Team
                  </p>

                </div>

              </div>
            </div>
          </div>
        `,
      })
      .then(() => {
        console.log(
          "✅ APPLICATION EMAIL SENT TO:",
          email
        );
      })
      .catch((emailError) => {
        console.log(
          "❌ EMAIL ERROR:",
          emailError.message
        );
      });

    // ===============================
    // RESPOND IMMEDIATELY
    // ===============================

    return res.status(201).json({
      success: true,
      message: "Application Submitted Successfully 🎉",
      application,
    });

  } catch (error) {
    console.log(
      "APPLICATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Applications
// ===============================

const getApplications = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    let query = {};

    if (req.user.role === "admin") {
      query = {};
    } else {
      query = {
        userId: req.user.id,
      };
    }

    const applications = await Application.find(query)
      .populate(
        "jobId",
        "title company location salary jobType"
      )
      .populate(
        "userId",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.log(
      "GET APPLICATIONS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Single Application
// ===============================

const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(
      req.params.id
    )
      .populate(
        "jobId",
        "title company location salary jobType"
      )
      .populate(
        "userId",
        "name email"
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      application.userId?._id.toString() !==
        req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to view this application.",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.log(
      "GET APPLICATION ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Application Status
// ===============================

const updateApplicationStatus = async (req, res) => {
  try {
    // ===============================
    // Check Admin
    // ===============================

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Only admin can update application status.",
      });
    }

    const { status } = req.body;

    // ===============================
    // Allowed Statuses
    // ===============================

    const allowedStatuses = [
      "Pending",
      "Reviewed",
      "Shortlisted",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    // ===============================
    // Find Application
    // ===============================

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // ===============================
    // Store Old Status
    // ===============================

    const oldStatus = application.status;

    // ===============================
    // Prevent Duplicate Status Email
    // ===============================

    const statusChanged = oldStatus !== status;

    // ===============================
    // Update Status
    // ===============================

    application.status = status;

    await application.save();

    // ===============================
    // Get Job Details
    // ===============================

    let jobTitle = "Job";
    let companyName = "Company";

    try {
      const job = await Job.findById(
        application.jobId
      );

      if (job) {
        jobTitle = job.title || "Job";
        companyName = job.company || "Company";
      }
    } catch (jobError) {
      console.log(
        "JOB DETAILS ERROR:",
        jobError.message
      );
    }

    // ===============================
    // SHORTLISTED EMAIL
    // ===============================

    if (
      status === "Shortlisted" &&
      statusChanged &&
      application.email
    ) {
      try {
        await transporter.sendMail({
          from: `"Job Portal" <${process.env.EMAIL_USER}>`,
          to: application.email,
          subject:
            `🎉 You Have Been Shortlisted - ${jobTitle}`,
          html: `
            <div style="margin:0;padding:30px 15px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
              <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

                <div style="background:#16a34a;padding:25px;text-align:center;">
                  <h1 style="margin:0;color:#ffffff;font-size:26px;">
                    🎉 Congratulations!
                  </h1>

                  <p style="margin:8px 0 0;color:#ffffff;font-size:16px;">
                    Your application has been shortlisted
                  </p>
                </div>

                <div style="padding:30px;">

                  <p style="margin:0 0 15px;color:#334155;font-size:16px;">
                    Hi <strong>${application.fullName}</strong>,
                  </p>

                  <p style="color:#475569;font-size:15px;line-height:1.7;">
                    We are pleased to inform you that your application has been shortlisted for the following position.
                  </p>

                  <div style="margin:25px 0;padding:20px;background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;">

                    <p style="margin:8px 0;color:#334155;">
                      <strong>Job:</strong> ${jobTitle}
                    </p>

                    <p style="margin:8px 0;color:#334155;">
                      <strong>Company:</strong> ${companyName}
                    </p>

                    <p style="margin:8px 0;color:#334155;">
                      <strong>Applicant:</strong> ${application.fullName}
                    </p>

                    <p style="margin:8px 0;color:#334155;">
                      <strong>Status:</strong>

                      <span style="color:#16a34a;font-weight:bold;">
                        Shortlisted
                      </span>
                    </p>

                  </div>

                  <p style="color:#475569;font-size:15px;line-height:1.7;">
                    Congratulations on reaching the next stage of our hiring process. Your profile has been reviewed by our recruitment team and we found your application suitable for this position.
                  </p>

                  <p style="color:#475569;font-size:15px;line-height:1.7;">
                    Our team will contact you shortly with further details regarding the next steps, interview schedule, or any additional information required from you.
                  </p>

                  <div style="margin:25px 0;padding:18px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;">

                    <p style="margin:0;color:#475569;font-size:14px;line-height:1.6;">
                      <strong>Important:</strong>
                      Please keep checking your email and phone for further communication from our recruitment team.
                    </p>

                  </div>

                  <p style="color:#475569;font-size:15px;line-height:1.7;">
                    We appreciate your interest in this opportunity and wish you the very best for the next stage.
                  </p>

                  <div style="margin-top:30px;padding-top:20px;border-top:1px solid #e2e8f0;">

                    <p style="margin:0;color:#64748b;font-size:14px;">
                      Best regards,
                    </p>

                    <p style="margin:5px 0 0;color:#2563eb;font-size:15px;font-weight:bold;">
                      Job Portal Team
                    </p>

                  </div>

                </div>
              </div>
            </div>
          `,
        });

        console.log(
          "✅ SHORTLISTED EMAIL SENT TO:",
          application.email
        );
      } catch (emailError) {
        console.log(
          "❌ SHORTLISTED EMAIL ERROR:",
          emailError.message
        );
      }
    }

    // ===============================
    // REJECTION EMAIL
    // ===============================

    if (
      status === "Rejected" &&
      statusChanged &&
      application.email
    ) {
      try {
        await transporter.sendMail({
          from: `"Job Portal" <${process.env.EMAIL_USER}>`,
          to: application.email,
          subject:
            `Application Update - ${jobTitle}`,
          html: `
            <div style="margin:0;padding:30px 15px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
              <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

                <div style="background:#dc2626;padding:25px;text-align:center;">
                  <h1 style="margin:0;color:#ffffff;font-size:26px;">
                    Application Update
                  </h1>
                </div>

                <div style="padding:30px;">

                  <p style="margin:0 0 15px;color:#334155;font-size:16px;">
                    Hi <strong>${application.fullName}</strong>,
                  </p>

                  <p style="color:#475569;font-size:15px;line-height:1.7;">
                    Thank you for taking the time to apply through our Job Portal.
                  </p>

                  <div style="margin:25px 0;padding:20px;background:#fef2f2;border-radius:12px;border:1px solid #fecaca;">

                    <p style="margin:8px 0;color:#334155;">
                      <strong>Job:</strong> ${jobTitle}
                    </p>

                    <p style="margin:8px 0;color:#334155;">
                      <strong>Company:</strong> ${companyName}
                    </p>

                    <p style="margin:8px 0;color:#334155;">
                      <strong>Status:</strong>

                      <span style="color:#dc2626;font-weight:bold;">
                        Rejected
                      </span>
                    </p>

                  </div>

                  <p style="color:#475569;font-size:15px;line-height:1.7;">
                    After careful consideration, we regret to inform you that your application was not selected for this position at this time.
                  </p>

                  <p style="color:#475569;font-size:15px;line-height:1.7;">
                    We appreciate your interest in our Job Portal and encourage you to apply for other suitable opportunities in the future.
                  </p>

                  <div style="margin-top:30px;padding-top:20px;border-top:1px solid #e2e8f0;">

                    <p style="margin:0;color:#64748b;font-size:14px;">
                      Best regards,
                    </p>

                    <p style="margin:5px 0 0;color:#2563eb;font-size:15px;font-weight:bold;">
                      Job Portal Team
                    </p>

                  </div>

                </div>
              </div>
            </div>
          `,
        });

        console.log(
          "✅ REJECTION EMAIL SENT TO:",
          application.email
        );
      } catch (emailError) {
        console.log(
          "❌ REJECTION EMAIL ERROR:",
          emailError.message
        );
      }
    }

    // ===============================
    // Populate Application
    // ===============================

    const updatedApplication =
      await Application.findById(
        application._id
      )
        .populate(
          "jobId",
          "title company location salary jobType"
        )
        .populate(
          "userId",
          "name email"
        );

    // ===============================
    // Response
    // ===============================

    let responseMessage =
      "Application status updated successfully";

    if (
      status === "Shortlisted" &&
      statusChanged
    ) {
      responseMessage =
        "Application shortlisted and email sent successfully.";
    }

    if (
      status === "Rejected" &&
      statusChanged
    ) {
      responseMessage =
        "Application rejected and email sent successfully.";
    }

    if (!statusChanged) {
      responseMessage =
        "Application status is already " +
        status +
        ".";
    }

    res.status(200).json({
      success: true,
      message: responseMessage,
      application: updatedApplication,
    });

  } catch (error) {
    console.log(
      "UPDATE STATUS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Application
// ===============================

const deleteApplication = async (req, res) => {
  try {
    const application =
      await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      application.userId.toString() !==
        req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to delete this application.",
      });
    }

    await Application.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Application deleted successfully",
    });

  } catch (error) {
    console.log(
      "DELETE APPLICATION ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Export
// ===============================

module.exports = {
  applyJob,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};