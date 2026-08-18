# Build stage: needs the .NET SDK plus python3 + pandoc, because the csproj
# regenerates wwwroot/generated/ from posts/*.tex before compiling.
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python-is-python3 pandoc \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /src
COPY LatexBlog.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app --no-restore

# Runtime stage: pandoc and python are build-only, the image ships neither.
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app ./
ENV ASPNETCORE_ENVIRONMENT=Production \
    ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "LatexBlog.dll"]
