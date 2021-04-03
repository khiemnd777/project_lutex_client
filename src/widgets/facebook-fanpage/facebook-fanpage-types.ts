export type FacebookFanpageGraphResult = {
  facebookFanpage: FacebookFanpageType;
};

export type FacebookFanpageType = {
  id: string;
  JavascriptSDK: string;
  PageId: string;
  PageName: string;
  Tabs: string;
  Width: number;
  Height: number;
  SmallHeader: boolean;
  AdaptContainerWidth: boolean;
  HideCover: boolean;
  ShowFacepile: boolean;
};
