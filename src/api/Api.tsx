import { CitySelectData, DistanceResultObject } from "./Types";
import haversineDistance from "haversine-distance";

export function SearchCities(phrase: string) {
    const randomTimeout = Math.floor(Math.random() * 300 + 10);
    return new Promise<Array<CitySelectData>>((resolve, reject) => {
        console.log("Backend API called with the phrase: " + phrase);
        setTimeout(() => {
            if (phrase.toLowerCase() == "fail") {
                reject("An Error Occured. Your search term was: " + phrase.toString());
            }
            else if (phrase == "*") {
                // if we get * as phrase return everything.
                // This would most likely be disabled on prod environment
                resolve(CityList.map(city => { return { label: city.name, value: city.name } }))
            }
            const filteredCityList = CityList.filter(city => city.name.toLowerCase().includes(phrase.toLowerCase()))
            const selectData = filteredCityList.map(city => { return { label: city.name, value: city.name } })
            resolve(selectData);
        }, randomTimeout);
    });
}

export async function CalculateDistance(userCityList: Array<string>): Promise<Array<DistanceResultObject>> {
    return new Promise((resolve, reject) => {
        const randomTimeout = Math.floor(Math.random() * 1000 + 10);
        setTimeout(() => {
            if (userCityList.some(city => city.toLowerCase() == "dijon")) {
                reject("An error occured while calculating distance to city: 'Dijon'.");
            } else {
                // const a = { lat: 37.8136, lng: 144.9631 }
                const resultList: Array<DistanceResultObject> = [];
                for (let i = 0; i < userCityList.length - 1; i++) {
                    const c1 = CityList.find(c => c.name.toLowerCase() == userCityList[i].toLowerCase());
                    const c2 = CityList.find(c => c.name.toLowerCase() == userCityList[i + 1].toLowerCase());

                    if (c1 && c2) {
                        const distance = haversineDistance(
                            { latitude: c1?.latitude, longitude: c1?.longitude },
                            { latitude: c2?.latitude, longitude: c2?.longitude }
                        );

                        resultList.push({
                            origin: c1.name,
                            destination: c2.name,
                            distance: distance
                        })
                    } else {
                        reject("Could not find information about one or more destinations.")
                    }
                }
                resolve(resultList);
            }

        }, randomTimeout);
    });
}


export const CityList = [
    { id: 0, name: 'Paris', latitude: 48.856614, longitude: 2.352222 },
    { id: 1, name: 'Marseille', latitude: 43.296482, longitude: 5.369780 },
    { id: 2, name: 'Lyon', latitude: 45.764043, longitude: 4.835659 },
    { id: 3, name: 'Toulouse', latitude: 43.604652, longitude: 1.444209 },
    { id: 4, name: 'Nice', latitude: 43.710173, longitude: 7.261953 },
    { id: 5, name: 'Nantes', latitude: 47.218371, longitude: -1.553621 },
    { id: 6, name: 'Strasbourg', latitude: 48.573405, longitude: 7.752111 },
    { id: 7, name: 'Montpellier', latitude: 43.610769, longitude: 3.876716 },
    { id: 8, name: 'Bordeaux', latitude: 44.837789, longitude: -0.579180 },
    { id: 9, name: 'Lille', latitude: 50.629250, longitude: 3.057256 },
    { id: 10, name: 'Rennes', latitude: 48.117266, longitude: -1.677793 },
    { id: 12, name: 'Reims', latitude: 49.258329, longitude: 4.031696 },
    { id: 13, name: 'Le Havre', latitude: 49.494370, longitude: 0.107929 },
    { id: 14, name: 'Saint-Étienne', latitude: 45.439695, longitude: 4.387178 },
    { id: 15, name: 'Toulon', latitude: 43.124228, longitude: 5.928000 },
    { id: 16, name: 'Angers', latitude: 47.478419, longitude: -0.563166 },
    { id: 17, name: 'Grenoble', latitude: 45.188529, longitude: 5.724524 },
    { id: 18, name: 'Dijon', latitude: 47.322047, longitude: 5.041480 },
    { id: 19, name: 'Nîmes', latitude: 43.836699, longitude: 4.360054 },
    { id: 20, name: 'Aix-en-Provence', latitude: 43.529742, longitude: 5.447427 }
];