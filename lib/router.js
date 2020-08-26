module.exports = (app, path) => {
  app.get("/", function(req, res, next) {
    // res.redirect("/api/v1");
    res.redirect("/home");
  });
  app.get("/home", function(req, res, next) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });
  app.get("/api/v1", function(req, res, next) {
    res.json("Bee Boop Bip, welcome in the API :D");
  });
  app.get("/api/v1/getstats/:region/:player", function(req, res, next) {
    const opggScrape = require("opgg-scrape");

    opggScrape
      .getStats(req.params.player, {
        region: req.params.region,
        refresh: false
      })
      .then(stats => {
        console.log(stats);
        res.json(stats);
      })
      .catch(e => {
        res.json("usernotfound");
      });
  });

  app.get("/api/v1/help", function(req, res, next) {
    res.json(
      "Requests available : /api/v1/getstats/region/playername || /api/v1/help || /api/v1 | /home"
    );
  });

  app.get("*", function(req, res, next) {
    res.json(
      "Your request does not exists, go to /api/v1/help please for more help."
    );
  });
};
