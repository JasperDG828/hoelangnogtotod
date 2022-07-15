import requests
import json
key = open("token.txt", "r", encoding="utf8").read()
res = requests.get(
    f"https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={key}&photoset_id={72177720300554180}&user_id={'144570230@N06'}&page=1&format=json&nojsoncallback=1")
res2 = requests.get(
    f"https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={key}&photoset_id={72177720300525806}&user_id={'144570230@N06'}&page=1&format=json&nojsoncallback=1")
resj = json.loads(res.content)
resj2 = json.loads(res2.content)
urls = []
# I know, bit of repetition, but its 10:12PM Ok?
for i in resj["photoset"]["photo"]:
    serverId = i["server"]
    photoID = i["id"]
    secret = i["secret"]
    urls.append(
        f"https://live.staticflickr.com/{serverId}/{photoID}_{secret}_b.jpg")
for i in resj2["photoset"]["photo"]:
    serverId = i["server"]
    photoID = i["id"]
    secret = i["secret"]
    urls.append(
        f"https://live.staticflickr.com/{serverId}/{photoID}_{secret}_b.jpg")
open("urls2022.json", "w+").write(json.dumps(urls))
