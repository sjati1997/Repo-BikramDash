document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const statusBox = form.querySelector(".form-status");
  const submitButton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.querySelector("#name")?.value.trim() || "";
    const email = form.querySelector("#email")?.value.trim() || "";
    const message = form.querySelector("#message")?.value.trim() || "";

    if (!name || !email || !message) {
      if (statusBox) {
        statusBox.textContent = "Please complete the required fields before submitting.";
        statusBox.className = "form-status error";
      }
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    if (statusBox) {
      statusBox.textContent = "The message backend is not enabled in this phase. Please use the placeholder contact details until the PHP email flow is configured.";
      statusBox.className = "form-status success";
    }

    form.reset();

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Send message";
    }
  });
});
