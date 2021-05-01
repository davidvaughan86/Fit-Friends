const localStategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, userEmail, userID){

        const authenticateUser = async (email, password, done) => {
            const user = userEmail(email)

            //if the user is not in the db, error out

            if(user == null) {
                return dispatchEvent(null, false, {message:'no suer with that email'})
            }
            try {
                if(await bcrypt.compare(password, user.password)){
                    return done(null,user)
                } else {
                    return done(null, false, { message: "password doesnt match"})
                }
            }catch(error) {
                return done(e)
            }
        }
passport.use(new localStategy({usernameField: 'email'}
, authenticateUser))
//logs user in
passport.serializeUser((user, done) => done(null, user.id))
//logs user out
passport.deserializeUser((id, done) => {
    return done(null, userID(id))
})

}

module.exports = initialize;