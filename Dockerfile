FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /App

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /App
COPY --from=build-env /App/out .
ENTRYPOINT [ "dotnet", "Taskman.dll" ]
# To deploy to Heroku, use the CMD line and comment out ENTRYPOINT
# CMD ASPNETCORE_URLS=http://*:$PORT dotnet Taskman6.dll