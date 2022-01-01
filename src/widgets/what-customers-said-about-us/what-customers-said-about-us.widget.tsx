import first from 'lodash-es/first';
import isEmpty from 'lodash-es/isEmpty';
import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { Fragment, FunctionalComponent, h } from 'preact';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { parseBool } from '_stdio/shared/utils/string.utils';
import { WhatCustomersSaidAboutUsWidgetArgs } from './what-customers-said-about-us-interfaces';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { DefaultParams } from './what-customers-said-about-us-constants';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import ImageContainer from '_stdio/shared/components/image-container/image-container';
import { VisualizedPostType } from 'widgets/featured-posts/featured-posts-types';
import { GraphTextFields } from 'widgets/text-field/text-field-services';
import { TextFieldType } from 'widgets/text-field/text-field-types';
import marked from 'marked';
import { RatingFiveStars } from '_stdio/shared/components/rating-five-stars/rating-five-stars';
import { useState } from 'preact/hooks';
import { disableBodyScrolling, enableBodyScrolling } from '_stdio/shared/utils/dom.utils';

const WhatCustomersSaidAboutUsWidget: FunctionalComponent<WhatCustomersSaidAboutUsWidgetArgs> = ({
  theme,
  backgroundColor,
  data,
  parameters,
  loading,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const useHqPicture = parseBool(GetParameterValue('useHqPicture', parameters, DefaultParams));
  const titleTextFieldName = GetParameterValue('titleTextField', parameters, DefaultParams);
  const descriptionTextFieldName = GetParameterValue('descriptionTextField', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  const titleTextField = GraphTextFields(titleTextFieldName);
  var title =
    !!titleTextField.data && !titleTextField.loading && !titleTextField.error && !!size(titleTextField.data.textFields)
      ? first(titleTextField.data.textFields)
      : ({} as TextFieldType);
  const descriptionTextField = GraphTextFields(descriptionTextFieldName);
  var description =
    !!descriptionTextField.data &&
    !descriptionTextField.loading &&
    !descriptionTextField.error &&
    !!size(descriptionTextField.data.textFields)
      ? first(descriptionTextField.data.textFields)
      : ({} as TextFieldType);
  const posts = map(data, (fpost) => {
    const post = fpost.Post;
    const title = fpost.Title || post?.Title;
    const subTitle = post?.SubTitle;
    const short = post?.Short;
    const routerPath = post?.Router ? post?.Router.Path : fpost.Router?.Path;
    const url = buildRouterPath(routerPath, post);
    const cover = first(fpost.Media) || first(post?.Cover);
    const catalog = post?.Catalog;
    const catalogName = catalog?.DisplayName;
    const catalogUrl = buildRouterPath(catalog?.Router?.Path, catalog);
    return {
      Title: title,
      SubTitle: subTitle,
      Short: short,
      Rate: post?.Rate,
      Url: url,
      CreatedAt: post?.createdAt,
      Cover: cover,
      CatalogName: catalogName,
      CatalogUrl: catalogUrl,
      ShowTitle: true,
    } as VisualizedPostType;
  });
  return (
    <Fragment>
      <div
        style={{ 'background-color': backgroundColor || 'inherit' }}
        class={cx('what_customers_said_about_us', !isEmpty(data) ? 'visible' : null)}
      >
        <div class={cx('container')}>
          {title && title.Content ? (
            <div class={cx('title')} dangerouslySetInnerHTML={{ __html: marked(title.Content) }}></div>
          ) : null}
          {description && description.Content ? (
            <div class={cx('description')} dangerouslySetInnerHTML={{ __html: marked(description.Content) }}></div>
          ) : null}
          {size(posts) ? (
            <PostItemsBuilder theme={theme} styleName={styleName} posts={posts} useHqPicture={useHqPicture} />
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

interface PostBuilderArgs {
  theme: ThemeType;
  styleName: string;
  posts?: VisualizedPostType[];
  useHqPicture: boolean;
}

const PostItemsBuilder: FunctionalComponent<PostBuilderArgs> = ({ posts, theme, styleName, useHqPicture }) => {
  const cx = BuildClassNameBind(theme.Name, styleName);
  const [coverUrl, setCoverUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [rate, setRate] = useState<number | undefined>(0);
  const [short, setShort] = useState<string>('');
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  return (
    <Fragment>
      <div class={cx('post_items_container')}>
        {map(posts, (post) => {
          const cover = GetSingleMedia(
            post.Cover,
            useHqPicture ? MediaFormatEnums.ordinary : MediaFormatEnums.thumbnail
          );
          return (
            <div class={cx('post_item')}>
              <div class={cx('post_item_container')}>
                <ImageContainer
                  className={cx('post_item_cover', 'image_container')}
                  src={cover?.url}
                  alt={post.Cover?.Caption}
                />
                <div class={cx('post_item_info')}>
                  <div class={cx('post_item_title')}>
                    <span>{post.Title}</span>
                  </div>
                  <div class={cx('post_item_sub_title')}>
                    <span>{post.SubTitle}</span>
                  </div>
                  {/* Rating via 5 stars */}
                  <div class={cx('post_item_rate')}>
                    <RatingFiveStars rate={post.Rate ?? 0} />
                  </div>
                  <div class={cx('post_item_short')}>{post.Short}</div>
                  <div class={cx('post_item_action')}>
                    <div
                      class={cx('post_item_next_button')}
                      onClick={() => {
                        setCoverUrl(cover.url);
                        setTitle(post.Title);
                        setSubTitle(post.SubTitle);
                        setRate(post.Rate);
                        setShort(post.Short);
                        setOpenDetail(true);
                        disableBodyScrolling();
                      }}
                    >
                      Xem tiếp
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Detail dialog */}
      {openDetail ? (
        <div>
          <div class={cx('dialog_wrapper')}>
            <div class={cx('dialog')}>
              <div class={cx('dialog_content')}>
                <div class={cx('post_item')}>
                  <div class={cx('post_item_container')}>
                    <ImageContainer className={cx('post_item_cover', 'image_container')} src={coverUrl} />
                    <div class={cx('post_item_info')}>
                      <div class={cx('post_item_title')}>
                        <span>{title}</span>
                      </div>
                      <div class={cx('post_item_sub_title')}>
                        <span>{subTitle}</span>
                      </div>
                      {/* Rating via 5 stars */}
                      <div class={cx('post_item_rate')}>
                        <RatingFiveStars rate={rate ?? 0} />
                      </div>
                      <div class={cx('post_item_short', 'detail')}>{short}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class={cx('dialog_close_wrapper')}>
            <div
              class={cx('dialog_close')}
              onClick={() => {
                enableBodyScrolling();
                setOpenDetail && setOpenDetail(false);
              }}
            >
              <div></div>
              <div></div>
            </div>
          </div>
          <div class={cx('overlay')}></div>
        </div>
      ) : null}
    </Fragment>
  );
};

WidgetFactory.Register(
  'what_customers_said_about_us',
  'What customers said about us',
  WhatCustomersSaidAboutUsWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
