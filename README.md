# rc-telephony-event-explorer
Explore RingCentral telephony session events live

## Installation

### Clone the repo
Open your terminal and run this command in the folder you want to install the app to. Where you choose install it doesn't really matter.
```
git clone https://github.com/DQGriffin/rc-telephony-event-explorer.git
```

### Install dependencies
Run this command in the root of the project
```
npm install
```

### Create .env file
In the root of the project, create a file named '.env' (sans quotes) and populate it with your credentials

| Variable | Description | Notes |
|----------|-------------|-------|
| NEXT_PUBLIC_RC_SERVER_URL | RC platform server URL                              | Required |
| ACCESS_TOKEN              | An access token for the account                     | Optional |
| RC_CLIENT_ID              | The client ID of the app you're authing against     | Not required if ACCESS_TOKEN is set |
| RC_CLIENT_SECRET          | The client secret of the app you're authing against | Not required if ACCESS_TOKEN is set |
| RC_JWT                    | A JWT registered in the account you're monitoring   | Not required if ACCESS_TOKEN is set |

### Build the app
Run this command in the root of the project
```
npm run build
```

### Run that bad boy
Run this command and head over to http://127.0.0.1:3000
```
npm start
```

## Usage
The UI is aplit in three columns. The left-most column will populate with telephony session IDs as sessions come in. Selecting a session will populate the center column with events belonging to that telephony session. Clicking an event will populate a tree in the right-most column with the body of the event.
