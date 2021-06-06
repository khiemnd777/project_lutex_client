#load "inject.cake"
#load "file-path.cake"
#load "utilities.cake"
#load "task-config.cake"
#load "task-fs.cake"
#load "task-git.cake"

var target = Argument("target", "Default");
var config = TaskConfiguration.GetConfig(Context);

Setup(context =>
{
  Information("Building with {0} environment and {1} mode.", config.Environment, config.Configuration);      
});

Teardown(context => {
  var config = TaskConfiguration.GetConfig(Context);
  Information("Built with {0} environment and {1} mode.", config.Environment, config.Configuration);
});

// Build
Task ("Build")
  .Does (() =>
  {
    Yarn.RunScript (config.Configuration == "debug" ? "build:dev" : "build");
  });

Task ("Build-Ssr")
  .Does (() =>
  {
    Yarn.RunScript (config.Configuration == "debug" ? "build:ssr:dev" : "build:ssr");
  });

// Rollback
var rollbackTask = Task("Rollback");
if(envMode == "development") {
  rollbackTask
    .IsDependentOn("Clean")
    .Does(() => {

    });
} else {
  Task("Rollback")
  .IsDependentOn("PM2-Init")
  .IsDependentOn("PM2-Stop")
  .IsDependentOn("PM2-Delete")
  .IsDependentOn("Clean")
  .Does(() => {

  });
}

// Default task.
var defaultTask = Task("Default");
if(config.Environment == "development")
{
  defaultTask
    .IsDependentOn ("Clean")
    .IsDependentOn ("Copy-FS")
    .IsDependentOn ("Yarn-Install")
    .IsDependentOn ("Git-Checkout")
    .IsDependentOn ("Git-Pull")
    .IsDependentOn ("Build")
    .IsDependentOn ("Build-Ssr")
    .Does(() => {

    });
} 
else 
{
  defaultTask
    .IsDependentOn ("Clean")
    .IsDependentOn ("Copy-FS")
    .IsDependentOn ("Yarn-Install")
    .IsDependentOn ("PM2-Init")
    .IsDependentOn ("PM2-Stop")
    .IsDependentOn ("Git-Checkout")
    .IsDependentOn ("Git-Pull")
    .IsDependentOn ("Build")
    .IsDependentOn ("Build-Ssr")
    .IsDependentOn ("PM2-Start")
    .Does(() => {

    });
}
defaultTask.OnError(exception => {
  RunTask("Rollback");
});

RunTarget(target);