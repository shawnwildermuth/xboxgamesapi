(function (main, $) {

  main.initialize = function () {

    // Wire up the Error Handling Message
    amplify.subscribe("ERROR", function (error) {
      if (vm.isPhoneGap()) {
        navigator.notification.alert(
            error, 
            null,  
            'Error', 
            'Ok'
            );
      } else {
        $("#errorAlert").show();
        $("#errorText").text(error);
      }
    });

    // Detect the internet connection
    var canProceed = true;
    if (vm.isPhoneGap()) {
      if (navigator.network.connection) { // Version < 2.2
        if (navigator.network.connection == Connection.NONE) {
          amplify.publish("ERROR", "No Network Connection found. Please reconnect and run the application again.");
          canProceed = false;
        }
      } else if (navigator.connection) {   // Version 2.2
        if (navigator.connection == Connection.NONE) {
          amplify.publish("ERROR", "No Network Connection found. Please reconnect and run the application again.");
          canProceed = false;
        }
      }
    }

    if (canProceed) {
      ko.applyBindings(vm);
      vm.loadGenres();
    }

    // Menu Wiring
    $("#genre-select").on("change", function () {
      if (this.selectedIndex != 0) {
        var genre = $(this).val();
        vm.genre(genre);
        vm.currentPage(1);
        vm.loadGenre();
      }
    });

    $("#nextButton").on("click", function (e) {
      if (!$(this).parent().hasClass("disabled")) {
        vm.currentPage(vm.currentPage() + 1);
        vm.loadGenre();
      }
      e.preventDefault();
      return false;
    });

    $("#prevButton").on("click", function (e) {
      if (!$(this).parent().hasClass("disabled")) {
        vm.currentPage(vm.currentPage() - 1);
        vm.loadGenre();
      }
      e.preventDefault();
      return false;
    });

    $("#firstButton").on("click", function (e) {
      if (!$(this).parent().hasClass("disabled")) {
        vm.currentPage(1);
        vm.loadGenre();
      }
      e.preventDefault();
      return false;
    });

    $("#lastButton").on("click", function (e) {
      if (!$(this).parent().hasClass("disabled")) {
        vm.currentPage(vm.totalPages());
        vm.loadGenre();
      }
      e.preventDefault();
      return false;
    });
  };

  var router = $.sammy("#main", function () {

    var routes = [
      {
        path: "#/",
        name: "Games",
        view: "#home-page"
      },
      {
        path: "#/about",
        name: "About",
        view: "#about-page"
      },
    ];

    var me = this;

    function addRoute(route) {
      $(".view").effect("blind", 250, function () {
        $(route.view).show("blind", 250);
      });
      $(".nav li").removeClass("active");
      $(".nav li a:contains(" + route.name + ")").parent().addClass("active");
    }

    $.each(routes, function (i, item) {
      me.get(item.path, function (ctx) {
        addRoute(item);
      });
    });
  });

  if (window.cordova) {
    // We're in phonegap so set some basics

    app.rootUrl = "http://xboxgamesapi.azurewebsites.net/";

    // Add flag for use in app
    vm.isPhoneGap(true);
    vm.phoneGapInfo(window.device);

    // handle the startup differently
    document.addEventListener("deviceready", function () {
      router.run("#/");
      main.initialize();
    });
  } else {

    // We're in the browser...
    $(document).ready(function () {
      router.run("#/");
      main.initialize();
    });
  }

}(window.main = window.main || {}, jQuery));
