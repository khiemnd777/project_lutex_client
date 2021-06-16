export const getQueryVariable = (variable: string) => {
  const query = window.location.search.substring(1);
  console.log(query); //"app=article&act=news_content&aid=160990"
  const vars = query.split('&');
  console.log(vars); //[ 'app=article', 'act=news_content', 'aid=160990' ]
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    console.log(pair); //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return undefined;
};
