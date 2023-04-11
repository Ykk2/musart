from app.models import db, Video, environment, SCHEMA

def seed_videos():
    videos = [
        {
            "owner_id": 1,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-After+Hanabi+-Listen+to+My+Beats--(1080p).mp4",
            "title": "After Hanabi -Listen to My Beats",
            "description": "After Hanabi -Listen to My Beats",
            "total_views": 999,
            "preview_image": "https://i.ytimg.com/vi/0jFzOnDQmA4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAVAcbCHrA9Rn2v0iqoNkrretD11Q"
        },
        {
            "owner_id": 2,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-Logic+-+All+I+Do+(Official+Audio)-(1080p).mp4",
            "title": "All I Do (Official Audio)",
            "description": "All I Do (Official Audio)",
            "total_views":500000,
            "preview_image": "https://i.ytimg.com/an_webp/ZPhfVXQDU2Y/mqdefault_6s.webp?du=3000&sqp=CL6mjZ0G&rs=AOn4CLDLcn2xPCBRjUN_u6sZNhT3Id9B5w"
        },
        {
            "owner_id": 3,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-RYAN+HAYASHI+on+Penn+%26+Teller+FOOL+US+-+Complete+Version+With+EPIC+EMOTIONAL+ENDING-(1080p)+(1).mp4",
            "title": "RYAN HAYASHI on Penn & Teller FOOL US - Complete Version With EPIC EMOTIONAL ENDING",
            "description": "RYAN HAYASHI on Penn & Teller FOOL US - Complete Version With EPIC EMOTIONAL ENDING",
            "total_views": 1000000,
            "preview_image": "https://i.ytimg.com/an_webp/kjURsDCIJws/mqdefault_6s.webp?du=3000&sqp=CLiNjZ0G&rs=AOn4CLAw4QU7TlUcvcWJE5pVbxMmrY6S2w"
        },
        {
            "owner_id": 1,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-Why+Black+Hole+Environments+Are+a+Lot+More+Complicated+Than+We+Thought-(720p60).mp4",
            "title": "Why Black Hole Environments Are a Lot More Complicated Than We Thought",
            "description": "Why Black Hole Environments Are a Lot More Complicated Than We Thought",
            "total_views": 2000000,
            "preview_image": "https://i.ytimg.com/an_webp/kjURsDCIJws/mqdefault_6s.webp?du=3000&sqp=CLiNjZ0G&rs=AOn4CLAw4QU7TlUcvcWJE5pVbxMmrY6S2w"
        },
        {
            "owner_id": 4,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-Tracy+McGrady+13+Points+in+33+Seconds-(480p).mp4",
            "title": "Tracy McGrady 13 Points in 33 Seconds",
            "description": "Tracy McGrady 13 Points in 33 Seconds",
            "total_views": 400000,
            "preview_image": "https://i.ytimg.com/an_webp/kjURsDCIJws/mqdefault_6s.webp?du=3000&sqp=CLiNjZ0G&rs=AOn4CLAw4QU7TlUcvcWJE5pVbxMmrY6S2w"
        },
        {
            "owner_id": 4,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-The+Office+%E2%80%93+How+Michael+Scott+Makes+a+Sale-(1080p).mp4",
            "title": "The Office - How Michael Scott Makes a Sale",
            "description": "The Office - How Michael Scott Makes a Sale",
            "total_views": 400000,
            "preview_image": "https://i.ytimg.com/an_webp/kjURsDCIJws/mqdefault_6s.webp?du=3000&sqp=CLiNjZ0G&rs=AOn4CLAw4QU7TlUcvcWJE5pVbxMmrY6S2w"
        },
        {
            "owner_id": 5,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-Pretty+Lights+-+Finally+Moving+-+Taking+Up+Your+Precious+Time.mp4",
            "title": "Pretty Lights - Finally Moving",
            "description": "Pretty Lights - Finally Moving",
            "total_views": 600000,
            "preview_image": "https://i.ytimg.com/an_webp/kjURsDCIJws/mqdefault_6s.webp?du=3000&sqp=CLiNjZ0G&rs=AOn4CLAw4QU7TlUcvcWJE5pVbxMmrY6S2w"
        },
        {
            "owner_id": 2,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-OPPENHEIMER+Trailer+(2023)-(1080p).mp4",
            "title": "OPPENHEIMER Trailer (2023)",
            "description": "OPPENHEIMER Trailer (2023)",
            "total_views": 300000,
            "preview_image": "https://i.ytimg.com/an_webp/kjURsDCIJws/mqdefault_6s.webp?du=3000&sqp=CLiNjZ0G&rs=AOn4CLAw4QU7TlUcvcWJE5pVbxMmrY6S2w"
        },
        {
            "owner_id": 5,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-Novak+Djokovic+vs+Sebastian+Korda+EPIC+%EF%BF%BD%EF%BF%BD+_+Adelaide+2022+Final+Highlights-(1080p).mp4",
            "title": "Novak Djokovic vs Sebastian Korda",
            "description": "Novak Djokovic vs Sebastian Korda",
            "total_views": 8000000,
            "preview_image": "https://i.ytimg.com/an_webp/kjURsDCIJws/mqdefault_6s.webp?du=3000&sqp=CLiNjZ0G&rs=AOn4CLAw4QU7TlUcvcWJE5pVbxMmrY6S2w"
        },
        {
            "owner_id": 5,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-Naoya+_Monster_+Inoue+_+All+Knockouts-(1080p).mp4",
            "title": "Naoya Monster Inoue All Knockouts",
            "description": "Naoya Monster Inoue All Knockouts",
            "total_views": 9000000,
            "preview_image": "https://i.ytimg.com/an_webp/kjURsDCIJws/mqdefault_6s.webp?du=3000&sqp=CLiNjZ0G&rs=AOn4CLAw4QU7TlUcvcWJE5pVbxMmrY6S2w"
        }
    ]

    for video in videos:
        new_video = Video(
            owner_id = video['owner_id'],
            video_url = video['video_url'],
            title = video['title'],
            description = video['description'],
            total_views = video['total_views'],
            preview_image = video['preview_image']
        )
        db.session.add(new_video)

    db.session.commit()

def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM videos")

    db.session.commit()
