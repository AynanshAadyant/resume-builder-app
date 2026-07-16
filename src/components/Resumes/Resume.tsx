import type { Resume } from "@/types/resume.type";
import type {
    Profile,
    User,
} from "@/types/user.type";
import { forwardRef } from "react";

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
            className={`bg-gray-200 ${className}`}>
            <div ref={ref} className="bg-white w-[210mm] max-w-full min-h-[297mm] mx-auto shadow-lg ">
                <div className="w-full text-black px-15 py-5 leading-relaxed text-[15px] flex flex-col gap-2">                
                        <header className="text-center">
                            <h1 className="resume-heading text-3xl font-bold">
                                {user?.name || "Candidate Name"}
                            </h1>

                            <div className="resume-content">
                                {profile?.phoneNo && (
                                    <span>{profile.phoneNo}</span>
                                )}

                                {profile?.phoneNo && user?.email && (
                                    <span> | </span>
                                )}

                                {user?.email && (
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                )}

                                {profile?.location && (
                                    <>
                                        <span> | </span>
                                        <span>{profile.location}</span>
                                    </>
                                )}

                                {profile?.linkedIn && (
                                    <>
                                        <span> | </span>
                                        <a
                                            href={profile.linkedIn}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:underline text-blue-600"
                                        >
                                            LinkedIn
                                        </a>
                                    </>
                                )}

                                {profile?.github && (
                                    <>
                                        <span> | </span>
                                        <a
                                            href={profile.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:underline text-blue-600"
                                        >
                                            GitHub
                                        </a>
                                    </>
                                )}

                                {profile?.portfolio && (
                                    <>
                                        <span> | </span>
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
                            <h2 className="font-bold text-xl underline resume-heading mb-1">
                                Experience
                            </h2>

                            <div className="flex flex-col gap-2">
                                {resume.workExp.map( ( exp, index ) => (
                                    <div key={ exp._id ?? index }>
                                        <div className="flex flex-row justify-between items-center">
                                            <div>
                                                <h3 className="resume-role font-bold">{exp.company}</h3>

                                                <p className="resume-role text-gray-700"> {exp.position} </p>
                                                
                                            </div>

                                            <div className="resume-date flex flex-col">
                                                <p>  { formatDate( exp.startDate)} {" - "} {formatDate( exp.endDate) ||"Present"} </p>
                                                <p className="text-right text-sm text-gray-700">
                                                    { exp.location} {exp.type || ""}
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="resume-list leading-5 text-justify">
                                            {exp.responsibilities.map((point, idx) => (
                                                <li className="resume-list-item list-disc font-medium text-[13px]" key={idx}>{point}</li>
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
                        <section className="">
                            <h2 className="text-xl underline font-bold mb-2">
                                Projects
                            </h2>

                            <div className="flex flex-col gap-1">
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
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-semibold">
                                                        {
                                                            project.title
                                                        }
                                                    </h3>

                                                    {project.tech_stack
                                                        ?.length >
                                                        0 && (
                                                        <p className="text-sm text-gray-600">
                                                            {project.tech_stack.join(
                                                                "  |  "
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex gap-3 text-sm">
                                                    {project.github_link && (
                                                        <a
                                                            href={
                                                                project.github_link
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            GitHub
                                                        </a>
                                                    )}

                                                    {project.live_link && (
                                                        <a
                                                            href={
                                                                project.live_link
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

                                            <ul className="list text-justify">
                                                {project.description.map((point : any, idx : any) => (
                                                    <li key={idx} className="text-[12px] list-disc font-semibold">
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {resume.skills?.length >
                        0 && (
                        <section className="mb-2">
                            <h2 className="text-xl font-bold underline">
                                Skills
                            </h2>
                            {
                                resume.skills.map((skill, index) => (
                                    <div
                                        key={skill._id ?? index}
                                        className="flex gap-2"
                                    >
                                        <span className="font-bold min-w-[180px] text-[12px]">
                                            {skill.category}:
                                        </span>

                                        <span className="font-semibold text-[12px]">
                                            {skill.name.join(", ")}
                                        </span>
                                    </div>
                            ))}

                            
                        </section>
                    )}

                    {/* Education */}
                    {resume.education?.length >
                        0 && (
                        <section className="mb-2">
                            <h2 className="text-xl font-bold underline">
                                Education
                            </h2>

                            <div className="text-[12px]">
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
                                                <h1 className="institution font-bold text-[12px] ">
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
                                                
                                                {edu.content && (
                                                    <p className="content mt-2">
                                                        {
                                                            edu.content
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="cgpa text-right ">
                                                <p>
                                                    CGPA:{" "}
                                                    {
                                                        edu.gpa
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

                                                <p className="location text-gray-500">
                                                    {
                                                        edu.location
                                                    }
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
                        <section className="mb-2">
                            <h2 className="text-xl font-bold underline">
                                Certifications
                            </h2>

                            <div className="">
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
                                            <h3 className="font-semibold text-[12px]">
                                                {
                                                    cert.name
                                                }
                                            </h3>

                                            <p className="text-[12px]">
                                                {
                                                    cert.contents
                                                }
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
                        <section className="mb-2">
                            <h2 className="text-xl font-bold underline">
                                Achievements
                            </h2>

                            <div className="text-[12px]">
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
                                                    achievement.name
                                                }
                                            </h3>

                                            {
                                                achievement.contents.map( (content:any, index:any ) => 
                                                    <p key={index} > { content } </p>
                                                )
                                            }

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
                            <h2 className="text-xl font-bold underline">
                                Additional
                                Information
                            </h2>

                            <div className="text-[12px]">
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

                                            <ul>
                                                {
                                                item.contents.length > 0 &&
                                                item.contents.map( (i : string, index:any ) => 
                                                    <li key={index}> - { i } </li>
                                                )
                                                }
                                            </ul>
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