using Cake.Core;
using Cake.Core.Text;
using Cake.Common.Text;
using Cake.Core.Annotations;
using Newtonsoft.Json.Linq;

public class Utility {
  // Bind token to text.
  public static TextTransformation<TextTransformationTemplate> BindTokenText(ICakeContext context, string text, JObject config) 
  {
    var textTransform = context.TransformText (text, "{{", "}}");
    foreach(var token in config)
    {
      switch(token.Value.Type)
      {
        case JTokenType.Boolean:
        {
          textTransform.WithToken(token.Key, token.Value.ToObject<string>().ToLower());  
        }
        break;
        default:
        {
          textTransform.WithToken(token.Key, token.Value);
        }
        break;
      }
    }
    return textTransform;
  }

  // Save file with tokens
  public static void SaveFileWithTokens(ICakeContext context, string templatePath, string distPath, JObject tokens)
  {
    if(context.FileExists(templatePath))
    {
      var templateRead = context.FileReadText (templatePath);
      // Replace tokens
      Utility.BindTokenText (context, templateRead, tokens)
        .Save(distPath);
    }
  }
}
