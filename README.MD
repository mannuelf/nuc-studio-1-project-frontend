# Factbook Explorers

[![Netlify Status](https://api.netlify.com/api/v1/badges/716d0bd0-6c7c-4897-bb4c-bc548927b03e/deploy-status)](https://app.netlify.com/sites/factbookexplorers/deploys)

## Built with

This project is built with node.js and ParcelJs, install both on your machine.

[https://nodejs.org/en/](https://nodejs.org/en/)

[https://parceljs.org/](https://parceljs.org/)

## To develop

Install the npm packages using the terminal. This will install ParcelJs a modern bundler. [https://parceljs.org/](https://parceljs.org/)

```bash
npm install
```

## Start the development server

```bash
npm run develop
```

Start coding and Navigate to [http://localhost:1234](http://localhost:1234)

## Environment Variables

Secrets are store in hidden dot files called .env.local and .env.production.

[https://parceljs.org/env.html](https://parceljs.org/env.html)

signup for your own API KEYS on map and place the secrets in files called `.env.local` inside place these constants:

```bash
MAPBOX_TOKEN=" place your token here "
MAPBOX_STYLE_URL=" place your style url here"
```

The config module will use NODE.JS's `NODE_ENV=*` key to extract your keys out of the environment variable files and make your key available in the scope of any JS module you create.

## But why?

We want to write with modern ES6 JavaScript with imports & exports + TypeScript. I have made the files TypeScript so that we can get better error linting.

Just write normal JavaScript in the TypeScript file, valid JavaScript is valid TypeScript.

Parcel will compile your the modern JS into ES5 for older browser support.
