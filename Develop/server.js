const mysql = require('mysql2');
// You need the following required:
// path
const path = require('path');
// express
const express = require('express');
// express-handlebars
const exphbs = require('express-handlebars');
// helpers (if you are putting timestamps on posts)
const helpers = require('./utils/helper');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/config");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    // For password sessions
    cookie: {
          expires: 5 * 60 * 1000
    },
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    store: new SequelizeStore({
      db: sequelize
    }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
