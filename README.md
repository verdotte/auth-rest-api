## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build && npm start
```

### Project strucure

```
user-auth-rest-api
├─ .eslintignore
├─ .eslintrc
├─ .gitignore
├─ .prettierignore
├─ .prettierrc
├─ package.json
├─ README.md
├─ src
│  ├─ app.ts
│  ├─ controllers
│  │  ├─ authController.ts
│  │  └─ index.ts
│  ├─ index.ts
│  ├─ interfaces
│  │  ├─ route.interface.ts
│  │  └─ twilio.interface.ts
│  ├─ middlewares
│  │  ├─ asyncHandler.ts
│  │  └─ checkPhoneNumber.ts
│  ├─ models
│  │  └─ User.ts
│  ├─ plugins
│  │  └─ twilio
│  │     ├─ index.ts
│  │     ├─ twilioConfig.ts
│  │     └─ twilioService.ts
│  ├─ routes
│  │  ├─ authRoute.ts
│  │  └─ index.ts
│  └─ utils
│     └─ generateToken.ts
└─ tsconfig.json

```
