var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;


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
}


// ⬇ Needs Global Scope
function generateRandomString() {

}

// Allows us to access POST request params
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.end("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
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


// Last Uncommented
// ⬇ outputs request params to terminal
app.post("/urls", (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});


// Adding the delete function
app.post("/urls/:id/delete", (req, res) => {
  console.log("req.body:" , req.body);
  delete urlDatabase[req.params.id]; // Changed hard code to [req.params.id]
  res.render("urls_index", {urls: urlDatabase});
});

// Last Uncommented
// Updating a post:
app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL;
  // console.log("urlDatabase.params.id:", urlDatabase.b2xVn2);
  // console.log("req.body.longURL", req.body.longURL);
  console.log(req.params.id);
  res.render("urls_index", {urls: urlDatabase});
});



app.post("/register", (req, res) => {
    urlDatabase[req.params.id] = req.body.longURL;
  // Make it so you're retrieving info here from reg page
  res.render("urls_index", {urls: urlDatabase});
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});















