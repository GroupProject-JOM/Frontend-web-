// sessionStorage.setItem("id", 0);
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    th1 = body.querySelector(".th1"),
    th2 = body.querySelector(".th2"),
    tbody = body.querySelector(".tbody"),
    btn = body.querySelector(".form-button");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.innerHTML = data["sin"]["sText"];
    th1.textContent = data["sin"]["th1"];
    th2.textContent = data["sin"]["th2"];
    btn.textContent = data["sin"]["btn"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";

    sTitle.textContent = data["en"]["sTitle"];
    sText.innerHTML = data["en"]["sText"];
    th1.textContent = data["en"]["th1"];
    th2.textContent = data["en"]["th2"];
    btn.textContent = data["en"]["btn"];
  });

  var data = {
    sin: {
      sTitle: "ඔබගේ ලිපිනයන්",
      sText: "ඔබගේ වතු ස්ථානය බලන්න සහ සංස්කරණය කරන්න",
      th1: "වතු නම",
      th2: "ප්රදේශය/කලාපය",
      btn: "අලුතින් එකතු කරන්න",
    },
    en: {
      sTitle: "Your Addresses",
      sText: "View and Edit the your estate location",
      th1: "Estate Name",
      th2: "Area/Region",
      btn: "Add New",
    },
  };

  var row = "";
  // fetch(backProxy + "/estates?sId=" + sessionStorage.getItem("sId"), {
  fetch(backProxy + "/estates?sId=" + getCookie("sId"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          let arr = data.list;
          arr.forEach(data_to_table);

          function data_to_table(item) {
            row +=
              "<tr data-href='./view.html' id=" +
              item.id +
              ">" +
              "<td>" +
              item.estate_name +
              "</td>" +
              "<td>" +
              item.area +
              "</td>" +
              '<td class="edit"><a href="./edit.html"><i class="fa-solid fa-pen-to-square icon"></a></i></td>' +
              '<td class="delete"><a href="./view-all.html"><i class="fa-solid fa-trash-can icon"></a></i></td>' +
              "</tr>";
          }
          tbody.innerHTML = row;

          const rows = document.querySelectorAll("tr[data-href]"),
            edits = document.querySelectorAll(".edit"),
            deletes = document.querySelectorAll(".delete");

          edits.forEach((e) => {
            e.addEventListener("click", () => {
              console.log(e.parentElement.id);
              // sessionStorage.setItem("id", e.parentElement.id);
              document.cookie = "id=" + e.parentElement.id  + "; path=/";
            });
          });

          deletes.forEach((d) => {
            d.addEventListener("click", () => {
              fetch(
                backProxy +
                  "/estate?sId=" +
                  // sessionStorage.getItem("sId") +
                  getCookie("sId") +
                  "&id=" +
                  d.parentElement.id,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                }
              )
                .then((response) => {
                  if (response.status == 200) {
                    response.json().then((data) => {
                      console.log(data.message);
                    });
                  } else if (response.status === 400) {
                    response.json().then((data) => {
                      console.log(data.message);
                    });
                  } else {
                    console.error("Error:", response.status);
                    console.log(error);
                  }
                })
                .catch((error) => {
                  console.error("An error occurred:", error);
                });
            });
          });

          rows.forEach((r) => {
            r.addEventListener("click", () => {
              // sessionStorage.setItem("id", r.id);
              document.cookie = "id=" + r.id + "; path=/";
              window.location.href = r.dataset.href;
            });
          });
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.size);
        });
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
})();
