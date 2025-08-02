export async function fetchTrendingJobs() {
  return [{ title: "Frontend Developer", location: "Remote", salary: "$70k" }];
}

export async function fetchCourses(skill) {
  return [{ title: "Learn JavaScript", provider: "Udemy", url: "#" }];
}

export async function analyzeResume(text) {
  return { score: 85, feedback: "Strong resume for tech roles." };
}
