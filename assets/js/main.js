/* =========================================================
   Tidal Wave Group — interactions
   ========================================================= */
(function () {
  "use strict";

  /* Sticky header shadow */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("mobile-open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("mobile-open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Current year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Scroll-reveal + count-up via IntersectionObserver */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = (target % 1 !== 0) ? 1 : 0;
    if (prefersReduced) { el.textContent = target.toFixed(decimals) + suffix; return; }
    var start = null, dur = 1400;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        entry.target.querySelectorAll("[data-count]").forEach(animateCount);
        if (entry.target.hasAttribute("data-count")) animateCount(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    // Hero counters aren't inside a .reveal, observe their container
    document.querySelectorAll(".hero__card").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll("[data-count]").forEach(animateCount);
  }

  /* FAQ accordion */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    var q = item.querySelector(".faq__q");
    var a = item.querySelector(".faq__a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.toggle("open");
      a.style.maxHeight = isOpen ? a.scrollHeight + "px" : null;
    });
  });

  /* Contact form.
     RECOMMENDED: set FORM_ENDPOINT to a form service (Formspree / Formcarry /
     Netlify Forms) pointed at the info inbox. The address then lives only in
     that service's config, never in this site — best protection against spam
     scrapers. Until an endpoint is set, the form uses a mailto fallback whose
     address is assembled at runtime (below) so it is not a plain-text string in
     the page source that bots can harvest. */
  var FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxx"

  // Inbox assembled at runtime — intentionally never a literal address in source.
  function inbox() {
    return "info" + String.fromCharCode(64) + "tidalwavegroup" + String.fromCharCode(46) + "co";
  }
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var data = {
        name: form.name.value.trim(),
        company: form.company.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        service: form.service.value,
        message: form.message.value.trim()
      };

      function showOk() {
        status.className = "form__status ok show";
        status.textContent = "Thanks, " + (data.name || "there") + "! Your message is on its way — we'll be in touch within one business day.";
        form.reset();
      }

      if (FORM_ENDPOINT) {
        fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (r.ok) showOk();
          else throw new Error("bad response");
        }).catch(function () {
          openMailto(data);
        });
      } else {
        openMailto(data);
        showOk();
      }
    });
  }

  function openMailto(d) {
    var subject = encodeURIComponent("New inquiry from " + (d.name || "website") + (d.company ? " (" + d.company + ")" : ""));
    var body = encodeURIComponent(
      "Name: " + d.name + "\n" +
      "Company: " + d.company + "\n" +
      "Email: " + d.email + "\n" +
      "Phone: " + d.phone + "\n" +
      "Service: " + d.service + "\n\n" +
      d.message
    );
    window.location.href = "mailto:" + inbox() + "?subject=" + subject + "&body=" + body;
  }
})();
