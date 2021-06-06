#load "constants.cake"

public struct FilePath {
  public string Path { get; set; }
  public string TemplatePath { get; set; }

  public FilePath (string fileName) {
    this.Path = $"{Constants.ROOT}{fileName}";
    this.TemplatePath = $"{Constants.ROOT_BUILD}{Constants.TEMPLATE_PATH}{fileName}.template";
  }
}