#addin nuget:?package=Cake.FileHelpers&version=4.0.1
#addin nuget:?package=Cake.Yarn&version=0.4.8
#addin nuget:?package=Cake.Npm&version=1.0.0
#addin nuget:?package=Cake.Json&version=6.0.1
#addin nuget:?package=Cake.Git&version=1.0.1
#addin nuget:?package=Newtonsoft.Json&version=11.0.2

#load "file-path.cake"
#load "utilities.cake"

var target = Argument("target", "Default");

var pm2Path = new FilePath("pm2.config.js");
var envPath = new FilePath(".env");
var configBuildPath = new FilePath("build.config.json");

// Configuration
var config = ParseJsonFromFile(configBuildPath.Path);
var mode = config["CONFIGURATION"].ToString();
var envMode = config["ENVIRONMENT"].ToString();

Information(mode);
Information(envMode);

// Clean
Task ("Clean")
  .Does (() =>
  {
    // Delete pm2 configuration file.
    if (FileExists (pm2Path.Path))
    {
      Console.WriteLine ("Delete pm2 configuration file.");
      DeleteFile (pm2Path.Path);
    }
    // Delete .env
    if(FileExists(envPath.Path))
    {
      Console.WriteLine ("Delete .env file.");
      DeleteFile(envPath.Path);
    }
  });

Task ("Copy-FS")
  .Does (() =>
  {
    // Copy pm2 configuration file.
    if (FileExists (pm2Path.TemplatePath))
    {
      Console.WriteLine ("Copy pm2 configuration file.");
      var pm2TemplateRead = FileReadText (pm2Path.TemplatePath);
      // Replace tokens
      Utility.BindTokenText (Context, pm2TemplateRead, config)
        .Save(pm2Path.Path);
    }
    // Copy .env file.
    if(FileExists(envPath.TemplatePath))
    {
      Console.WriteLine ("Copy .env file.");
      var envTemplateRead = FileReadText (envPath.TemplatePath);
      // Replace tokens
      Utility.BindTokenText (Context, envTemplateRead, config)
        .Save(envPath.Path);
    }
  });

Task("Default")
  .Does(() => {
    
  });

RunTarget(target);