import os
import glob


class FolderContents:

    def __init__(self, base_path):
        self.base_path = base_path
        self.filter = '/*.mp4'
        self._campaigns = {}
        self._api_campaigns = []
        self._populate_campaigns()

    def _populate_campaigns(self):
        try:
            for campaign in sorted(os.listdir(self.base_path)):
                vid_types = self._populate_vidtypes(os.path.join(self.base_path, campaign))
                self._campaigns[campaign] = vid_types[0]
                self._api_campaigns.append({'id': campaign, 'desc': campaign+'_desc', 'vid_types': vid_types[1]})
            return self._campaigns
        except FileNotFoundError:
            self._campaigns = {}
            self._api_campaigns = []

    def _populate_vidtypes(self, campaign):
        vid_types = {}
        vid_types_list = []
        for vidtype in sorted(os.listdir(campaign)):
            vids = self._populate_vids(os.path.join(campaign, vidtype))
            vid_types[vidtype] = vids
            vid_types_list.append({'id': vidtype, 'vids': vids})
        return (vid_types, vid_types_list)

    def _populate_vids(self, vidtype):
        vids = []
        for vid in sorted(glob.glob(vidtype+self.filter)):
            vids.append(os.path.split(vid)[-1])
        return vids

    def get_campaigns(self):
        return self._campaigns

    def api_get_campaigns(self):
        return self._api_campaigns
