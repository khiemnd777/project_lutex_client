import { Fragment, FunctionalComponent, h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import StickyAnchor from '_stdio/shared/components/sticky/sticky-anchor';
import PostCatalogsList from './post-catalogs.list';
import { PostCatalogsWidgetArgs } from './post-catalog-interfaces';

const PostCatalogsMobile: FunctionalComponent<PostCatalogsWidgetArgs> = ({
  theme,
  items,
  parameters,
  routerParams,
  totalCount,
  onShowMore,
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [addedSticky, setAddedSticky] = useState(false);
  const refEl = useRef<HTMLDivElement>(null);
  const stickyHandler = (sticky: boolean) => {
    setAddedSticky(sticky);
    setOpen(!sticky);
  };
  return (
    <Fragment>
      <StickyAnchor stickyRef={refEl} handler={stickyHandler} />
      <PostCatalogsList
        ref={refEl}
        theme={theme}
        items={items}
        parameters={parameters}
        routerParams={routerParams}
        totalCount={totalCount}
        onShowMore={onShowMore}
        sticky={addedSticky}
        open={open}
        setOpen={setOpen}
        responsiveFor="mobile"
      />
    </Fragment>
  );
};

export default PostCatalogsMobile;
