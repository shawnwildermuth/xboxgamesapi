using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VideoGames;

namespace XboxGamesApi.Controllers
{
  public class GenresController : ApiController
  {
    GameList _games;

    public GenresController(GameList games)
    {
      _games = games;
    }

    // GET api/genres
    public IEnumerable<string> Get()
    {
      return _games.Where(g => !string.IsNullOrWhiteSpace(g.Genre) && g.Price > 0 && g.Price < 100)
                   .Select(g => g.Genre)
                   .Distinct()
                   .OrderBy(g => g);
    }
  }
}
