import type { Resume } from "@/types/resume.type";
import type {
    Profile,
    User,
} from "@/types/user.type";
import { forwardRef } from "react";
import "../../styles/resume.css"

interface ResumePreviewProps {
    resume: Resume;
    profile?: Profile;
    user?: User;
    className ?: string,
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
    (
        {
            resume,
            profile,
            user,
            className = "",
        },
        ref
    ) => {

    if( !resume || !profile || !user ) {
        return(
            <h1> Missing Fields </h1>
        )
    }

    const formatDate = (
        date?: string | Date
    ) => {
        if (!date) return "";

        return new Date(
            date
        ).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div 
            ref={ref}
            className={`bg-gray-200 ${className}`}>
            <div className="bg-white w-[210mm] max-w-full min-h-[297mm] mx-auto shadow-lg ">
                <div className="w-full text-black p-12 leading-relaxed text-[15px] font-serif">                
                        <header className="text-center border-b-2 border-black pb-4 mb-6">
                            <h1 className="resume-heading">
                                {user?.name || "Candidate Name"}
                            </h1>

                            <div className="resume-content">
                                {profile?.phoneNo && (
                                    <span>{profile.phoneNo}</span>
                                )}

                                {profile?.phoneNo && user?.email && (
                                    <span>|</span>
                                )}

                                {user?.email && (
                                    <span>{user.email}</span>
                                )}

                                {profile?.location && (
                                    <>
                                        <span>|</span>
                                        <span>{profile.location}</span>
                                    </>
                                )}

                                {profile?.linkedIn && (
                                    <>
                                        <span>|</span>
                                        <a
                                            href={profile.linkedIn}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:underline"
                                        >
                                            LinkedIn
                                        </a>
                                    </>
                                )}

                                {profile?.github && (
                                    <>
                                        <span>|</span>
                                        <a
                                            href={profile.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:underline"
                                        >
                                            GitHub
                                        </a>
                                    </>
                                )}

                                {profile?.portfolio && (
                                    <>
                                        <span>|</span>
                                        <a
                                            href={profile.portfolio}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:underline"
                                        >
                                            Portfolio
                                        </a>
                                    </>
                                )}
                            </div>
                        </header>

                    {/* Experience */}
                    {resume.workExp?.length >
                        0 && (
                        <section className="flex flex-col">
                            <h2 className="resume-heading">
                                Experience
                            </h2>

                            <div className="space-y-6">
                                {resume.workExp.map( ( exp, index ) => (
                                    <div key={ exp._id ?? index }>
                                        <div className="flex flex-row justify-between items-center">
                                            <div>
                                                <h3 className="resume-role">{exp.organisation}</h3>

                                                <p className="resume-role"> {exp.post} </p>
                                                
                                            </div>

                                            <div className="resume-date">
                                                { formatDate( exp.startDate)} {" - "} {formatDate( exp.endDate) ||"Present"}
                                                <p className="text-sm text-gray-500">
                                                    { exp.location} {" "}{" "}{exp.type}
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="resume-list">
                                            {exp.contents.map((point, idx) => (
                                                <li className="resume-list-item" key={idx}> {point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {resume.projects?.length >
                        0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold border-b pb-1 mb-4">
                                Projects
                            </h2>

                            <div className="space-y-6">
                                {resume.projects.map(
                                    (
                                        project,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                project._id ??
                                                index
                                            }
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-lg">
                                                        {
                                                            project.title
                                                        }
                                                    </h3>

                                                    {project.techStack
                                                        ?.length >
                                                        0 && (
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {project.techStack.join(
                                                                " • "
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex gap-3 text-sm">
                                                    {project.githubLink && (
                                                        <a
                                                            href={
                                                                project.githubLink
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            GitHub
                                                        </a>
                                                    )}

                                                    {project.projectLink && (
                                                        <a
                                                            href={
                                                                project.projectLink
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Live
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            <ul className="mt-2 list-disc ml-6 space-y-1">
                                                {project.contents.map((point, idx) => (
                                                    <li key={idx}>
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>

                                            {project.features && (
                                                <div className="mt-2">
                                                    <span className="font-medium">
                                                        Features:
                                                    </span>{" "}
                                                    {
                                                        project.features
                                                    }
                                                </div>
                                            )}

                                            <p className="text-sm text-gray-500 mt-2">
                                                {formatDate(
                                                    project.startDate
                                                )}
                                                {" - "}
                                                {formatDate(
                                                    project.endDate
                                                )}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {resume.skills?.length >
                        0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold border-b pb-1 mb-4">
                                Skills
                            </h2>
                            {
                                resume.skills.map((skill, index) => (
                                    <div
                                        key={skill._id ?? index}
                                        className="flex gap-2"
                                    >
                                        <span className="font-bold min-w-[180px]">
                                            {skill.category}:
                                        </span>

                                        <span>
                                            {skill.values.join(", ")}
                                        </span>
                                    </div>
                            ))}

                            
                        </section>
                    )}

                    {/* Education */}
                    {resume.education?.length >
                        0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold border-b pb-1 mb-4">
                                Education
                            </h2>

                            <div className="space-y-4">
                                {resume.education.map(
                                    (
                                        edu,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                edu._id ??
                                                index
                                            }
                                            className="flex justify-between"
                                        >
                                            <div>
                                                <h1 className="institution font-bold text-lg">
                                                    {
                                                        edu.institution
                                                    }
                                                </h1>

                                                <p className="degree font-semibold">
                                                    {
                                                        edu.degree
                                                    }
                                                </p>

                                                <p className="field-of-study">
                                                    {
                                                        edu.fieldOfStudy
                                                    }
                                                </p>

                                                

                                                <p className="location text-sm text-gray-500">
                                                    {
                                                        edu.location
                                                    }
                                                </p>

                                                {edu.content && (
                                                    <p className="content mt-2">
                                                        {
                                                            edu.content
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="cgpa text-right text-sm">
                                                <p>
                                                    CGPA:{" "}
                                                    {
                                                        edu.cgpa
                                                    }
                                                </p>

                                                <p className="start-end-date">
                                                    {new Date(
                                                        edu.startDate
                                                    ).getFullYear()}
                                                    {" - "}
                                                    {new Date(
                                                        edu.endDate
                                                    ).getFullYear()}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {resume.certifications
                        ?.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold border-b pb-1 mb-4">
                                Certifications
                            </h2>

                            <div className="space-y-4">
                                {resume.certifications.map(
                                    (
                                        cert,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                cert._id ??
                                                index
                                            }
                                        >
                                            <h3 className="font-semibold">
                                                {
                                                    cert.title
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    cert.issuer
                                                }
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {formatDate(
                                                    cert.issueDate
                                                )}
                                            </p>

                                            {cert.url && (
                                                <a
                                                    href={
                                                        cert.url
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View
                                                    Credential
                                                </a>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}

                    {/* Achievements */}
                    {resume.achievements
                        ?.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold border-b pb-1 mb-4">
                                Achievements
                            </h2>

                            <div className="space-y-4">
                                {resume.achievements.map(
                                    (
                                        achievement,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                achievement._id ??
                                                index
                                            }
                                        >
                                            <h3 className="font-semibold">
                                                {
                                                    achievement.title
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    achievement.description
                                                }
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {formatDate(
                                                    achievement.issue_date
                                                )}
                                            </p>

                                            {achievement.url && (
                                                <a
                                                    href={
                                                        achievement.url
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View
                                                </a>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}

                    {/* Additional Information */}
                    {resume.extra?.length >
                        0 && (
                        <section>
                            <h2 className="text-xl font-bold border-b pb-1 mb-4">
                                Additional
                                Information
                            </h2>

                            <div className="space-y-4">
                                {resume.extra.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                index
                                            }
                                        >
                                            <h3 className="font-semibold">
                                                {item.title}
                                            </h3>

                                            <p>
                                                {
                                                    item.contents
                                                }
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;