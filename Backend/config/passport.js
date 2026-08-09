
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        // Aqui normalmente guardaríamos o usuário numa base de dados
        // Por agora, só passamos o perfil do Google adiante
        const user = {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
        };
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;