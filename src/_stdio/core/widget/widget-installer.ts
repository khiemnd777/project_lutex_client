import axios from 'axios';
import { API_HOST } from '_stdio/environment';
import { IWidgetInstaller } from './widget-interfaces';
import { WidgetInstallerType } from './widget-types';

export class WidgetInstaller implements IWidgetInstaller {
  name?: string;
  friendlyName?: string;
  defaultParameters?: Record<string, any>;

  constructor(defaultParameters?: Record<string, any>) {
    this.defaultParameters = defaultParameters;
  }

  PrepareData() {
    return {
      Name: this.name,
      FriendlyName: this.friendlyName,
      Parameters: this.defaultParameters,
    } as WidgetInstallerType;
  }

  async Setup(data: WidgetInstallerType) {
    const result = await axios.post(`${API_HOST}widget/setup`, data);
    return result.data;
  }
  async Upgrade(data: WidgetInstallerType) {
    const result = await axios.post(`${API_HOST}widget/upgrade`, data);
    return result.data;
  }
  async Uninstall(name: string) {
    const result = await axios.post(`${API_HOST}widget/uninstall`, { Name: name });
    return result.data;
  }
  async IsSetup(name: string) {
    const result = await axios.get(`${API_HOST}widget/exists/${name}`);
    return result.data as boolean;
  }
}
