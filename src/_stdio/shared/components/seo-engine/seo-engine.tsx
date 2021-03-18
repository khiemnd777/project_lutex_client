import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { mergeObjects } from '_stdio/shared/utils/object.utils';
import SocialMetas from '../social-meta/social-meta';
import SeoEngineModel from './seo-engine-model';

interface SeoEngineArgs {
  title?: string;
  desc?: string;
  type?: string;
  url?: string;
  image?: string;
  fetchFunc?: () => Promise<SeoEngineModel>;
}

const SeoEngine: FunctionalComponent<SeoEngineArgs> = ({ fetchFunc, ...props }) => {
  const { title, desc, image, type, url } = props;
  const [data, setData] = useState({
    title: title,
    description: desc,
    image: image,
    type: type,
    url: url,
  } as SeoEngineModel);
  useEffect(() => {
    !!fetchFunc &&
      fetchFunc().then((result: SeoEngineModel) => {
        const newData = mergeObjects(result, data);
        setData(newData);
      });
  }, []);
  document.title = data.title || '';
  SocialMetas({
    title: data.title,
    desc: data.description,
    image: data.image,
    type: data.type,
    url: data.url,
  });
  return null;
};

export default SeoEngine;
