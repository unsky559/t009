# t009

## Configuration

To configure an app change values at `.env` file before build.
- `API_URL` - url to API

## Installation

```shell
git clone https://github.com/unsky559/t009
```

```shell
cd t009
```

## Docker

### Build an image
cd to t009 folder and make an image with
```shell
docker build -t unsky559/movies-front .
```

### Run container

```shell
docker run --name moviesFront -p 3000:3000 unsky559/movies-front
```

where:
- `name` - container name
- `p` - port to server launch

## Commands

### Dev server
For start dev server use
```
> npm run serve
```
### Tests
For start lint tests use
```
> npm run test
```
### Build
For build use
```
> npm run build
```
Before deploy use
```
> npm run build:prod
```

## What`s inside?

- **react**
  - materialUI
  - react-router-dom
- **redux**
  - redux-toolkit
- **typescript**
- **sass**
  - sass-loader
- style-loader
- eslint (airbnb)
- **webpack**

## Architecture

All project files are in the `src` folder. 

### Routing

I use `react-router-dom` for routing.
All routes can be found in `app.tsx`.

### Types

Interfaces for typing requests and responses from the server

### Tools

Pure public function functions.

### Store - redux

Store and reducer configuration

### Services

Namespaces for API requests using custom `useFetch()` hook.

### Pages

Page components

### Hooks 

Custom hooks
