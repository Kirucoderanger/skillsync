// ===== Utility Functions =====

// Get skills from localStorage
function getSkills() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Save skills to localStorage
function saveSkills(skills) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
}

// Generate a unique ID
function generateId() {
  return Date.now();
}

export default { getSkills, saveSkills, generateId };