#load "file-path.cake"

using Cake.Core;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public class TaskConfigurationModel 
{
  [JsonProperty("CONFIGURATION")]
  public string Configuration { get; set; }
  [JsonProperty("ENVIRONMENT")]
  public string Environment { get; set; }
  [JsonProperty("PM2_NAME")]
  public string Pm2Name { get; set; }
  [JsonProperty("PM2_SCRIPT")]
  public string Pm2Script { get; set; }
  [JsonProperty("API_SECURE")]
  public bool? ApiSecure { get; set; }
  [JsonProperty("API_HOST")]
  public string ApiHost { get; set; }
  [JsonProperty("API_PORT")]
  public int? ApiPort { get; set; }
  [JsonProperty("CLIENT_SECURE")]
  public bool? ClientSecure { get; set; }
  [JsonProperty("CLIENT_HOST")]
  public string ClientHost { get; set; }
  [JsonProperty("CLIENT_PORT")]
  public int? ClientPort { get; set; }
  [JsonProperty("DIST")]
  public string Dist { get; set; }
  [JsonProperty("THEME")]
  public string Theme { get; set; }
  [JsonProperty("THEME_DISPLAY_NAME")]
  public string ThemeDisplayName { get; set; }
  [JsonProperty("GIT_PROVIDER")]
  public string GitProvider { get; set; }
  [JsonProperty("GIT_BRANCH")]
  public string GitBranch { get; set; }
  [JsonProperty("GIT_MERGER_NAME")]
  public string GitMergerName { get; set; }
  [JsonProperty("GIT_MERGER_EMAIL")]
  public string GitMergerEmail { get; set; }
  [JsonProperty("GIT_USERNAME")]
  public string GitUserName { get; set; }
  [JsonProperty("GIT_PASSWORD")]
  public string GitPassword { get; set; }
  [JsonProperty("GIT_REMOTE")]
  public string GitRemote { get; set; }
}

public static class TaskConfiguration 
{
  public static object _objectLock  = new object();

  private static TaskConfigurationModel _config;

  public static TaskConfigurationModel GetConfig (ICakeContext context) 
  {
    if(_config != null) return _config;
    lock(_objectLock)
    {
      var configBuildPath = new FilePath("build.config.json");
      _config = context.DeserializeJsonFromFile<TaskConfigurationModel>(configBuildPath.Path);
      return _config;
    }
  }

  public static JObject ToToken(ICakeContext context) {
    if(_config != null) 
    {
      return JObject.FromObject(_config);
    }
    return null;
  }
}
