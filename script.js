const form = document.querySelector("form");
form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const location = e.target["pick-a-location"].value;
    console.log(location);
    const url = `https://wttr.in/${location}?format=j1`;
    document.querySelector("form input").value = "";
    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((data) =>{
        console.log(data);
        const display = document.querySelector(".display");
        display.textContent = "";
        display.innerHTML = `<div id="display-location">
                            <h2>${location}</h2>
                        </div>
                        <div id="display-text">
                            <div id="display-area">Area: ${data.nearest_area[0].areaName[0].value}</div>
                            <div id="display-region">Region: ${data.nearest_area[0].region[0].value}</div>
                            <div id="display-country">Country: ${data.nearest_area[0].country[0].value}</div>
                            <div id="display-currently">Currently: ${data.current_condition[0].FeelsLikeF}°F</div>
                        </div>
                        `;
        const historyItem = document.createElement("li");
        historyItem.innerHTML = `<a href="${url}">${data.nearest_area[0].areaName[0].value} - ${data.current_condition[0].FeelsLikeF}°F</a>`;
        const allHistoryItems = document.querySelectorAll("ul li");
        const repeated = false;
        for(const eachItem of allHistoryItems){
            if(eachItem.value === historyItem.value){
                repeated = true;
            }
        }
        const historyList = document.querySelector(".history-items");
        if(!repeated){
            historyList.appendChild(historyItem);
        }
    })
})
