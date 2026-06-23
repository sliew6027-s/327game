function getState() {
  return {
    stress: Number(localStorage.getItem("stress")) || 3, // 0-10
    hasID: localStorage.getItem("hasID") === "true",
    hasCharger: localStorage.getItem("hasCharger") === "true",
    hasNotes: localStorage.getItem("hasNotes") === "true",
    hasHomework: localStorage.getItem("hasHomework") === "true",
  };
}

function setState(state) {
  localStorage.setItem("stress", state.stress);
  localStorage.setItem("hasID", state.hasID);
  localStorage.setItem("hasCharger", state.hasCharger);
  localStorage.setItem("hasNotes", state.hasNotes);
  localStorage.setItem("hasHomework", state.hasHomework);
}

function resetState() {
  localStorage.setItem("stress", 3);
  localStorage.setItem("hasID", "false");
  localStorage.setItem("hasCharger", "false");
  localStorage.setItem("hasNotes", "false");
  localStorage.setItem("hasHomework", "false");
}

function clampStress(v) {
  if (v < 0) return 0;
  if (v > 10) return 10;
  return v;
}

