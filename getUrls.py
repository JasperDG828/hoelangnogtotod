import requests
import json
key = open("token.txt", "r", encoding="utf8").read()
res = requests.get(
    f"https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={key}&photoset_id={72157719564805156}&user_id={'144570230@N06'}&page=1&format=json&nojsoncallback=1")
resj = json.loads(res.content)
open("resj.json", "w+").write(json.dumps(resj))
urls = []
for i in resj["photoset"]["photo"]:
    serverId = i["server"]
    photoID = i["id"]
    secret = i["secret"]
    urls.append(
        f"https://live.staticflickr.com/{serverId}/{photoID}_{secret}_b.jpg")
    print(i["title"])
open("urls.json", "w+").write(json.dumps(urls))
