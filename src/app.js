import express from "express";
import cors from "cors";

const app = express()

app.use(express.json());
app.use(cors());

const tweets= [];
const users = [];

app.post('/sign-up', (req, res) =>{
    let {username, avatar} = req.body;
    const newUser = {
        username,
        avatar
    }
    users.push(newUser);

    res.send("OK")
});

app.post('/tweets', (req,res) => {
    let {username, tweet} = req.body;
    const userAvatar = users.find(u => u.username === username)

    if (!users.find(username)) {
        res.send("UNAUTHORIZED")
    }

    const newTweet = {
        username,
        tweet,
        avatar: userAvatar.avatar
    }

    tweets.push(newTweet);

    res.send('OK')
})

app.get('/tweets', (req, res) => {
    if (tweets.length > 10) {
        const tenTweets = tweets.reverse.slice(0,9);
        res.send(tenTweets);
    }

    res.send(tweets)
})

app.listen(5000, () =>{
    console.log("server running on port 5000")
});