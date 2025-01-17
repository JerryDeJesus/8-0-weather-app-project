const form = document.querySelector("form");


form.addEventListener("submit", (e)=>{
    e.preventDefault();

    let location = e.target["pick-a-location"].value;
    console.log(location);
    let url = `https://wttr.in/${location}?format=j1`;
    document.querySelector("form input").value = "";
    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((data) =>{
        console.log(data);
        let placeholder = document.querySelector("#history-placeholder");
        placeholder.style.visibility = "hidden";
        const replace = document.querySelector("#replace");
        replace.textContent = "";
        replace.innerHTML = `
        <div id="display-location">
            <h2>${location}</h2>
        </div>
        <div id="display-text">
            <div id="display-area"><b>Area:</b> ${data.nearest_area[0].areaName[0].value}</div><br>
            <div id="display-region"><b>Region:</b> ${data.nearest_area[0].region[0].value}</div><br>
            <div id="display-country"><b>Country:</b> ${data.nearest_area[0].country[0].value}</div><br>
            <div id="display-currently"><b>Currently:</b> ${data.current_condition[0].FeelsLikeF}°F</div>
        </div>
        `;
        
        const future = document.querySelector(".future");
        future.innerHTML = `
        <div id="today"><br>    <b>Today</b>
        <br><br>
        <b>Average Temperature:</b> ${data.weather[0].avgtempF}°F
        <br><br>
        <b>Min Temperature:</b> ${data.weather[0].mintempF}°F
        <br><br>
        <b>Max Temperature:</b> ${data.weather[0].maxtempF}°F   </div> 
        
        <div id="tomorrow"><br>     <b>Tomorrow</b>
        <br><br>
        <b>Average Temperature:</b> ${data.weather[1].avgtempF}°F
        <br><br>
        <b>Min Temperature:</b> ${data.weather[1].mintempF}°F   
        <br><br>
        <b>Max Temperature:</b> ${data.weather[1].maxtempF}°F</div>

        <div id="dayafter"><br>     <b>Day After Tomorrow</b>
        <br><br>
        <b>Average Temperature:</b>${data.weather[2].avgtempF}°F
        <br><br>
        <b>Min Temperature:</b> ${data.weather[2].mintempF}°F   
        <br><br>
        <b>Max Temperature:</b> ${data.weather[2].maxtempF}°F</div>`

            let historyList = document.querySelector(".history-items");

            let historyItem = document.createElement("li");
            historyItem.innerHTML = `<a class="previous-search" href="#">${data.nearest_area[0].areaName[0].value}</a> - ${data.current_condition[0].FeelsLikeF}°F`;
   
            historyList.append(historyItem);

            historyList.addEventListener("click", (e)=>{
                e.preventDefault();
            
        
                let location = e.target.textContent;
                console.log(location);
                let url = `https://wttr.in/${location}?format=j1`;
                document.querySelector("form input").value = "";
                fetch(url)
                .then((response)=>{
                    return response.json();
                })
                .then((data) =>{
                    console.log(data);
                    const replace = document.querySelector("#replace");
                    replace.textContent = "";
                    replace.innerHTML = `
                    <div id="display-location">
                        <h2>${location}</h2>
                    </div>
                    <div id="display-text">
                        <div id="display-area"><b>Area:</b> ${data.nearest_area[0].areaName[0].value}</div><br>
                        <div id="display-region"><b>Region:</b> ${data.nearest_area[0].region[0].value}</div><br>
                        <div id="display-country"><b>Country:</b> ${data.nearest_area[0].country[0].value}</div><br>
                        <div id="display-currently"><b>Currently:</b> ${data.current_condition[0].FeelsLikeF}°F</div>
                    </div>
                    `;
                
                    const future = document.querySelector(".future");
                    future.innerHTML = `
                    <div id="today"><br>    <b>Today</b>
                    <br><br>
                    <b>Average Temperature:</b> ${data.weather[0].avgtempF}°F
                    <br><br>
                    <b>Min Temperature:</b> ${data.weather[0].mintempF}°F
                    <br><br>
                    <b>Max Temperature:</b> ${data.weather[0].maxtempF}°F   </div> 
                    
                    <div id="tomorrow"><br>     <b>Tomorrow</b>
                    <br><br>
                    <b>Average Temperature:</b> ${data.weather[1].avgtempF}°F
                    <br><br>
                    <b>Min Temperature:</b> ${data.weather[1].mintempF}°F   
                    <br><br>
                    <b>Max Temperature:</b> ${data.weather[1].maxtempF}°F</div>
            
                    <div id="dayafter"><br>     <b>Day After Tomorrow</b>
                    <br><br>
                    <b>Average Temperature:</b>${data.weather[2].avgtempF}°F
                    <br><br>
                    <b>Min Temperature:</b> ${data.weather[2].mintempF}°F   
                    <br><br>
                    <b>Max Temperature:</b> ${data.weather[2].maxtempF}°F</div>`
                })
                .catch(console.log);
            })
        })
    .catch(console.log);
})

// a.addEventListener("click", (e)=>{
//     e.preventDefault();

// })
