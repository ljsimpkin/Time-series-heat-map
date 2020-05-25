import pandas as pd
from geopy.geocoders import Nominatim

x = ["Zimbabwe", "America", "Columbia", \
	"Italy", "Switzerland", \
	"Slovenia", "Austria", "Hungry", "Croatia", "England", "Denmark", \
	"Singapore", "Malaysia", "Thailand", "Cambodia", "Vietnam", "Japan", \
	"Fiji"]

locations = []
geolocator = Nominatim(user_agent="play2")

for place in x:
	print(place)
	try:
		tmp = geolocator.geocode(place)
		locations.append({"place" : place, "coordinates" : [tmp.latitude, tmp.longitude]})
	except:
		print("fail", place)

print(locations)

locations.to_json(r'new_file.json')

# df = pd.DataFrame(locations, columns= ['latitude', 'longitude'])
# df.to_csv (r'places_traveled_gps.csv', index = False, header=True)

# print("final\n", df)

# locations = [[-18.4554963, 29.7468414], [51.44770365, 5.966069282055592], [2.8894434, -73.783892], [42.6384261, 12.674297], [46.7985624, 8.2319736], [45.8133113, 14.4808369], [47.2000338, 13.199959], [47.4193087, 13.2148878], [45.5643442, 17.0118954], [52.7954791, -0.5402402866174321], [55.670249, 10.3333283], [1.357107, 103.8194992], [4.5693754, 102.2656823], [14.8971921, 100.83273], [13.5066394, 104.869423], [13.2904027, 108.4265113], [36.5748441, 139.2394179], [-18.1239696, 179.0122737]]

var places_traveled_gps = [{'place': 'Zimbabwe', 'coordinates': [-18.4554963, 29.7468414]}, {'place': 'America', 'coordinates': [51.44770365, 5.966069282055592]}, {'place': 'Columbia', 'coordinates': [2.8894434, -73.783892]}, {'place': 'Italy', 'coordinates': [42.6384261, 12.674297]}, {'place': 'Switzerland', 'coordinates': [46.7985624, 8.2319736]}, {'place': 'Slovenia', 'coordinates': [45.8133113, 14.4808369]}, {'place': 'Austria', 'coordinates': [47.2000338, 13.199959]}, {'place': 'Hungry', 'coordinates': [47.4193087, 13.2148878]}, {'place': 'Croatia', 'coordinates': [45.5643442, 17.0118954]}, {'place': 'England', 'coordinates': [52.7954791, -0.5402402866174321]}, {'place': 'Denmark', 'coordinates': [55.670249, 10.3333283]}, {'place': 'Singapore', 'coordinates': [1.357107, 103.8194992]}, {'place': 'Malaysia', 'coordinates': [4.5693754, 102.2656823]}, {'place': 'Thailand', 'coordinates': [14.8971921, 100.83273]}, {'place': 'Cambodia', 'coordinates': [13.5066394, 104.869423]}, {'place': 'Vietnam', 'coordinates': [13.2904027, 108.4265113]}, {'place': 'Japan', 'coordinates': [36.5748441, 139.2394179]}, {'place': 'Fiji', 'coordinates': [-18.1239696, 179.0122737]}]