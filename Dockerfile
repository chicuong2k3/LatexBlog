# Build stage: needs the .NET SDK plus python3 + pandoc, because the csproj
# regenerates wwwroot/generated/ from posts/*.{tex,md} before compiling, and
# Node for the Tailwind `npm install` / `npm run css` targets in LatexBlog.csproj.
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        python3 python-is-python3 pandoc curl ca-certificates gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /src
# Cache npm deps before the full COPY so package.json edits alone don't bust the layer.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY LatexBlog.csproj ./
COPY external/Unpoly.Blazor/src/Unpoly.Blazor/Unpoly.Blazor.csproj external/Unpoly.Blazor/src/Unpoly.Blazor/
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
