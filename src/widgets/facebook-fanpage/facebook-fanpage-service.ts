import { gql, useQuery } from '@apollo/client';
import { FacebookFanpageGraphResult } from './facebook-fanpage-types';

export const GraphFacebookFanpage = () => {
  return useQuery<FacebookFanpageGraphResult>(gql`
    query {
      facebookFanpage {
        id
        JavascriptSDK
        PageId
        PageName
        Tabs
        Width
        Height
        SmallHeader
        AdaptContainerWidth
        HideCover
        ShowFacepile
      }
    }
  `);
};
