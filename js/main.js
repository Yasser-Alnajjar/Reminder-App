let form = document.querySelector("#form-control");
let input = document.querySelector("#task_input");
let date_input = document.querySelector("#datetimelocal");
let add_reminder = document.querySelector("#add_reminder");
let reminder_body = document.querySelector("#reminder-body");

form.addEventListener("input", inputNotEmpty);
function inputNotEmpty() {
  if (input.value === "" || date_input.value === "") {
    add_reminder.setAttribute("disabled", true);
  } else {
    add_reminder.removeAttribute("disabled");
  }
}
inputNotEmpty();
let arrItem = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (date_input.value === "") {
    e.preventDefault();
  } else {
    datePiker(new Date(date_input.value), input.value);
  }
  if (input.value !== "") {
    let item = {
      id: new Date().getTime(),
      remindItem: input.value,
    };
    arrItem.push(item);
    reminder_body.innerHTML = "";
    arrItem.forEach((arr) => {
      let div = document.createElement("div");
      div.className = "body_reminder-item";
      div.setAttribute("data-id", arr.id);
      let p = document.createElement("p");
      let pText = document.createTextNode(arr.remindItem);
      p.appendChild(pText);

      let button = document.createElement("button");
      let buttonT = document.createTextNode("X");
      button.classList.add("delete");
      button.id = "delete";
      button.appendChild(buttonT);
      div.appendChild(p);
      div.appendChild(button);
      reminder_body.appendChild(div);
      addComplete(new Date(date_input.value), div);
    });
    input.value = "";
    date_input.value = "";
    console.log(arrItem);
  } else {
    alert("Plese Add Item");
  }
});
reminder_body.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    for (let i = 0; i < arrItem.length; i++) {
      if ((arrItem[i].id = e.target.parentElement.dataset.id)) {
        arrItem = [];
      }
    }
  }
});

function datePiker(neddedDate, value) {
  let counter = setInterval(() => {
    let date = new Date();
    let difference = neddedDate - date;
    console.log(difference);
    if (difference <= 0) {
      clearInterval(counter);
      Notification.requestPermission().then((noti) => {
        if (noti == "granted") {
          new Notification("Reminder App", {
            body: value,
            tag: value,
            icon: "../icon.png",
          });
        }
      });
      /*
      // let modal_container = document.createElement("div");
      // modal_container.className = "modal-container";
      // modal_container.id = "modal-container";
      // modal_container.setAttribute("data-hide", false);
      // let modal_content = document.createElement("div");
      // modal_content.className = "modal-content";
      // let modal_header = document.createElement("div");
      // modal_header.className = "modal-header";
      // let modal_title = document.createElement("h5");
      // modal_title.className = "modal-title";
      // let title_text = document.createTextNode("Remind");
      // modal_title.appendChild(title_text);
      // modal_header.appendChild(modal_title);
      // let button_close = document.createElement("button");
      // button_close.className = "btn-close";
      // let button_closeTxt = document.createTextNode("X");
      // button_close.appendChild(button_closeTxt);
      // modal_header.appendChild(button_close);

      // let modal_body = document.createElement("div");
      // modal_body.className = "modal-body";
      // let time = document.createElement("p");
      // let time_text = document.createTextNode(
      //   day + " " + hours + ":" + minutes
      // );
      // time.appendChild(time_text);
      // modal_body.appendChild(time);
      // let alertP = document.createElement("p");
      // let alertPText = document.createTextNode(
      //   " The time has expired and this is a reminder to you"
      // );
      // alertP.appendChild(alertPText);
      // modal_body.appendChild(alertP);

      // modal_container.appendChild(modal_content);
      // modal_content.appendChild(modal_header);
      // modal_content.appendChild(modal_body);
      // section_modal.appendChild(modal_container);
      // section_modal.setAttribute("data-hide", false);
      */
    }
  }, 1000);
}
/*
// let section_modal = document.querySelector("#section_modal");
// section_modal.addEventListener("click", (e) => {
//   if (e.target.classList.contains("btn-close")) {
//     e.target.parentElement.parentElement.parentElement.remove();
//     section_modal.setAttribute("data-hide", true);
//   }
// });
*/
// let intetval = setTimeout(addComplete, time);
// if (intetval <= 0) {
//   clearTimeout(intetval);
// }
function addComplete(timeOut, div) {
  let date = new Date();
  let difference = timeOut - date;
  console.log(difference);
  setTimeout(() => {
    div.classList.add("completed");
  }, difference);
}
