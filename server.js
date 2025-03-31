const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const database = require('./data/database');
const swaggerRoute = require('./routes/swagger');
const adminRoute = require('./routes/adminRoute');
const usersRoute = require('./routes/userRoute');
const loginlogoutRoute = require('./routes/loginlogoutRoute');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const cors = require('cors');

const app = express();

//connect to database
database.connectDatabase();

app
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader(
      'Access-Control-Allow-Methods', 
      'POST, GET, PUT, PATCH, OPTIONS, DELETE' 
    );
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'] })) 
  .use(cors({ origin: '*' }))
  .use('', loginlogoutRoute)
  .use('/', adminRoute)
  .use('/', swaggerRoute)
  .use('/', usersRoute);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile); 
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user); 
});

app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : 'Logged Out'
  );
});

app.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
    function (req, res) {
      // Successful authentication, redirect home.
      req.session.user = req.user;
      res.redirect('/');
    }
  );

  
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running and listening on http://localhost:${port}`);
});