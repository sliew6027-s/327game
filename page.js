function renderStatusBar() {
  var s = getState();
  document.getElementById("status").innerHTML =
    "Stress: " + s.stress +
    " | ID: " + (s.hasID ? "✓" : "✗") +
    " | Charger: " + (s.hasCharger ? "✓" : "✗") +
    " | Notes: " + (s.hasNotes ? "✓" : "✗") +
    " | Homework: " + (s.hasHomework ? "✓" : "✗");
}

function renderDeskMessage() {
  var s = getState();
  var msg = "";

  if (s.hasNotes && s.hasCharger) {
    msg = "You feel slightly more prepared. Slightly.";
  } else if (s.hasNotes) {
    msg = "You found your notes. That helps… a bit.";
  } else if (s.hasCharger) {
    msg = "You found your charger. At least your laptop won’t betray you.";
  } else {
    msg = "Nothing in your hands yet. The clock is not impressed.";
  }

  var el = document.getElementById("deskMsg");
  if (el) {
    el.innerHTML = msg;
  }
}

function renderPlanMessage() {
  var s = getState();
  var msg = "";

  if (s.stress >= 7) {
    msg = "Your thoughts are loud. Planning might be the only thing keeping you upright.";
  } else if (s.stress >= 4) {
    msg = "You’re stressed, but still functional. For now.";
  } else {
    msg = "You feel surprisingly focused. Don’t waste it.";
  }

  var el = document.getElementById("planMsg");
  if (el) {
    el.innerHTML = msg;
  }
}

function renderLeaveMessage() {
  var s = getState();
  var msg = "";

  if (!s.hasCharger && s.stress >= 6) {
    msg = "Your battery anxiety is imaginary… until it isn’t.";
  } else if (!s.hasNotes && s.stress >= 6) {
    msg = "You’re pretty sure you forgot something important. You’re also pretty sure you don’t have time.";
  } else if (s.hasNotes || s.hasCharger) {
    msg = "You’ve got at least one useful item. But we're still missing a few things..";
  } else {
    msg = "You have nothing. Just vibes and panic.";
  }

  var el = document.getElementById("leaveMsg");
  if (el) {
    el.innerHTML = msg;
  }
}

function renderLibraryMessage() {
  var s = getState();
  var msg = "";

  if (s.hasNotes) {
    msg = "The library feels calmer than your room. With your notes in hand, you can actually move with a plan instead of panic.";
  } else {
    msg = "The library is quiet, but your head isn’t. You scan the space like the answer might be sitting on a table somewhere.";
  }

  var el = document.getElementById("libraryMsg");
  if (el) el.innerHTML = msg;
}

function renderStudentCenterMessage() {
  var s = getState();
  var msg = "";

  if (s.stress >= 6) {
    msg = "It’s crowded and loud. The noise makes your thoughts scatter, and you can feel your stress climbing again.";
  } else {
    msg = "The student center is busy, but it has what you need—people, resources, and a chance to fix the situation fast.";
  }

  var el = document.getElementById("studentcenterMsg");
  if (el) el.innerHTML = msg;
}

function renderQuietSpotMessage() {
  var s = getState();
  var msg = "";

  if (s.stress >= 6) {
    msg = "You step away from everything. Your breathing slows down first, then your thoughts. You’re still late, but you’re not spiraling.";
  } else {
    msg = "The quiet helps. You don’t magically have more time, but you do have a clearer next step.";
  }

  var el = document.getElementById("quietspotMsg");
  if (el) el.innerHTML = msg;
}

function renderPrinterMessage() {
  var s = getState();
  var msg = "";

  if (s.hasID && s.hasNotes) {
    msg = "You’re prepared. The printer hums, the pages come out clean, and for once the universe doesn’t argue.";
  } else if (s.hasNotes && !s.hasID) {
    msg = "You have what you need—except you realize you might need your ID for the next step. Of course.";
  } else if (!s.hasNotes && s.hasID) {
    msg = "You can print… if you actually had what you needed to print. You stare at the screen like it might confess.";
  } else {
    msg = "You’re standing in front of a printer with no plan and no peace. The line behind you is growing.";
  }

  var el = document.getElementById("printerMsg");
  if (el) el.innerHTML = msg;
}

function printerAttempt() {
  var s = getState();

  // Must have ID to print homework
  if (!s.hasID) {
    s.stress = clampStress(s.stress + 1);
    setState(s);
    window.location.href = "forgotid.html"; 
    return;
  }

  s.hasHomework = true;
  s.stress = clampStress(s.stress - 1);
  setState(s);

  if (s.hasNotes && s.hasCharger && s.hasHomework) {
    window.location.href = "goodending.html";
    return;
  }

  if (!s.hasNotes && !s.hasCharger) {
    window.location.href = "badending.html";
  } else {
    window.location.href = "barelyending.html";
  }
}

function foundIdGoToPrinter() {
  state.id = true;          
  state.stress = Math.max(0, state.stress - 1);

  saveState();              
  window.location.href = "printer.html";
}

function renderPrinter() {
  var s = getState();

  if (!s.hasID) {
    window.location.href = "forgotid.html";
    return;
  }

  var el = document.getElementById("printerMsg");
  if (el) {
    el.innerHTML =
      "You tap your ID at the printer. The screen wakes up—thankfully. " +
      "Now you just need to print what you meant to print before class.";
  }

  if (typeof renderStatus === "function") renderStatus();
  if (typeof updateStatus === "function") updateStatus();
}

window.addEventListener("load", function () {
  if (!document.body) return;

  if (document.body.id === "printer") renderPrinter();
});

function renderForgotId() {
  var s = getState();

  if (s.hasID) {
    window.location.href = "printer.html"; 
    return;
  }

  var el = document.getElementById("idMsg");
  if (el) {
    el.innerHTML =
      "You reach for your ID—nothing. You check again, slower this time. Still nothing. " +
      "The printer station suddenly feels like a locked door.";
  }

  if (typeof renderStatus === "function") renderStatus();
  if (typeof updateStatus === "function") updateStatus();
}

window.addEventListener("load", function () {
  if (!document.body) return;

  if (document.body.id === "forgotid") renderForgotId();
});

function renderIDFoundMessage() {
  var msg = "You unzip your backpack one more time and dig past your notebook. Behind it—wedged flat against the back panel—is your ID. It must have slid down earlier. Instant relief.";

  var el = document.getElementById("idFoundMsg");
  if (el) el.innerHTML = msg;
}

function renderIDReplaceMessage() {
  var s = getState();
  var msg = "The student center helps you print a temporary replacement. It’s a small win, but you’ll take it.";

  var el = document.getElementById("idReplaceMsg");
  if (el) el.innerHTML = msg;
}

function renderGoodEndingMessage() {
  var s = getState();
  var msg = "";

  if (s.stress <= 3) {
    msg = "You made it with time to breathe. You sit down feeling calm—like you actually chose this timeline.";
  } else if (s.stress <= 6) {
    msg = "You made it. Not perfect, not calm, but present. That counts.";
  } else {
    msg = "You made it, somehow. Your heart is still sprinting, but you’re in the room—and that’s a win.";
  }

  var el = document.getElementById("goodMsg");
  if (el) el.innerHTML = msg;
}

function renderBarelyEndingMessage() {
  var s = getState();

  var count = 0;
  if (s.hasHomework) count++;
  if (s.hasCharger) count++;
  if (s.hasNotes) count++;

  if (count === 0) {
    window.location.href = "badending.html";
    return;
  }

  var missing = [];
  if (!s.hasHomework) missing.push("homework");
  if (!s.hasCharger) missing.push("charger");
  if (!s.hasNotes) missing.push("notes");

  var missingText = "";
  if (missing.length === 1) missingText = missing[0];
  if (missing.length === 2) missingText = missing[0] + " and " + missing[1];
  if (missing.length === 3) missingText = missing[0] + ", " + missing[1] + ", and " + missing[2];

  var msg = "";

  if (count === 1) {
    msg =
      "You make it to class, but you’re barely holding it together. " +
      "You only have one of the things you needed today, and you’re missing your " + missingText + ". " +
      "You spend the first part of class scrambling to keep up.";
  } else {
    msg =
      "You make it to class, but it’s not smooth. " +
      "You have some of what you needed, but you’re still missing your " + missingText + ". " +
      "You manage, but it definitely feels harder than it should.";
  }

  var el = document.getElementById("barelyMsg");
  if (el) el.innerHTML = msg;

}

function renderBadEndingMessage() {
  var s = getState();

  var problems = [];

  if (!s.hasCharger) problems.push("your laptop dies mid-class");
  if (!s.hasNotes) problems.push("you’re missing your notes and can’t follow along");

  var detail = "";
  if (problems.length === 1) {
    detail = " What hurts most: " + problems[0] + ".";
  } else if (problems.length === 2) {
    detail = " What hurts most: " + problems[0] + ", and " + problems[1] + ".";
  } else {
    detail = " Even without forgetting anything, the chaos catches up to you today.";
  }

  var msg = "";
  if (s.stress >= 7) {
    msg = "You get there, but everything is out of control." + detail + " You spend the whole time recovering instead of learning.";
  } else {
    msg = "You make it, but too many small things go wrong." + detail + " You leave feeling behind and frustrated.";
  }

  var el = document.getElementById("badMsg");
  if (el) el.innerHTML = msg;
}

function renderLowBatteryMessage() {
  var s = getState();
  var msg = "";

  if (s.hasCharger) {
    msg = "Your laptop flashes low battery, but you pull out your charger like it’s a superhero cape. Crisis avoided.";
  } else {
    msg = "Your laptop battery drops fast. You realize you might not have what you need to get through class today.";
  }

  var el = document.getElementById("batteryMsg");
  if (el) el.innerHTML = msg;
}


function renderAlternateMessage() {
  var s = getState();
  var msg = "";

  if (s.hasNotes && s.hasCharger) {
    msg = "You take a different route, but you’re prepared. It feels like you just unlocked a better version of the day.";
  } else if (s.hasNotes || s.hasCharger) {
    msg = "You try a different path. It helps a little, but you can still feel what’s missing.";
  } else {
    msg = "You choose the alternate route with nothing in your hands. Bold. Questionable. Kind of iconic.";
  }

  var el = document.getElementById("altMsg");
  if (el) el.innerHTML = msg;
}

function renderRegularEndingMessage() {
  var s = getState();
  var msg = "";

  if (s.stress <= 4) {
    msg = "You get there on time. It’s not perfect, but it’s steady. You settle in and follow along without feeling behind.";
  } else if (s.stress <= 6) {
    msg = "You get there with a small rush of adrenaline. You’re present, but you can tell you’re running on stress.";
  } else {
    msg = "You get there, but you’re still catching your breath. The day continues, and you’re trying to keep up with it.";
  }

  var el = document.getElementById("regularMsg");
  if (el) el.innerHTML = msg;
}

function renderLateEndingMessage() {
  var s = getState();
  var msg = "";

  if (s.stress >= 7) {
    msg = "You show up late and stressed. You slip in quietly, but your brain feels like static for the first ten minutes.";
  } else if (s.stress >= 4) {
    msg = "You arrive late, but you recover. You listen hard and try to catch up without drawing attention.";
  } else {
    msg = "You arrive a little late, but calm. You take a seat and get focused quickly—still not ideal, but not a disaster.";
  }

  var el = document.getElementById("lateMsg");
  if (el) el.innerHTML = msg;
}


