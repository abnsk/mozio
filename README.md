# Some Notes
* No Redux or similar state management system since it's just a 2 page app and communication between pages are done via querystring parameters.
* Similarly no css preprocessors or libraries. Adding them would increase the development time and complexity in such a small scoped project.
* Certain features are impleted in a very basic way. For example instead of using something like a toast library there's a small timeout function with same functionality. 
* I've converted mock db from array of arrays to an object array and gave each city a ID value.

## Libraries
* For form management it uses [react-hooks-form](https://www.react-hook-form.com/)
* Only custom input is [react-select](https://github.com/JedWatson/react-select/tree/master#readme)
* Routing is done via [React Router](https://github.com/remix-run/react-router#readme)
* Distance calcuation https://github.com/dcousens/haversine-distance

# How to Build/Run
Project was developed using
```
$ npm -v    : 8.1.2
$ node -v   : v16.13.2
```

In order to start app in development mode
```
npm run dev
```

To Build
```
npm build
```