$(document).ready(function(){

   $('#term').focus(function(){
      var full = $("#weather").has("img").length ? true : false;
      if(full == false){
         $('#weather').empty();
      }
   });

  var getWeather = function(){

    var city = $('#term').val();

    if(city == ''){
      $('#weather').html("<h3 class='loading'>Please do enter something.</h3>");
    } else {

      // $('#weather').html("<h3 class='loading'>Your weather is on its way!</h3>");
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ab3251240497651078458a349a360dd7&units=metric", function(json) {
        if (json.message != "Error: Not found city"){
          if (json.message == city) { //newly added If/else, please verify it works @myself
            $('#weather').html("<h3 class='loading'>The current temperature in " + json.name + " is: " + json.main.temp + " degrees centigrade.</p>");
          } else {
            $('#weather').html("<h3 class='loading'>No results were found for '" + city + "'. Please make sure you enter a valid city name.");
          }
        } else {
          $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Eindhoven&appid=ab3251240497651078458a349a360dd7&units=metric&callback=?", function(json) {
            $('#weather').html('<h3 class="loading">I am afraid no city was found for that search. So here is the weather temperature in Eindhoven: <br />' + json.main.temp + " degrees centigrade.</h3>");
          });
        }
      });
    }
    return false;
  }

  $('#search').click(getWeather);
  $('#term').keyup(function(event){
    if(event.keyCode == 13){
      getWeather();
    }
  });
});
