const createMetaTags = (tags: {}[], type: string) => {
  tags.forEach((element: {}, index: number) => {
    const attribute = Object.keys(element)[0];
    const content = (element['content'] as string) || '';
    const existedTag = document.querySelector(`meta[${attribute}='${element[attribute]}']`) as HTMLMetaElement;
    if (!!existedTag) {
      existedTag.content = content;
      return;
    }
    if (index === 0) {
      const comment = document.createComment(type);
      document.getElementsByTagName('head')[0].appendChild(comment);
    }
    const link = document.createElement('meta');
    link.setAttribute(attribute, element[attribute]);
    link.content = content;
    document.getElementsByTagName('head')[0].appendChild(link);
  });
};

export default createMetaTags;
