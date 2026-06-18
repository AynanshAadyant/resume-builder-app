import type { Achievement } from "./achievement.type"
import type { Certification } from "./certification.type"
import type { Education } from "./education.type"
import {type Profile} from "./user.type"
import type { Miscellaneous } from "./miscellaneous.type"
import {type Project} from "./project.type"
import type { Skill } from "./skill.type"
import {type WorkExperience} from "./workExperience.type"

export interface CompleteProfile {
    profile : Profile,
    workExperiences : WorkExperience[],
    projects : Project[],
    certifications ?: Certification[],
    education ?: Education[],
    skills : Skill[],
    achievements ?: Achievement[],
    miscellaneous ?: Miscellaneous[]
}