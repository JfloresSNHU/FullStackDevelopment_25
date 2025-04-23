const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

// Local strategy for login
passport.use(new LocalStrategy({
  usernameField: 'email',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// ✅ JWT strategy for protected routes
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));
