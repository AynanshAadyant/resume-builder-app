export default interface Project {
    title : String,
    tech_stack : [String],
    description : String,
    startDate : Date,
    endDate : Date,
    features : String,
    github_link ?: String,
    live_link ?: String
}