import passport from 'passport';
import passportLocal from 'passport-local';
import GitHubStrategy from 'passport-github2';
import envConfig from './env.config.js';
import { MODEL_USER } from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/index.js';

const PORT = process.env.PORT;
const localStrategy = passportLocal.Strategy

const initializePassport = () => {

    passport.use('github', new GitHubStrategy(
    {
        clientID: envConfig.githubClientId,
        clientSecret: envConfig.githubClientSecret,
        callbackUrl: `http://localhost:${PORT}/api/sessions/githubcallback`
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log("Profile obtenido del usuario: ");
        console.log(profile);

        try {
            const user = await MODEL_USER.findOne({ email: profile._json.email })
            console.log("Usuario encontrado para login:");
            console.log(user);

            if (!user) {
                console.warn("User doesn't exists with username: " + profile._json.email);
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.email,
                    password: '',
                    loggedBy: "GitHub"
                }
                const result = await MODEL_USER.create(newUser)
                done(null, result)
            }
            else {
                return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },

        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                const exists = await MODEL_USER.findOne({ email })
                if (exists) {
                    return { code: 400, status: 'Usuario ya existe' };
                }

                const isAdmin = email.startsWith('admin');

                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    role: isAdmin ? 'admin' : 'user'
                }
                const result = await MODEL_USER.create(user);

                return done(null, result)

            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }

        }
    ));

    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const user = await MODEL_USER.findOne({ email: username })
                if (!user) {
                    console.warn("User doesn't exist with username: " + username);
                    return done(null, false)
                }
                if (!isValidPassword(user, password)) {
                    return done(null, false)
                }
                return done(null, user);
            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await MODEL_USER.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });

}



export default initializePassport;
