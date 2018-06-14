const express = require('express');
const n = require('nats').connect('nats://nats:4222');
const serviceName = 'gameOf3.';

const HOST = '0.0.0.0';
const PORT = 3000;
const app = express();

n.subscribe(serviceName + 'waiting', (msg, reply, event) => console.log(`WAITING: ${msg}`));
n.subscribe(serviceName + 'won', (msg, reply, event) => console.log(`WINNER: ${msg}`));
n.subscribe(serviceName + 'next', (msg, reply, event) => console.log(`NEXT MOVE: ${msg}`));

app.get('/:player/join', (req, res) => {
    let send = {
        player: req.params.player,
        data: null
    };
    n.subscribe(serviceName + 'error.' + send.player, (msg, reply, event) => console.log(`${msg} : ${reply} : ${event}`));
    n.requestOne(serviceName + 'join', JSON.stringify(send), {}, 1000, msg => {
        res.send(msg);
    });
});

app.get('/:player/move/:num', (req, res) => {
    let send = {
        player: req.params.player,
        data: {
            mutationNumber: parseInt(req.params.num)
        }
    };

    n.requestOne(serviceName + 'move', JSON.stringify(send), {}, 1000, msg => {
        res.send(msg);
    });
});

app.get('/:player/move/minus/:num', (req, res) => {
    let send = {
        player: req.params.player,
        data: {
            mutationNumber: -parseInt(req.params.num)
        }
    };

    n.requestOne(serviceName + 'move', JSON.stringify(send), {}, 1000, msg => {
        res.send(msg);
    });
});

app.get('/:player/stop', (req, res) => {
    let send = {
        player: req.params.player,
        data: null
    };
    n.requestOne(serviceName + 'stop', JSON.stringify(send), {}, 1000, msg => {
        res.send(msg);
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);