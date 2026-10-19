const form = document.getElementById("solarForm");
const errorBox = document.getElementById("formError");
const navToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("navLinks");

document.getElementById("year").textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    navToggle.textContent = "☰";
  });
});

// Service cards can preselect the relevant service in the enquiry form.
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const serviceSelect = document.getElementById("service");
    const desired = link.dataset.service.toLowerCase();
    const option = [...serviceSelect.options].find(opt => opt.text.toLowerCase() === desired);
    if (option) serviceSelect.value = option.value;
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();
  errorBox.textContent = "";

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const fullName = String(data.get("fullName") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const pincode = String(data.get("pincode") || "").trim();
  const service = String(data.get("service") || "");
  const bill = String(data.get("bill") || "");
  const property = String(data.get("property") || "");
  const message = String(data.get("message") || "").trim();

  if (!/^[6-9]\d{9}$/.test(phone)) {
    errorBox.textContent = "Please enter a valid 10-digit Indian mobile number.";
    document.getElementById("phone").focus();
    return;
  }

  const lines = [
    "Hello Aaditya Solar Energy, I'd like to enquire about solar services.",
    "",
    `Name: ${fullName}`,
    `WhatsApp number: ${phone}`,
    `Service interested in: ${service}`,
    `Monthly electricity bill: ${bill}`,
    `Property type: ${property}`,
    `PIN code: ${pincode || "Not provided"}`,
    `Additional details: ${message || "None provided"}`,
    "",
    "Please contact me to discuss the next steps."
  ];

  const whatsappUrl = `https://wa.me/919665681331?text=${encodeURIComponent(lines.join("\n"))}`;
  window.location.href = whatsappUrl;
});
