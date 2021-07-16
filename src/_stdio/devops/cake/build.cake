#load "inject.cake"
#load "file-path.cake"
#load "utilities.cake"
#load "task-config.cake"
#load "task-fs.cake"
#load "task-git.cake"
#load "task-yarn.cake"
#load "task-pm2.cake"

Setup(context =>
{
  var config = TaskConfiguration.GetConfig(Context);
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
    var config = TaskConfiguration.GetConfig(Context);
    Yarn.RunScript (config.Configuration == "debug" ? "build:dev" : "build");
  });

Task ("Build-Ssr")
  .Does (() =>
  {
    var config = TaskConfiguration.GetConfig(Context);
    Yarn.RunScript (config.Configuration == "debug" ? "build:ssr:dev" : "build:ssr");
  });

var target = Argument("target", "Default");
var config = TaskConfiguration.GetConfig(Context);

// Rollback
var rollbackTask = Task("Rollback");
if(config.Environment == "development") {
  rollbackTask
    .IsDependentOn("Clean")
    .IsDependentOn ("Clean-Www")
    .Does(() => {

    });
} 
else 
{
  rollbackTask
    .IsDependentOn("PM2-Init")
    .IsDependentOn("PM2-Stop")
    .IsDependentOn("PM2-Delete")
    .IsDependentOn("Clean")
    .IsDependentOn ("Clean-Www")
    .Does(() => {

    });
}

// Update task
var updateTask = Task ("Update");
if(envMode == "development"){
  updateTask
    .IsDependentOn ("Clean")
    .IsDependentOn ("Clean-Www")
    .IsDependentOn ("Copy-FS")
    .IsDependentOn ("Git-Checkout")
    .IsDependentOn ("Git-Pull")
    .IsDependentOn ("Yarn-Install")
    .IsDependentOn ("Build")
    .IsDependentOn ("Build-Ssr")
    .Does (() =>
    {
      Information("Update with {0} environment.", envMode);
    });
}else{
  updateTask
    .IsDependentOn ("Clean")
    .IsDependentOn ("Clean-Www")
    .IsDependentOn ("Copy-FS")
    .IsDependentOn ("Git-Checkout")
    .IsDependentOn ("Git-Pull")
    .IsDependentOn ("Yarn-Install")
    .IsDependentOn ("Build")
    .IsDependentOn ("Build-Ssr")
    .IsDependentOn ("PM2-Stop")
    .IsDependentOn ("PM2-Start")
    .Does (() =>
    {
      Information("Update with {0} environment.", envMode);
    });
}

// Default task.
var defaultTask = Task("Default");
if(config.Environment == "development")
{
  defaultTask
    .IsDependentOn ("Clean")
    .IsDependentOn ("Clean-Www")
    .IsDependentOn ("Copy-FS")
    .IsDependentOn ("Git-Checkout")
    .IsDependentOn ("Git-Pull")
    .IsDependentOn ("Yarn-Init")
    .IsDependentOn ("Yarn-Install")
    .IsDependentOn ("Build")
    .IsDependentOn ("Build-Ssr")
    .Does(() => {

    });
} 
else 
{
  defaultTask
    .IsDependentOn ("Clean")
    .IsDependentOn ("Clean-Www")
    .IsDependentOn ("Copy-FS")
    .IsDependentOn ("Yarn-Init")
    .IsDependentOn ("PM2-Init")
    .IsDependentOn ("PM2-Stop")
    .IsDependentOn ("Git-Checkout")
    .IsDependentOn ("Git-Pull")
    .IsDependentOn ("Yarn-Install")
    .IsDependentOn ("Build")
    .IsDependentOn ("Build-Ssr")
    .IsDependentOn ("PM2-Start")
    .Does(() => {

    });
}
defaultTask.OnError(exception => {
  RunTarget("Rollback");
});

RunTarget(target);