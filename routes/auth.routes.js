const passport = require("passport");

module.exports = app => {
  // User attempts to login, begin the oAuth flow
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/"); // User logs in, send them to the dashboard
    }
  );

  app.get("/auth/github", passport.authenticate("github"));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      // Does user exist?/ are they logged in?
      res.send(req.user);
    } else {
      res.send("Please Login");
    }
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/"); // User logs out, bring them back to the home page
  });
};
