# PruebaFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.

## Installation and Setup

To set up this project on a new machine, follow these steps:

### Prerequisites

You need to install:
- **Node.js and npm**: JavaScript runtime environment and package manager
- **Angular CLI**: Command-line interface for Angular

### Step 1: Install Node.js and npm

1. Download and install the LTS version of Node.js from [nodejs.org](https://nodejs.org/)
2. Verify the installation by running:

```bash
node --version
npm --version
```

### Step 2: Install Angular CLI

After installing Node.js, install the Angular CLI globally:

```bash
npm install -g @angular/cli
```

Verify the installation:

```bash
ng version
```

### Step 3: Clone or download the project

If the project is in a Git repository:

```bash
git clone <REPOSITORY_URL>
cd Prueba-Frontend
```

If you have the code in a compressed file, extract it and navigate to the folder.

### Step 4: Install project dependencies

Within the project folder, run:

```bash
npm install
```

This will install all dependencies listed in the package.json file, including:
- Angular and its modules
- Angular Material and Angular CDK
- Other libraries used by the project

### Step 5: Configure environment variables

Review if you need to configure environment variables. In this project, environment files are located in `src/app/Environments/`:
- `enviroment.ts` (development)
- `enviroment.production.ts` (production)

Make sure these files are correctly configured with API URLs and other necessary settings.

### Step 6: Run the project in development mode

Start the development server:

```bash
ng serve
```

Or alternatively using npm:

```bash
npm start
```

The application will be available at `http://localhost:4200` by default.

### Step 7: Build for production (optional)

If you need to generate files for production deployment:

```bash
ng build --configuration production
```

This will generate a `dist/` folder with optimized files for production.

### Troubleshooting common issues

If you encounter problems during installation:

1. **Dependency errors**: Make sure you're using a Node.js version compatible with the project's Angular version.

2. **Angular Material issues**: Ensure Angular Material is correctly installed:
   ```bash
   npm install @angular/material @angular/cdk
   ```

3. **TypeScript errors**: Verify that the TypeScript version is compatible:
   ```bash
   npm install typescript@<compatible-version>
   ```

4. **CORS problems**: If the application connects to an API, verify that the URL is correctly configured in the environment files.

5. **Compilation errors**: For specific compilation errors, check the console for detailed information.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
