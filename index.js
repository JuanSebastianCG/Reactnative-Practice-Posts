import { registerRootComponent } from "expo";
import App from "./App";

// Verifica si GLOBAL está definido antes de intentar modificarlo
if (typeof GLOBAL !== "undefined") {
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App);
// También garantiza que, ya sea que cargues la aplicación en Expo Go o en una compilación nativa,
// el entorno esté configurado correctamente
registerRootComponent(App);

}