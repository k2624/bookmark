var siteUrlInput = document.getElementById("bookUrl");
var siteNameInput = document.getElementById("bookName");
var bookTableBody = document.getElementById("bookTableBody");
var alert = document.getElementById("alert");
var booklist;

if (localStorage.getItem("booklist") != null) {
  booklist = JSON.parse(localStorage.getItem("booklist"));
  displayBooks();
} else {
  booklist = [];
}

function addProduct() {
  var book = {
    name: siteNameInput.value,
    url: siteUrlInput.value
  };
  if (
    siteNameInput.classList.contains("is-valid") &&
    siteUrlInput.classList.contains("is-valid")
  ) {
    booklist.push(book);
    localStorage.setItem("booklist", JSON.stringify(booklist));
    clearForm();
    displayBooks();
    alert.classList.add("d-none");
  }
}
function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function displayBooks() {
  var cartoona = ``;
  for (var i = 0; i < booklist.length; i++) {
    cartoona += `<tr class="border border-top-1 border-bottom-1 border-end-0 border-start-0 border-black border-opacity-25 border">
                        <td class="p-2">${i + 1}</td>
                        <td class="p-2">${booklist[i].name}</td>
                        <td class="p-2"><button class="btn visit text-white" data-index="0">
                        <a href="${
                          booklist[i].url
                        }" target="_blank" class="text-decoration-none list-unstyled text-white"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
                        </button></td>
                        <td class="p-2"><button class="btn delete text-white pe-2" onclick="deleteBook(${i})" data-index="0">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                        </button></td>
                    </tr>`;
  }
  bookTableBody.innerHTML = cartoona;
}

function deleteBook(deleteindex) {
  booklist.splice(deleteindex, 1);
  localStorage.setItem("booklist", JSON.stringify(booklist));
  displayBooks();
}

function validate(element) {
  var regex = {
    bookName: /^[a-z0-9_-]{3,15}$/,
    bookUrl:
      /https?:\/\/(www\.)?[\w]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    alert.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    alert.classList.remove("d-none");
  }
}
