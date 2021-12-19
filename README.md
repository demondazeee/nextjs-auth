## Simple NextJS Authentication

A Simple Test Authentication with Silent Refresh using NextJS and NestJS

### Installation

For Client
```bash
$ cd nextjs-auth
$ cd client
$ npm install
$ npm run dev
```

For Server
```bash
$ cd nextjs-auth
$ cd server
$ npm install
$ npm run start:dev
```

### Config File format

FOR CLIENT
```
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
```

FOR SERVER
```
DB_NAME=testdb
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres

SERVER_PORT=3001
ORIGIN_URL=http://localhost:3000

JWT_KEY=98483C6EB40B6C31A448C22A66DED3B5E5E8D5119CAC8327B655C8B5C4836489
```