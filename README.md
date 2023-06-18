# Metamask integration backend
Provides an example of siwe authentication with metamask. 

## How to run
Default envs is fine for quick dev check. No need to create .env file.
```
npm i && npm run dev
```
Endpoints `http://localhost:3038`. Swagger `http://localhost:3038/docs/`

## Check lint and tsc build
```
npm run test-ci
```

## Migration cli
generate migration:
```bash
npm run migrate:gen --name=test
```
create migration:
```bash
npm run migrate:add --name=test
```
up and down migrations:
```bash
npm run migrate:up
npm run migrate:down
```