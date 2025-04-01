const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to database
const database = require('./data/database');
database.connectDatabase();

// Create Express app
const app = express();

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth configuration
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// CORS configuration
app.use((req, res, next) => {
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
});
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'] }));
app.use(cors({ origin: '*' }));

// Route configuration
const swaggerRoute = require('./routes/swagger');
const adminRoute = require('./routes/adminRoute');
const usersRoute = require('./routes/userRoute');
const loginlogoutRoute = require('./routes/loginlogoutRoute');

app.use('', loginlogoutRoute);
app.use('/', adminRoute);
app.use('/', swaggerRoute);
app.use('/', usersRoute);

// GitHub OAuth callback route
app.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  function (req, res) {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Root route
app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : 'Logged Out'
  );
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running and listening on http://localhost:${port}`);
});

