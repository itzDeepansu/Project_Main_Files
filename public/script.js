function sendData() {
    const inputField = document.getElementById('inputField');
    const question = inputField.value;

    let answerarea=document.querySelector(".answerarea")
    let div = document.createElement("div")
    div.classList.add("quest")
    div.innerHTML=question;
    answerarea.appendChild(div)

    fetch('/save-question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
    })
    .then(response => {
        if (response.ok) {
            console.log('Question sent successfully');
        } else {
            console.error('Error sending question');
        }
    })
    .catch(error => {
        console.error('Error sending question:', error);
    });
    inputField.value=""
    let divans = document.createElement("div")
    divans.classList.add("answer")
    answerarea.appendChild(divans)
    divans.innerHTML="Wait"
    setTimeout(() => {
        fetch('/get-question', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Answer retrieved:', data);
            divans.innerHTML=data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }, 10000);
}
// document.addEventListener("DOMContentLoaded", (event) => {
//     console.log("DOM fully loaded and parsed");

//     let putianswer=document.querySelector(".answer")
//     setInterval(() => {
//         if (putianswer.innerHTML=='\n            ') {
//             putianswer.classList.add("displaynone")
//         }
//         else{
//             putianswer.classList.remove("displaynone")
//         }
//       });
//     }, 10);