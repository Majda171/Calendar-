const currentData = document.querySelector(".curent-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span"),
imageContainer = document.getElementById("month-image-container");

//month images
const monthImages = {
    0: "img/leden.jpg",
    1: "img/unor.jpg",
    2: "img/brezen.jpg",
    3: "img/duben.jpg",
    4: "img/kveten.jpg",
    5: "img/cerven.jpg",
    6: "img/cervenec.jpg",
    7: "img/srpen.jpg",
    8: "img/zari.jpg",
    9: "img/rijen.jpg",
    10: "img/listopad.jpg",
    11: "img/prosinec.jpg"
};
//getting new date
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];

const renderCalendar = () => {
    // first day of month
    let firstDateofMonth = new Date(currYear, currMonth, 1).getDay();
    //last date of month
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDateofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentData.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;


    // control img
    if (monthImages.hasOwnProperty(currMonth)) {
        const imagePath = monthImages[currMonth];
        //actual month img
        imageContainer.innerHTML = `<img src="${imagePath}" alt="${months[currMonth]}" width="100%" height="auto">`;
    } else {
        imageContainer.innerHTML = "";
    }
};

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});