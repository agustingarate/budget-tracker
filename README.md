# Budget Tracker

## Stack tecnologico

- React Native **v0.74**.
- Expo **v51**.

## Dependencias

- Axios
- React Navigation con compatibilidad web (main)
- Expo router (expo_router)
- Redux persist

## Documentacion

### Descripcion de cada rama

1. <span style="color:#2bcc89">**web_navigation** / **main:**</span>
   Uso de React Navigation con soporte web compatible con urls y deep linking.

2. <span style="color:#2bcc89">**expo_router:**</span>
   Solucion de Expo para navegación.
3. <span style="color:#2bcc89">**react_navigation_deeplinks:**</span> Configuración y testeo de deep links con react navigation.
4. <span style="color:#2bcc89">**react_native_manual_deeplinks:**</span> Configuración y testeo de deep links con react navigation a través de enrutamiento manual.

### Testear deep links con React Navigation

Compilar un development build e instalar la app en un dispositivo fisico:

```javascript
APP_VARIANT="staging" npx expo run:android
```

```javascript
APP_VARIANT="production" npx expo run:ios
```

Luego ejecutar

```javascript
npx uri-scheme open 'budgettrackerstg://budgetDetails' --android

npx uri-scheme open 'budgettracker://budgetDetails' --ios
```
