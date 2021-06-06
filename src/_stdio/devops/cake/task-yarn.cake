#load "constants.cake"

Task("Yarn-Install")
  .Does(() => {
    Yarn.Install();
    Yarn.FromPath($"{Constants.ROOT}wwwroot").Install();
  });