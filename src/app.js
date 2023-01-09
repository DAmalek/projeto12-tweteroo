import express from 'express';
import cors from 'cors';
 
const app = express();

app.use(cors());
app.use(express.json());

const tweets = [];
const users = [];


app.post('/sign-up', (req, res) => {
    const { username, avatar} = req.body;

    // if (!username || !avatar){
    //     res.status(400).send({ message: "Insira todos os campos namoral" });
    //     return;
    // }

    const novoUser = {
        username,
        avatar,
    }

    users.push(novoUser);
    res.status(201).send('vai la usuario!')
})



app.post('/tweets', (req, res) => {
    const { username, tweet} = req.body;

    if (!username || !tweet) {
      res.status(400).send({ message: "Insira todos os campos namoral" });
      return;
    }

    const novoTweet = {
        username,
        tweet,
    }

    tweets.push(novoTweet);
    res.status(201).send('tweets enviado')
})

app.get('/tweets', (req, res) => {
    const lastTweets = [];
    for (let i = 10; i > 0; i--) {
      const lTweet = tweets[tweets.length - i];
      if (lTweet !== null && lTweet !== undefined) {
        const userAvatar = users.find(u => u.username === lTweet.username);
        const fullTweet = {
            username: lTweet.username,
            avatar: userAvatar.avatar,
            tweet: lTweet.tweet
        }
        lastTweets.push(fullTweet);
      }
    }

    res.send(lastTweets);

})
''
app.listen(5000, () => {
console.log('server running in port 5000')


});