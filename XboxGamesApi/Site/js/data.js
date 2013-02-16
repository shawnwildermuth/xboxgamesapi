(function (data, $) {

  data.getGenres = function (callback) {

    var url = app.relativeUrl("api/1/genres");

    // Authenticate
    $.getJSON(url).success(function (result) {
      callback(result);
    })
    .error(function (e) {
      callback(null, "Error retrieving genres");
    });
  };

  data.getGamesByGenre = function (genre, page, callback) {

    var url = app.relativeUrl("api/1/games?genre=" + genre + "&page=" + page);

    // Authenticate
    $.getJSON(url).success(function (result) {
      callback(result);
    })
    .error(function (e) {
      callback(null, "Error retrieving games in " + genre + " genre.");
    });
  };

} (window.data = window.data || {}, jQuery));
