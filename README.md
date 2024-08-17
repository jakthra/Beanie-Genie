# Beaniegenie

The coffee app for keeping track of coffee purchases. The app, at the moment, requires a few things

1. A running postgres database
2. A running k8s cluster

The application is written with nextjs using Drizzle ORM.

To get started with development, you need Node v20. Set the .env file to your necessary connection parameters

```
cd app/
npm install
npm run migrate
npm run dev
```

