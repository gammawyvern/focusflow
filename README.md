# FocusFlow

FocusFlow is a task manager application, with built in time tracking.
This is a learning focused project, combining ASP.NET Core MVC with a modern frontend workflow using Webpack and npm.

## Getting Started

Note that the FocusFlow Project is inside a solution called FocusFlow. The following steps assume you are working from inside the `./FocusFlow/` project.

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js (LTS)](https://nodejs.org/)

### 1. Add a database connection string

Create or update `appsettings.Development.json` with a valid connection string.  
For example, to use SQL Server LocalDB:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=FocusFlowDev;Trusted_Connection=True;"
  }
}
```

You must provide this for the app to run.

### 2. Set up the client UI

```bash
cd FocusFlow/client-ui
npm install
npm run build
```

This compiles frontend assets into `wwwroot/dist`.

### 3. Run the application

```bash
cd ..
dotnet run
```
