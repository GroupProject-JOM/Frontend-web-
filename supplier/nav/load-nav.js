(() => {
  const sidebar = document.querySelector(".sidebar");
  fetch(frontProxy + "/supplier/nav/nav.html")
    .then((res) => res.text())
    .then((data) => {
      sidebar.innerHTML = data;
    });

  const navScript = document.createElement("script");
  navScript.setAttribute("src", frontProxy + "/supplier/nav/script.js");
  document.body.appendChild(navScript);
})();
