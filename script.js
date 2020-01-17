var appid = "809ca8cb6186d89628eb22d129fb1ffa";
var intervalId;

// set up interval to update time every second
intervalId = setInterval(function () {
    var currentDate = moment().format(`dddd, MMMM Do, YYYY`);
    var currentTime = moment().format('  hh:mm:ss a [EST:]');
    $("#current-date").text(currentDate);
    $("#current-time").text(currentTime);
}, 1000);

function getWeatherInfo(event) {
    event.preventDefault()
    var placeToSearch = $('#weather-input').val()

    console.log(placeToSearch)
    getForecastInfo(placeToSearch)

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${placeToSearch}&APPID=${appid}`




    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var lattatitude = response.coord.lat;
        console.log(lattatitude);
        var longetude = response.coord.lon;
        console.log(longetude);
        var tempInKelvin = response.main.temp
        var tempInFahrenheit = parseFloat(convertKToF(tempInKelvin)).toFixed()
        console.log(tempInFahrenheit)
        var weather = response.weather[0].description
        console.log(weather)
        var speed = response.wind.speed
        console.log(speed)
        var humidity = response.main.humidity
        console.log(humidity)
        var img = response.weather.icon
        console.log(img);
        

        var weatherDiv = $("<div class='weather'>");



        var pOne = $("<h5>").text("temp: " + tempInFahrenheit + "°F");


        weatherDiv.append(pOne);

        var pTwo = $("<h5>").text("description: " + weather);

        weatherDiv.append(pTwo)

        var pThree = $("<h5>").text("wind: " + speed);

        weatherDiv.append(pThree)

        var pFour = $("<h5>").text("humidity: " + humidity);

        weatherDiv.append(pFour)

        var pFive = $("<h5>").text("lattatude: " + lattatitude);

        weatherDiv.append(pFive)

        var pSix = $("<h5>").text("longetude: " + longetude);

        weatherDiv.append(pSix)

       // var pSeven = $("<p>").text("image: " + img);

       // weatherDiv.append(pSeven)


        $("#weather-view").prepend(weatherDiv)

        getForecastInfo(placeToSearch);
        //getUvInfo(placeToSearch);

    })


}

function getForecastInfo(city) {

    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${appid}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)

        //weather for 5 days
        var tempList = response.list

        var tenDayList = tempList.filter(function (day) {
            if (day.dt_txt.includes("12:00")) {
                return true;
            }
            return false;
        })

        for (var i = 0; i < tenDayList.length; i++) {
            var tempMax = tenDayList[i].main.temp_max
            tempMax = parseFloat(convertKToF(tempMax)).toFixed();
            var tempMin = tenDayList[i].main.temp_min
            tempMin = parseFloat(convertKToF(tempMin)).toFixed();
            console.log(tempMin)
            var dateTime = moment(tenDayList[i].dt_txt).format(`dddd, MMMM Do`)
            console.log(dateTime)



            var forecastDiv = $("<div class='forecast'>");


            var pOne = $("<h5>").text("HIGH OF: " + tempMax + "°F");

            forecastDiv.append(pOne)


            var pTwo = $("<h5>").text("LOW OF: " + tempMin + "°F");

            forecastDiv.append(pTwo)


            var pThree = $("<h6>").text( dateTime);

            forecastDiv.append(pThree)



            $("#forecast-view").append(forecastDiv)

        }
    });
}

// function getUvInfo(city) {

//     var queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${appid}&lat=${lattatitude}&lon=${longetude}`


//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response)

//     }


//     )

// };


function convertKToF(temp) {
    return temp * 9 / 5 - 459.67
}



$("#weather-form").on('submit', getWeatherInfo)