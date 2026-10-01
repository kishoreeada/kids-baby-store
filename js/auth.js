
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form form");
  if (!form) return;

  const fields = [...form.querySelectorAll("[data-validate]")];
  const isLogin = form.id === "loginForm";
  const isSignup = form.id === "signupForm";

  const getError = (input) => input.closest(".field")?.querySelector(".error");

  const validate = (input) => {
    let message = "";
    const value = input.value.trim();

    if (!value) {
      message = "This field is required.";
    } else if (input.name === "name" && !/^[A-Za-z ]{2,60}$/.test(value)) {
      message = "Use letters and spaces only.";
    } else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      message = "Enter a valid email address.";
    } else if (input.name === "password" && input.value.length < 6) {
      message = "Password must be at least 6 characters.";
    } else if (
      input.name === "confirm" &&
      input.value !== form.querySelector('[name="password"]')?.value
    ) {
      message = "Passwords do not match.";
    }

    const error = getError(input);
    const field = input.closest(".field");
    if (error) error.textContent = message;
    field?.classList.toggle("invalid", Boolean(message));
    field?.classList.toggle("valid", !message && Boolean(value));
    return !message;
  };

  // Font Awesome eye / eye-slash password control.
  form.querySelectorAll(".password-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.getAttribute("aria-controls"));
      const icon = button.querySelector("i");
      if (!input || !icon) return;

      const showing = input.type === "text";
      input.type = showing ? "password" : "text";
      button.setAttribute("aria-label", showing ? "Show password" : "Hide password");
      button.setAttribute("aria-pressed", String(!showing));
      icon.classList.toggle("fa-eye", showing);
      icon.classList.toggle("fa-eye-slash", !showing);
    });
  });

  fields.forEach((input) => {
    input.addEventListener("blur", () => validate(input));
    input.addEventListener("input", () => {
      if (input.closest(".field")?.classList.contains("invalid")) validate(input);
      if (input.name === "password") {
        const confirm = form.querySelector('[name="confirm"]');
        if (confirm?.value) validate(confirm);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const valid = fields.map(validate).every(Boolean);
    const status = form.querySelector(".auth-status");
    if (!status) return;

    if (!valid) {
      status.className = "auth-status";
      status.textContent = "Please correct the highlighted fields.";
      form.querySelector(".field.invalid input")?.focus();
      return;
    }

    if (isSignup) {
      // No account data is stored. This is a front-end navigation flow only.
      status.className = "auth-status success";
      status.textContent = "Account created successfully. Taking you to sign in…";

      window.setTimeout(() => {
        window.location.href = "login.html";
      }, 500);
      return;
    }

    if (isLogin) {
      const emailInput = form.querySelector('input[name="email"]');
      const email = typeof emailInput?.value === "string" ? emailInput.value.trim() : "";
      const role = form.querySelector('input[name="role"]:checked')?.value || "client";

      status.className = "auth-status success";
      status.textContent = `Login successful. Opening ${role} dashboard…`;

      window.setTimeout(() => {
        const dashboard = role === "admin"
          ? "admin-dashboard.html"
          : "client-dashboard.html";
        window.location.href = `${dashboard}?email=${encodeURIComponent(email)}`;
      }, 500);
    }
  });
});
