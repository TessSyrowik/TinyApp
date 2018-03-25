var express = require("express");
var cookieParser = require("cookie-parser");

var app = express();
app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

// ⬇ Used for URLDATABASE & USERID
function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  for (var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
// generateRandomString();



// GET REQUESTS

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/login", (req, res) => {
  var templateVars = {
    username: req.cookies["username"]
  };
  res.render("login", templateVars);
});

// 🍪 Stuff 🍪
app.get('/', function(req, res) { });

app.get("/urls", (req, res) => {
  var templateVars = {
    urls: urlDatabase,
    username: req.cookies["username"]
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

// Takes in value of shortURL and, within the server, communicates the value of the longURL
//    which it has stored as key-value pairs within the object.
app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.id]; // want to use . vs [] because of changing values
  res.redirect(longURL); // ⬆ changed from hard code
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id };
  res.render("urls_show", templateVars);
});

// Registration Page:
app.get("/register", (req, res) => {
    urlDatabase[req.params.id] = req.body.longURL;
  // Make it so you're retrieving info here from reg page
  res.render("urls_register", {urls: urlDatabase});
});



// POST REQUESTS

app.post("/login", (req, res) => {
  res.cookie(["username"], req.body["username"]);
  res.redirect("login");
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("urls")
});

// ⬇ outputs request params to terminal
app.post("/urls", (req, res) => {
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

// Adding the delete function
app.post("/urls/:id/delete", (req, res) => {
  console.log("req.body:" , req.body);
  delete urlDatabase[req.params.id]; // Changed hard code to [req.params.id]
  res.render("urls_index", {urls: urlDatabase});
});

// Updating a post:
app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL;
  // console.log("urlDatabase.params.id:", urlDatabase.b2xVn2);
  // console.log("req.body.longURL", req.body.longURL);
  console.log(req.params.id);
  res.render("urls_index", {urls: urlDatabase});
});



// Posting to the Register:
app.post("/register", (req, res) => {
  let newUser = {};
  users.newUser;// Add new object in global users
  console.log('users.newUser: ', users.newUser);
  newUser.id = generateRandomString();
  console.log('newUser.id: ', newUser.id);
  res.cookie("user_id", users.newUser);
  // Is newUser getting added to my user object? (Must pass other error to find out)

  // Make it so you're retrieving info here from reg page
  res.render("urls_index", users);
  console.log(users);
  console.log('{id: req.cookies.id, email: req.cookies.email, password: req.cookies.pd}: ', {id: req.cookies.id, email: req.cookies.email, password: req.cookies.pd});

  // Task 5: Handle Registration Errors:
  if(!email || !password){
    res.sendStatus(400);
  } else {                       // ⬇ is that the right object reference?
    // const foundUser = users.find((user.id) => {
    //   return users.email === email && users.password === password;
    // });
  }
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
