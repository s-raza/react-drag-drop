import datetime
from app import db

def today():
    return datetime.datetime.today().strftime('%Y-%m-%d')


assoc_campgn_vidtype = db.Table('campgn_vidtype', db.Model.metadata,
                db.Column('id', db.Integer, primary_key=True),
                db.Column('campaign_id', db.Integer, db.ForeignKey('campaign.id')),
                db.Column('video_type_id', db.Integer, db.ForeignKey('video_type.id')))

assoc_vid_vidtype = db.Table('vid_vidtype', db.Model.metadata,
                db.Column('id', db.Integer, primary_key=True),
                db.Column('video_id', db.Integer, db.ForeignKey('video.id')),
                db.Column('video_type_id', db.Integer, db.ForeignKey('video_type.id')))

class Video(db.Model):
    id =db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(255))
    caption = db.Column(db.Text(4096))

    def __repr__(self):
        return self.file_name

class VideoType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    videos = db.relationship('Video', secondary=assoc_vid_vidtype, backref="video_type")
    
    def __repr__(self):
        return self.name

assoc_acc_campgn = db.Table('acc_campgn', db.Model.metadata,
                db.Column('id', db.Integer, primary_key=True),
                db.Column('account_id', db.Integer, db.ForeignKey('account.id')),
                db.Column('campaign_id', db.Integer, db.ForeignKey('campaign.id')))

assoc_sess_campgn = db.Table('sess_campgn', db.Model.metadata,
                db.Column('id', db.Integer, primary_key=True),
                db.Column('session_id', db.Integer, db.ForeignKey('session.id')),
                db.Column('campaign_id', db.Integer, db.ForeignKey('campaign.id')))

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), unique=True, nullable=False)
    num_timeline = db.Column(db.Integer, default=0)
    num_story = db.Column(db.Integer, default=0)
    date_added = db.Column(db.Date, default=today, nullable=False)

    def __repr__(self):
        return self.fname

class Campaign(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(4096))
    name = db.Column(db.String(256))
    video_types =  db.relationship('VideoType', secondary=assoc_campgn_vidtype, backref="campaign")
    accounts =  db.relationship('Account', secondary=assoc_acc_campgn, backref="campaign")

    def __repr__(self):
        return self.path

class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    db._added = db.Column(db.Date, default=today, nullable=False)
    campaigns = db.relationship('Campaign', secondary=assoc_sess_campgn, backref="session")

    def __repr__(self):
        return str(self.date_added)

    def __repr__(self):
        return self.file_name

class Link(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(2083), unique=True, nullable=False)

    def __repr__(self):
        return self.title

