// RO / EN switch for the legal pages. Without JavaScript both languages stay visible.
(function () {
  var params = new URLSearchParams(location.search);
  var saved = null;
  try { saved = localStorage.getItem("kalenoth-lang"); } catch (e) {}
  var lang = params.get("lang") || saved || ((navigator.language || "ro").toLowerCase().indexOf("ro") === 0 ? "ro" : "en");

  function apply(l) {
    lang = l === "en" ? "en" : "ro";
    document.documentElement.lang = lang;
    document.querySelectorAll("article[data-lang]").forEach(function (a) { a.hidden = a.dataset.lang !== lang; });
    document.querySelectorAll("button[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    var h = document.querySelector("article[data-lang='" + lang + "'] h1");
    if (h) document.title = "Kalenoth – " + h.textContent;
    try { localStorage.setItem("kalenoth-lang", lang); } catch (e) {}
  }

  document.querySelectorAll("button[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { apply(b.dataset.lang); });
  });
  apply(lang);
})();
