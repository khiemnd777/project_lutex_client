
Task("PM2-Init")
  .Does(() => {
    Yarn.Add(settings => settings.Package("pm2").Globally());
  });

Task ("PM2-Delete")
  .Does(() => {
    Yarn.RunScript("delete:pm2");
  });

Task ("PM2-Stop")
  .Does(() => {
    Yarn.RunScript("stop:pm2");
  });

Task ("PM2-Start")
  .Does(() => {
    Yarn.RunScript (mode == "debug" ? "start:pm2" : "start:pm2:prod");
  });
