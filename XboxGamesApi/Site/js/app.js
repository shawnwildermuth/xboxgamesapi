(function (app, $) {

  app.rootUrl = "/";

  app.relativeUrl = function (url) {
    if (url.charAt(0) == "/") {
      return app.rootUrl + url.slice(1);
    } else {
      return app.rootUrl + url;
    }
  };

  app.stripCharacters = function (s, bad) {
    while (s.indexOf(bad) > -1) {
      s = s.replace(bad, "");
    }

    return s;
  };

}(window.app = window.app || {}, jQuery));
