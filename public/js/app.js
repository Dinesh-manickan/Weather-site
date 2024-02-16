console.log("Client Side JavaScript file is Loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector('#message1')
const messageSecond = document.querySelector('#message2')



weatherForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const location = search.value
  messageOne.textContent = 'Loading....'
  messageSecond.textContent = ''

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = JSON.stringify(data.error)
        } else {
            messageOne.textContent = JSON.stringify(data)
        }
      });
    }
  );
});
