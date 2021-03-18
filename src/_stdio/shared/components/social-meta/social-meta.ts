import createMetaTags from '../meta-tag/meta-tag';

export type SocialMetaModel = {
  title?: string;
  type?: string;
  url?: string;
  image?: string;
  desc?: string;
};

const SocialMetas = (model: SocialMetaModel) => {
  const { title, type, url, image, desc } = model;
  createMetaTags(
    [
      { name: 'title', content: title },
      { name: 'description', content: desc },
    ],
    'Meta Tags'
  );
  createMetaTags(
    [
      { property: 'og:title', content: title },
      { property: 'og:site_name', content: title },
      { property: 'og:type', content: type || 'website' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:description', content: desc },
    ],
    'Open Graph / Facebook'
  );
};

export default SocialMetas;
