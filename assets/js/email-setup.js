(function () {
  // Initialize EmailJS with Public Key
  emailjs.init("GFdkElZQTfFFzfJP5");

  // Constants
  const SERVICE_ID = "service_l4317ac";
  const TEMPLATE_ID = "template_qsfs9g3";

  // Toast Function
  function showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `custom-toast ${type}`;

    const icon =
      type === "success"
        ? '<i class="fa-solid fa-circle-check"></i>'
        : '<i class="fa-solid fa-circle-exclamation"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add("show"), 10);

    // Remove toast
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  // Contact Form Handler
  const contactForm = document.getElementById("contactpage");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector("span") || submitBtn;
      const originalText = btnText.innerHTML;

      btnText.innerHTML = "Sending...";
      submitBtn.disabled = true;

      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this).then(
        () => {
          btnText.innerHTML = originalText;
          submitBtn.disabled = false;
          showToast(
            "Message sent successfully! We will get back to you soon.",
            "success",
          );
          contactForm.reset();
        },
        (err) => {
          btnText.innerHTML = originalText;
          submitBtn.disabled = false;
          console.error("EmailJS Error:", err);
          showToast("Failed to send message. Please try again.", "error");
        },
      );
    });
  }

  // Newsletter Form Handler
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const submitButton = this.querySelector("button");
      const originalHTML = submitButton.innerHTML;
      const emailInput = this.querySelector('input[name="email"]');
      const subscriberEmail = emailInput.value;

      submitButton.disabled = true;
      submitButton.innerHTML =
        '<i class="send fa-sharp fa-solid fa-spinner fa-spin"></i>';

      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, {
          email: subscriberEmail,
          fname: "Newsletter Subscriber",
          lname: "",
          phone: "",
          msg: "New newsletter subscription",
        })
        .then(
          () => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalHTML;
            showToast(
              "Thank you for subscribing to our newsletter!",
              "success",
            );
            newsletterForm.reset();
          },
          (err) => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalHTML;
            console.error("EmailJS error:", err);
            showToast("Failed to subscribe. Please try again.", "error");
          },
        );
    });
  }
})();
