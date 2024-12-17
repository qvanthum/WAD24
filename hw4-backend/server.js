const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));


app.use(express.json());
app.use(cookieParser());

const secret = "jadfkjhasifhiusdbfijasbciashfihdivhiasucbiasuhd"; // use a stronger secret
const maxAge = 60 * 60; //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

const checkAuth = request => {
    const token = request.cookies.jwt;
    let authenticated = false; // a user is not authenticated until proven the opposite
    let userId;
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log(err.message);
                console.log('token is not verified');
            } else {
                console.log('author is authenticated');
                authenticated = true;
                userId = decoded.id;
            }
        });
    }
    return { authenticated, userId };
};

// is used to check whether a user is authinticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const result = checkAuth(req);
    res.status(result.authenticated ? 200 : 400).send({ authenticated: result.authenticated });
});

// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password, } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, name, password) values ($1, $2, $3) RETURNING *", [email, "User 1", bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', async(req, res) => {
    try {
        console.log(req.body)
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        /* 
        To authenticate users, you will need to compare the password they provide with the one in the database. 
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function. 
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison. 
        If the password matches the hash, the result is true.

        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password. 
        If both are equal then it returns true else returns false.
        */

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

app.post('/post', async (req, res) => {
    try {
        const { text } = req.body;
        const result = checkAuth(req);

        if (!result.authenticated) {
            res.status(403).send("not authenticated");
        }

        if (!text) {
            res.status(400).send("'text' not provided")
        }
        await pool.query(
            "INSERT INTO posts(user_id, post_text) VALUES ($1, $2)", [result.userId, text]
        )

        res.status(201).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

app.delete('/post/:id', async (req, res) => {
    try {
        const authInfo = checkAuth(req);

        if (!authInfo.authenticated) {
            res.status(403).send("not authenticated");
        }

        if (!req.params.id) {
            res.status(400).send("invalid id param");
        }

        await pool.query(
            "DELETE FROM posts WHERE id = $1", [req.params.id]
        );

        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

app.patch('/post/:id', async (req, res) => {

});

// deletes all posts
app.delete('/post', async (req, res) => {
    try {
        const authInfo = checkAuth(req);

        if (!authInfo.authenticated) {
            res.status(403).send("not authenticated");
        }

        await pool.query(
            "DELETE FROM posts WHERE 1=1"
        );

        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

app.get('/post/list', async (req, res) => {
    try {
        const authInfo = checkAuth(req);

        if (!authInfo.authenticated) {
            res.status(403).send("not authenticated");
        }

        const result = await pool.query(
            "SELECT * FROM posts p LEFT JOIN users u ON p.user_id = u.id"
        );

        res.status(200).json(result.rows.map((p) => ({
            id: p.id,
            userId: p.user_id,
            postDate: p.post_date,
            postText: p.post_text,
            likes: p.likes,
            authorName: p.name,
            authorEmail: p.email,
            authorProfilePic: p.profile_pic_path,
        })));
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});