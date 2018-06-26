Game of 3 
-

### Installation

Warning!
~~~
1. Copy .env.example -> .env and docker-compose.example.yml -> docker-compose.yml
2. Pay attention to CLIENT_PORT in .env (by default 3000)
~~~

Docker installation
~~~
https://docs.docker.com/engine/installation/
~~~

Check after docker install
~~~
sudo docker run hello-world
~~~

No sudo docker run
~~~
sudo groupadd docker
sudo usermod -aG docker $USER
~~~

If you get 
~~~
WARNING: Error loading config file: /home/user/.docker/config.json -
stat /home/user/.docker/config.json: permission denied
~~~
do
~~~
sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
sudo chmod g+rwx "/home/$USER/.docker" -R
~~~

Docker auto start
~~~
sudo systemctl enable docker
~~~

### Starting the project

Start project
~~~
./bin/start
~~~

Check containers status
~~~
docker-compose ps
~~~

Stop project
~~~
./bin/stop
~~~

### Game

You can setup game rules in config/game.config.ts

Devider of result to pass to the next player 
~~~
divideBy (by default 3)
~~~
Players count:
~~~
countOfPlayers (by default 2 players)
~~~
Minimum by randomizing initial number
~~~
min (by default 10)
~~~
And maximum by randomizing initial number
~~~
max (by default 100)
~~~

#### Join to the game

When needed count of players achieves, it starts. When the last player joins the game, the first player generates initial
number and passes the movement to the second player. In case of two players it will be the second.
~~~
http://localhost:3000/:PlayerName/join

example for 2 players:
http://localhost:3000/Alex/join  => {"action":"waiting","data":{"online":1,"waiting":1}}
http://localhost:3000/Peter/join => {"action":"move","data":{"player":"Peter","number":33}}
~~~

#### Make move

You can chose the move strongly from -1, 0, 1 (:number must be > 0 in the uri)
~~~
http://localhost:3000/:PlayerName/move/:number (send >=0)
http://localhost:3000/:PlayerName/move/minus/:number (send < 0)

example:
http://localhost:3000/Peter/move/1          => {"action":"move","data":{"player":"Alex","number":7}}
http://localhost:3000/Alex/move/minus/1     => {"action":"move","data":{"player":"Peter","number":2}}
~~~

#### Winner

When somebody wins, you will get this object
~~~
{"action":"won","data":{"player":"John"}}
~~~

#### Stop game

Any player, who participates in the game can stop the game
~~~
http://localhost:3000/:PlayerName/stop => {"sucess" => true}
~~~

### Monitoring logs

You can monitor behavior on the backend side and on client side

Client
~~~
example 1 (container up): docker attach gameof3_client_1 
example 2 (container down): docker start --attach gameof3_client_1
~~~

Backend
~~~
example 1 (container up): docker attach gameof3_game_1 
example 2 (container down): docker start --attach gameof3_game_1
~~~