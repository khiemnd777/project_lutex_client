#load "utilities.cake"
#load "constants.cake"
#load "task-fs.cake"

// Clean
Task ("Clean")
  .Does (() =>
  {
    var config = TaskConfiguration.GetConfig(Context);
    var pm2Path = new FilePath("pm2.config.js");
    var envPath = new FilePath(".env");
    Information ("Delete pm2 configuration file.");
    if (FileExists (pm2Path.Path))
    {
      DeleteFile (pm2Path.Path);
    }

    Information ("Delete .env file.");
    if(FileExists(envPath.Path))
    {
      DeleteFile(envPath.Path);
    }
  });

Task ("Clean-Www")
  .Does(() => {
    var wwwroot = $"{Constants.ROOT}wwwroot/";
    Utility.ForceDeleteFile(Context, $"{wwwroot}index.css");
    Utility.ForceDeleteFile(Context, $"{wwwroot}index.css.map");
    Utility.ForceDeleteFile(Context, $"{wwwroot}index.html");
    Utility.ForceDeleteFile(Context, $"{wwwroot}client.html");
    Utility.ForceDeleteFile(Context, $"{wwwroot}index.js");
    Utility.ForceDeleteFile(Context, $"{wwwroot}index.js.map");
    Utility.ForceDeleteFile(Context, $"{wwwroot}server.js");
    Utility.ForceDeleteFile(Context, $"{wwwroot}server.js.map");
  });

// Copy File System.
Task ("Copy-FS")
  .Does (() =>
  {
    var config = TaskConfiguration.ToToken(Context);
    var pm2Path = new FilePath("pm2.config.js");
    var envPath = new FilePath(".env");

    Information("Copy pm2 configuration file.");
    Utility.SaveFileWithTokens(Context, pm2Path.TemplatePath, pm2Path.Path, config);
    
    Information("Copy .env file.");
    Utility.SaveFileWithTokens(Context, envPath.TemplatePath, envPath.Path, config);
  });