const userName = document.getElementById("user-Name");
const url = document.getElementById("URL-LINK");

let allData;

if (localStorage.getItem("information") == null) {
  allData = [];
} else {
  allData = JSON.parse(localStorage.getItem("information"));
  dispaly();
}
function addInformation() {
  if (userName.value === "" && url.value === "") {
    alert("Please fill in both the user name and URL.");
    userName.classList.add("is-invalid");
    url.classList.add("is-invalid");

    return;
  }

  const data = {
    userName: userName.value,
    link: url.value,
  };

  if ((userName.value.length < 4)) {
    alert("Please fill in both the user name and URL.");
    userName.classList.remove("is-valid");
    userName.classList.add("is-invalid");
    clear();
    return;
  } else {
    userName.classList.remove("is-invalid");
    userName.classList.add("is-valid");
  }

  let urlRegex = /^(https?:\/\/)/i;
  if (!urlRegex.test(url.value) ) {
    url.classList.remove("is-valid");
    url.classList.add("is-invalid");
    alert("Please enter a valid URL starting with http:// ");
    return;
  } else {
    url.classList.remove("is-invalid");
    url.classList.add("is-valid");
    clear;
  }

  allData.push(data);
  localStorage.setItem("information", JSON.stringify(allData));
  dispaly();
  clearMarkes();
  clear();
}

function clear() {
  userName.value = null;
  url.value = null;
}
function clearMarkes() {
  userName.classList.remove("is-valid", "is-invalid");
  url.classList.remove("is-valid", "is-invalid");
}

function dispaly() {
  let cartona = "";
  for (var i = 0; i < allData.length; ++i) {
    cartona += `  <div class="col-md-12 my-5 d-flex  justify-content-around align-items-center bg-white p-2 shadow flex-wrap ">
                    <p>${allData[i].userName}</p>
                    <p>${allData[i].link}</p>
                    <p><button type="button" onclick="visitUrl(${i})" class="btn btn-outline-warning px-5"  >Vist</button></p>
                    <p><button class="btn btn-outline-danger" onclick="delet(${i})" >  <i class="fas fa-trash"></i> Delete</button></p>
                </div>`;
  }
  document.getElementById("mydata").innerHTML = cartona;
}

function delet(deleted) {
  allData.splice(deleted, 1);
  localStorage.setItem("information", JSON.stringify(allData));
  dispaly();
}
function visitUrl(viseted) {
 
  let url = allData[viseted].link;
  window.open(url, "_blank");
  dispaly();
}
