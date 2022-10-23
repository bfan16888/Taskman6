## asp.net core 6 changes:
1. Startup.cs is gone, configure servies and pipelines in program.cs  
2. Beware of <Nullable>enable</Nullable> in .csproj file

## Run docker as regular user (not as root by default)
>sudo groupadd docker
>sudo usermod -aG docker $USER
>newgrp docker 

## build and run docker image
>docker build -t codeturtle/taskman6 .
>docker run -d - p 8080:80 codeturtle/taskman6