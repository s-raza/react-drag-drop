from .models import *
from app import db
import os
import logging

log = logging.getLogger(__name__)

class CampaignDB:

    def __init__(self, base_path, folder_data):
        print(folder_data)
        self.folder_data = folder_data
        self.base_path = base_path
        self.sess = db.session

    def add_campaigns(self):
        campaigns_list = []
        for campaign, vidtypes in self.folder_data.items():
            db_obj = Campaign(name=campaign,
                            path=os.path.join(self.base_path, campaign),
                            video_types=self._add_vidtypes(vidtypes))
            campaigns_list.append(db_obj)
        self.sess.add_all(campaigns_list)

        try:
            self.sess.commit()
        except Exception as e:
            log.error("Creating Campaigns in DB: %s", e)
            db.session.rollback()

    def _add_vidtypes(self, vidtypes):
        vidtypes_list = []
        for vidtype, vids in vidtypes.items():
            vidtypes_list.append(VideoType(name=vidtype, videos=self._add_vids(vids)))
        return vidtypes_list

    def _add_vids(self, vids):
        vids_list = []
        for vid in vids:
            vids_list.append(Video(file_name=vid))
        return vids_list

    