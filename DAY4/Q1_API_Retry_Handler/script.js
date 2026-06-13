const statusBox = document.querySelector("#statusBox");
const attemptList = document.querySelector("#attemptList");
const startSuccessButton = document.querySelector("#startSuccess");
const startFailureButton = document.querySelector("#startFailure");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeMockRequest({ failUntilAttempt }) {
  let attempt = 0;

  return async function request() {
    attempt += 1;
    await wait(550);

    if (attempt <= failUntilAttempt) {
      throw new Error(`Network error on attempt ${attempt}`);
    }

    return {
      message: `API recovered on attempt ${attempt}`,
      fetchedAt: new Date().toLocaleTimeString()
    };
  };
}

function addAttempt(message, className) {
  const item = document.createElement("li");
  item.className = className;
  item.textContent = message;
  attemptList.appendChild(item);
}

async function requestWithRetry(requestFn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      statusBox.textContent = `Attempt ${attempt} in progress...`;
      const response = await requestFn();
      addAttempt(`Attempt ${attempt}: success`, "success");
      return response;
    } catch (error) {
      addAttempt(`Attempt ${attempt}: ${error.message}`, "failed");

      if (attempt === maxRetries) {
        throw new Error("All retry attempts failed. Please try again later.");
      }

      await wait(350);
    }
  }
}

async function runScenario(failUntilAttempt) {
  statusBox.className = "status-box";
  statusBox.textContent = "Starting request...";
  attemptList.textContent = "";
  startSuccessButton.disabled = true;
  startFailureButton.disabled = true;

  try {
    const response = await requestWithRetry(makeMockRequest({ failUntilAttempt }), 3);
    statusBox.classList.add("success");
    statusBox.textContent = `${response.message}. Completed at ${response.fetchedAt}.`;
  } catch (error) {
    statusBox.classList.add("error");
    statusBox.textContent = error.message;
  } finally {
    startSuccessButton.disabled = false;
    startFailureButton.disabled = false;
  }
}

startSuccessButton.addEventListener("click", () => runScenario(2));
startFailureButton.addEventListener("click", () => runScenario(3));
