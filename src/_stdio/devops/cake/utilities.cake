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
}
