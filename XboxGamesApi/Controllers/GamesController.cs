using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VideoGames;

namespace XboxGamesApi.Controllers
{
  public class GamesController : ApiController
  {
    GameList _games;

    public GamesController(GameList games)
    {
      _games = games;
    }

    const int PAGE_SIZE = 12;

    // GET api/values
    public object Get(int page = 1, string genre = "")
    {
      try
      {
        Func<Game, bool> filter = g =>
        {
          return (genre == "" ? true : g.Genre.ToLower() == genre.ToLower()) && g.Price > 0 && g.Price < 100;
        };

        var totalCount = _games.Where(filter).Count();

        var totalPages = Math.Ceiling((double)totalCount / PAGE_SIZE);

        var qry = _games.Where(filter)
                        .OrderByDescending(g => g.ReleaseDate);

        var data = qry.Skip((page - 1) * PAGE_SIZE)
                      .Take(PAGE_SIZE)
                      .ToList();

        if (data.Count == 0)
        {
          return new { success = true, count = totalCount, totalPages = totalPages, resultSize = 0 };
        }

        var results = data.Select(g =>
                            new
                            {
                              name = g.Name,
                              genre = g.Genre,
                              releaseDate = g.ReleaseDate.Date.ToShortDateString(),
                              price = g.Price,
                              imageUrl = g.ImageUrl,
                              description = g.Description,
                              rating = g.GameRating.Name
                            }).ToList();

        return new { success = true, count = totalCount, totalPages = totalPages, resultSize = results.Count, results = results };
      }
      catch (Exception ex)
      {
        return new { success = false, error = ex.Message };
      }
    }

    // GET api/values/5
    //public Game Get(int id)
    //{
    //  return _ctx.Games.Where(g => g.GameID == id).FirstOrDefault();
    //}

    // POST api/values
    public void Post([FromBody]Game value)
    {
    }

    // PUT api/values/5
    public void Put(int id, [FromBody]Game value)
    {
    }

    // DELETE api/values/5
    public void Delete(int id)
    {
    }
  }
}