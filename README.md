## asp.net core 6 changes:
1. Startup.cs is gone, configure servies and pipelines in program.cs  
2. Beware of <Nullable>enable</Nullable> in .csproj file

## Run docker as regular user (not as root by default)
>sudo groupadd docker
>sudo usermod -aG docker $USER
>newgrp docker 

## Build and run docker image
>docker build -t codeturtle/taskman6 .
>docker run -d -p 8080:80 codeturtle/taskman6

## Deploy to heroku
>heroku container:login
>heroku create ct-taskman6
>heroku container:push web -a ct-taskman6
>heroku container:release web -a ct-taskman6
# https://ct-taskman6.herokuapp.com/ | https://git.heroku.com/ct-taskman6.git
# https://dev.to/alrobilliard/deploying-net-core-to-heroku-1lfe