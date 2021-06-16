import classNames from 'classnames/bind';
import { find, map, size } from 'lodash-es';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import Button from '_stdio/shared/components/button/button';
import styles from './widget-config.styled.scss';

const cx = classNames.bind(styles);

const WidgetConfig: FunctionalComponent = () => {
  const widgets = WidgetFactory.GetWidgets();
  const listWidgets = map(widgets, (widget) => {
    return widget;
  });
  const [installedWidgets, setInstalledWidgets] = useState(
    [] as { name: string; installed: boolean; hasInstaller: boolean }[]
  );
  const [beingClick, setBeingClick] = useState(false);
  const clickHandler = async (action: () => Promise<any>) => {
    setBeingClick(true);
    await action();
    setBeingClick(false);
  };
  const updateInstalledWidgets = (name: string, installed: boolean) => {
    const copiedInstalledWidgets = [...installedWidgets];
    const foundInstalledWidget = find(copiedInstalledWidgets, (installedWidget) => {
      return installedWidget.name === name;
    });
    if (foundInstalledWidget) {
      foundInstalledWidget.installed = installed;
      setInstalledWidgets(copiedInstalledWidgets);
    }
  };
  useEffect(() => {
    const listPromises = map(listWidgets, async (widget) => {
      let installed = false;
      if (widget.installer) {
        installed = await widget.installer.IsSetup(widget.name);
      }
      return {
        name: widget.name,
        installed,
        hasInstaller: !!widget.installer,
      };
    });
    // for (let inx = 0; inx < size(listPromises); inx++) {
    //   const promise = listPromises[inx];
    //   void promise.then((result) => {
    //     const copiedInstalledWidgets = [...installedWidgets];
    //     copiedInstalledWidgets.push(result);
    //     setInstalledWidgets(copiedInstalledWidgets);
    //   });
    // }
    void Promise.all(listPromises).then((result) => {
      setInstalledWidgets(result);
    });
  }, []);
  return (
    <div class={cx('widget_config')}>
      <div class={cx('container')}></div>
      {map(listWidgets, (widget) => {
        const foundInstalledWidget = find(installedWidgets, (installedWidget) => installedWidget.name === widget.name);
        return (
          <div class={cx('item')}>
            <div class={cx('container')}>
              <span class={cx('text')}>{widget.friendlyName}</span>
            </div>
            <div class={cx('container')}>
              <span class={cx('text')}>{widget.name}</span>
            </div>
            <div class={cx('container')}>
              <span class={cx('text')}>{widget.installer ? `Ready to install` : `Unknown`}</span>
            </div>
            <div class={cx('container')}>
              <span class={cx('text')}>
                {foundInstalledWidget ? (foundInstalledWidget.installed ? `Installed` : `Not yet`) : null}
              </span>
            </div>
            <div class={cx('container')}>
              {foundInstalledWidget ? (
                foundInstalledWidget.installed ? (
                  <Fragment>
                    <Button
                      value={`Upgrade`}
                      classed={cx('button', 'primary', beingClick ? 'disabled' : null)}
                      onClick={async () => {
                        await clickHandler(
                          async () => await widget.installer?.Upgrade(widget.installer?.PrepareData())
                        );
                        updateInstalledWidgets(widget.name, true);
                      }}
                    />
                    <Button
                      value={`Uninstall`}
                      classed={cx('button', 'secondary', beingClick ? 'disabled' : null)}
                      onClick={async () => {
                        await clickHandler(async () => await widget.installer?.Uninstall(widget.name));
                        updateInstalledWidgets(widget.name, false);
                      }}
                    />
                  </Fragment>
                ) : (
                  <Button
                    value={`Install`}
                    classed={cx('button', 'primary', beingClick ? 'disabled' : null)}
                    onClick={async () => {
                      await clickHandler(async () => {
                        await widget.installer?.Setup(widget.installer?.PrepareData());
                      });
                      updateInstalledWidgets(widget.name, true);
                    }}
                  />
                )
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WidgetConfig;
