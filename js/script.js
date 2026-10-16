// ==================== SETUP ====================

const habitsContainer = document.querySelector("#habits-container");
const addHabitForm = document.querySelector("#add-habit-form");
const habitInput = document.querySelector("#habit-input");
const todayDateElement = document.querySelector("#today-date");
const summaryElement = document.querySelector("#habits-summary");

let habits = loadHabits();

// ==================== DATE HELPERS ====================

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayDisplay() {
  const today = new Date();
  return today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// ==================== STREAK ====================

function calculateStreak(habit) {
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);

    const year = checkDate.getFullYear();
    const month = String(checkDate.getMonth() + 1).padStart(2, "0");
    const day = String(checkDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    if (habit.history.includes(dateString)) {
      streak++;
    } else {
      if (i === 0) continue;
      break;
    }
  }

  return streak;
}

// ==================== RENDER ====================

function createHabitElement(habit) {
  const today = getTodayString();
  const isDoneToday = habit.history.includes(today);
  const streak = calculateStreak(habit);

  const li = document.createElement("li");
  li.className = "habit-item";
  li.dataset.id = habit.id;

  li.innerHTML = `
    <label class="habit-checkbox-label">
      <input type="checkbox" class="habit-checkbox" ${isDoneToday ? "checked" : ""}>
      <span class="habit-name">${habit.name}</span>
    </label>
    <span class="habit-streak">🔥 ${streak}</span>
    <button class="delete-button" title="Delete habit">✕</button>
  `;

  return li;
}

function renderHabits() {
  habitsContainer.innerHTML = "";

  if (habits.length === 0) {
    habitsContainer.innerHTML = `
      <li class="empty-state">No habits yet. Add one above to get started.</li>
    `;
  } else {
    for (const habit of habits) {
      const element = createHabitElement(habit);
      habitsContainer.appendChild(element);
    }
  }

  updateSummary();
}

function updateSummary() {
  const total = habits.length;
  const today = getTodayString();
  const doneToday = habits.filter(function (h) {
    return h.history.includes(today);
  }).length;

  summaryElement.textContent = `${total} habits · ${doneToday} done today`;
}

// ==================== ACTIONS ====================

function toggleHabitDone(id) {
  const habit = habits.find(function (h) {
    return h.id === id;
  });
  if (!habit) return;

  const today = getTodayString();
  const index = habit.history.indexOf(today);

  if (index === -1) {
    habit.history.push(today);
  } else {
    habit.history.splice(index, 1);
  }

  saveHabits(habits);
  renderHabits();
}

function deleteHabit(id) {
  habits = habits.filter(function (h) {
    return h.id !== id;
  });
  saveHabits(habits);
  renderHabits();
}

// ==================== EVENTS ====================

addHabitForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = habitInput.value.trim();
  if (!name) return;

  const newHabit = {
    id: Date.now(),
    name: name,
    createdAt: getTodayString(),
    history: []
  };

  habits.push(newHabit);
  saveHabits(habits);
  habitInput.value = "";
  renderHabits();
});

habitsContainer.addEventListener("click", function (event) {
  const target = event.target;
  const li = target.closest(".habit-item");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (target.classList.contains("habit-checkbox")) {
    toggleHabitDone(id);
  }

  if (target.classList.contains("delete-button")) {
    deleteHabit(id);
  }
});

// ==================== STARTUP ====================

todayDateElement.textContent = getTodayDisplay();
renderHabits();