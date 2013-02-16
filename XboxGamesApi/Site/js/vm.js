(function (vm, $) {

  // Data
  vm.games = ko.observableArray([]);
  vm.genre = ko.observable("");
  vm.genres = ko.observableArray([]);
  vm.isBusy = ko.observable(false);
  vm.currentPage = ko.observable(1);
  vm.totalPages = ko.observable(0);
  vm.isPhoneGap = ko.observable(false);
  vm.phoneGapInfo = ko.observable(null);

  // Functions
  vm.loadGenres = function () {
    vm.isBusy(true);
    data.getGenres(function (result, error) {
      vm.isBusy(false);
      if (error) {
        amplify.publish("ERROR", "Could not load the Genres");
      } else {
        $.each(result, function (i, item) {
          vm.genres.push(item);
        });
      }
    });
  };

  vm.loadGenre = function () {

    vm.games.removeAll();
    vm.isBusy(true);
    data.getGamesByGenre(vm.genre(), vm.currentPage(), function (result, error) {
      vm.isBusy(false);
      if (error) {
        amplify.publish("ERROR", "Could not load the games for " + genre);
      } else {
        if (result.success) {
          vm.totalPages(result.totalPages);
          $.each(result.results, function (i, item) {
            var cleanName = app.stripCharacters(item.name, String.fromCharCode(8482));
            item.encodedName = encodeURIComponent(cleanName);
            vm.games.push(item);
          });
        } else {
          amplify.publish("ERROR", "Failed to load games.  Server error or non-existent genre");
        }
      }
    });
  };

}(window.vm = window.vm || {}, jQuery));
