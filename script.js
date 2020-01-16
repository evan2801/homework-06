var appid = "809ca8cb6186d89628eb22d129fb1ffa";
var intervalId;

// set up interval to update time every second
intervalId = setInterval(function() {
    var currentTime = moment().format('dddd, MMMM Do, YYYY [at] hh:mm:ss a [EST:]');
    $("#current-time").text(currentTime);
}, 1000);

function getWeatherInfo(event) {
    event.preventDefault()
    var placeToSearch = $('#weather-input').val()

    console.log(placeToSearch)
    getForecastInfo(placeToSearch)

   var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${placeToSearch}&APPID=${appid}`




    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)
        var tempInKelvin = response.main.temp
        var tempInFahrenheit = convertKToF(tempInKelvin)
        console.log(tempInFahrenheit)
        var weather = response.weather[0].description
        console.log(weather)
        var speed = response.wind.speed
        console.log(speed)
        var humidity = response.main.humidity
        console.log(humidity)

        var weatherDiv = $("<div class='weather'>");

        

        var pOne = $("<p>").text("temp: " + tempInFahrenheit);


        weatherDiv.append(pOne);

        var pTwo = $("<p>").text("description: " + weather);

        weatherDiv.append(pTwo)

        var pThree = $("<p>").text("wind: " + speed);

        weatherDiv.append(pThree)  
        
        var pFour = $("<p>").text("humidity: " + humidity);

        weatherDiv.append(pFour)  


        $("#weather-view").prepend(weatherDiv)

        getForecastInfo(placeToSearch);

    })


}

function getForecastInfo(city) {
    
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${appid}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        
        console.log(response)

        //weather for 5 days
        var tempList = response.list

        var fiveDayList = tempList.filter(function(day) {
            if (day.dt_txt.includes("12:00")) {
                return true;
            }
            return false;
        })

        for (var i = 0; i < fiveDayList.length; i++) {
            var tempMin = fiveDayList[i].main.temp_min
            tempMin = convertKToF(tempMin)
            console.log(tempMin)
            var tempMax = fiveDayList[i].main.temp_max
            tempMax = convertKToF(tempMax)
            var dateTime = fiveDayList[i].dt_txt
            console.log(dateTime)

            

            var forecastDiv = $("<div class='forecast'>");


            var pOne = $("<p>").text("low of: " + tempMin);

            forecastDiv.append(pOne)

            var pTwo = $("<p>").text("high of: " + tempMax);

            forecastDiv.append(pTwo)

            var pThree = $("<p>").text("date: " + dateTime);

            forecastDiv.append(pThree)



            $("#forecast-view").prepend(forecastDiv)

        }
        // first temp high
  
    
        // second  temp low


        //date of temp
    })


}


function convertKToF(temp) {
    return temp * 9 / 5 - 459.67
}



$("#weather-form").on('submit', getWeatherInfo)