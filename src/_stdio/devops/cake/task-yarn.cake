#load "constants.cake"

Task("Yarn-Init")
  .Does(() => {
    NpmInstall(settings => settings.AddPackage("yarn").InstallGlobally());
  });

Task("Yarn-Install")
  .Does(() => {
    Yarn.Install();
    Yarn.FromPath($"{Constants.ROOT}wwwroot").Install();
  });