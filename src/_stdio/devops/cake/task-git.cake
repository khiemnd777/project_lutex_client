#load "task-config.cake"
#load "constants.cake"

Task ("Git-Checkout")
  .Does(() => {
    var config = TaskConfiguration.GetConfig(Context);
    var gitBranch = config.GitBranch;
    var gitRemote = config.GitRemote;
    StartProcess("git", new ProcessSettings{ Arguments = $"checkout -b {gitBranch} {gitRemote}/{gitBranch}" });
  });

Task ("Git-Pull")
  .Does(() => {
    var config = TaskConfiguration.GetConfig(Context);
    var gitMergerName = config.GitMergerName;
    var gitMergerEmail = config.GitMergerEmail;
    var gitPassword = config.GitPassword;
    var gitRemote = config.GitRemote;
    var result = GitPull(Constants.ROOT, gitMergerName, gitMergerEmail, gitMergerEmail, gitPassword, gitRemote);
  });
