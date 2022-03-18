# Frontend Angular Ubisoft Test

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run `ng build --prod` to build the project in production mode.

## Features

you will find two pages in this project. The first page makes a call to the backend api `http://localhost:3000` and retrieves the number of twitch viewers for the game `Rainbow Six Siege`.

The second page displays a graph to compare viewers for various games.

These two features use the same component `twitch.component.ts` and service `twitch.service.ts` for data recovery and are link to the backend with a WebSocket named `webSocket.service.ts`


### Display a single game

The data retrieval function is `getNumbersViewsByGameName`, the input parameter `gameStr` is the name of the game in `string` format.

The recovered data is sent to the component `single-game.component.ts` to be displayed.

### Display multiple games

The data retrieval function is `getNumbersViewsByGameName`, the input parameter `gameStr` is the name of the different games in `string` format separated by commas.

The recovered data is sent to the component `multiple-game.component.ts` to be displayed.
