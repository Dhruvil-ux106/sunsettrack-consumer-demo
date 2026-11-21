# SunsetTrack Consumer Demo

A working Express.js application demonstrating [SunsetTrack](https://www.npmjs.com/package/sunsettrack), an npm package for managing API deprecation lifecycles, tracking legacy endpoint usage, and generating migration reports.

## Features

- Integrates SunsetTrack with Express.js.
- Registers deprecated API routes.
- Supports dynamic route parameters.
- Automatically generates deprecation and sunset headers.
- Provides successor API links.
- Tracks deprecated endpoint usage.
- Exposes a migration report endpoint.

## Tech Stack

- Node.js
- Express.js 4
- SunsetTrack 0.1.0

## Installation

Clone the repository:

```bash
git clone https://github.com/Dhruvil-ux106/sunsettrack-consumer-demo.git
cd sunsettrack-consumer-demo
```

Install dependencies:

```bash
npm install
```

## Run the application

```bash
npm start
```

The server starts at:

http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/users/:id` | Deprecated user API |
| GET | `/api/v2/users/:id` | Successor user API |
| GET | `/sunset-report` | Migration and usage report |

## Testing the Deprecated API

Request:

```bash
curl -i http://localhost:3000/api/v1/users/42
```

The response includes:

- `Deprecation`: Deprecation timestamp.
- `Sunset`: Planned retirement date.
- `Link`: Successor API URL.

Example successor header:

```http
Link: </api/v2/users/42>; rel="successor-version"
```

The dynamic user ID is preserved in the successor URL.

## Testing the New API

```bash
curl http://localhost:3000/api/v2/users/42
```

## Generating a Migration Report

```bash
curl http://localhost:3000/sunset-report
```

This endpoint returns usage summary and route-level migration statistics.

## Deprecation Configuration

The example registers its deprecated route using:

```javascript
registerRoute({
    method: "GET",
    path: "/api/v1/users/:id",
    successor: "/api/v2/users/:id",
    deprecatedAt: "2026-11-01",
    sunsetAt: "2027-01-01"
});
```

## About SunsetTrack

SunsetTrack helps Express.js developers manage API version transitions by combining deprecation headers, route registration, usage tracking, and migration reporting.

**npm:** https://www.npmjs.com/package/sunsettrack

**Main Repository:** https://github.com/Dhruvil-ux106/sunsettrack

## License

MIT
