# Haul - Inspection Management System

A modern web application built with Nx, NestJS, and React for managing trucking inspections data. The system provides a comprehensive view of inspection records, vehicle information, and compliance data.

🚀 [Live Demo](https://react-client-three-orcin.vercel.app/)

## Prerequisites

- Node.js (LTS version)
- npm or yarn
- Git

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/djheyson/haul-test
cd haul-test
```

2. Set up environment variables:

For the API (nest-api):

```bash
cp apps/nest-api/app/.env.sample apps/nest-api/app/.env
```

Required API environment variables:

```
ALLOWED_ORIGINS=http://localhost:4200,http://localhost:4300
VERCEL_TOKEN=<your-vercel-token>
FMCS_API_URL=https://ai.fmcsa.dot.gov
VIN_API_URL=https://vpic.nhtsa.dot.gov
```

For the client (react-client):

```bash
cp apps/react-client/app/.env.sample apps/react-client/app/.env
```

Required client environment variables:

```
REACT_APP_BACKEND_URL=http://localhost:3000
VERCEL_TOKEN=<your-vercel-token>
```

3. Install dependencies:

```bash
npm install
```

## Development

To run the API server:

```bash
nx run nest-api:serve
```

To run the React client:

```bash
nx run react-client:serve
```

## Building and Deployment

To build a project:

```bash
nx run <project-name>:build
```

To deploy to Vercel (ensure VERCEL_TOKEN is set):

```bash
nx run <project-name>:deploy
```

## Project Structure

- `apps/nest-api` - Backend API service built with NestJS
- `apps/react-client` - Frontend application built with React

## Features

- Inspection data management and visualization
- Filtering by BASIC category
- Sorting by various fields
- Detailed inspection views
- Vehicle information lookup via VIN
- Equipment relationship tracking

## Testing

- API tests use Jest
- React client tests use Vitest

## Additional Resources

- [Nx Documentation](https://nx.dev)
- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://reactjs.org)
- [Vercel Documentation](https://vercel.com/docs)

## License

MIT
