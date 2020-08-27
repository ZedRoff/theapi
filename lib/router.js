module.exports = (app, path) => {
  const config = require("../config/config.json");
  // Main routes
  app.get("/", function(req, res, next) {
    // res.redirect("/api/v1");
    res.redirect("/home");
  });
  app.get("/home", function(req, res, next) {
    res.render(path.join(__dirname, "../views/index.ejs"));
  });
  app.get("/api/v1", function(req, res, next) {
    res.json(
      "Bee Boop Bip, welcome in the API :D || Go to /api/v1/help for more informations."
    );
  });
  app.get("/api/v1/help", function(req, res, next) {
    res.send(
      "Requests available : /api/v1/lol/getstats/region/playername || /api/v1/help || /api/v1 | /home <br />Pages available : /home || /fortnite | /lol"
    );
  });

  app.get("/lol", function(req, res, next) {
    res.render(path.join(__dirname, "../views/lol.ejs"));
  });

  app.get("/fortnite", function(req, res, next) {
    res.render(path.join(__dirname, "../views/fortnite.ejs"));
  });
  // LoL routes

  app.get("/api/v1/lol/getstats/:region/:player", function(req, res, next) {
    const opggScrape = require("opgg-scrape");

    opggScrape
      .getStats(req.params.player, {
        region: req.params.region,
        refresh: false
      })
      .then(stats => {
    
        res.json(stats);
      })
      .catch(e => {
        res.json("usernotfound");
      });
  });

  // Fortnite routes

  app.get("/api/v1/fortnite/getstats/:platform/:player", function(
    req,
    res,
    next
  ) {
    const Client = require("fortnite");

    const fortnite = new Client(process.env.TRN);

    fortnite.user(req.params.player, req.params.region).then(stats => {
  if(stats.code == 404) {
    res.json("usernotfound")
  }else {
      res.json(stats);
  }
    });

    // res.json(config['TRN'])
  });

  // 404

  app.get("*", function(req, res, next) {
    res.json(
      "Your request does not exists, go to /api/v1/help please for more help."
    );
  });
};
