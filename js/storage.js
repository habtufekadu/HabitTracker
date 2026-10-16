// ==================== STORAGE ====================
// Handles saving and loading habits from the browser's localStorage.
// All other files use these functions instead of touching localStorage directly.

const STORAGE_KEY = "habittracker_habits";

// Load habits from localStorage.
// Returns an array. Returns [] if nothing is saved or data is corrupted.
function loadHabits() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(stored) || [];
  } catch (error) {
    console.error("Failed to load habits:", error);
    return [];
  }
}

// Save the habits array to localStorage.
function saveHabits(habits) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error("Failed to save habits:", error);
  }
}