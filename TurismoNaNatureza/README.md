# TurismoNaNatureza

> Aplicativo de geolocalização para registrar e compartilhar potenciais destinos para a prática do turismo na natureza

Um aplicativo para criar e compartilhar locais antes não registrados para o turismo na natureza.
com objetivo de valorizar e promover a prática em relação à capacidade turística do Brasil.

O aplicativo possui funcionalidades para descobrir, compartilhar e sugerir novos pontos turísticos na natureza.

## Projeto

### Casos de Uso

- [X] Visualizar no mapa os locais para turismo na natureza;

- [X] Adicionar um novo registro na localização atual do usuário pelo GPS;

- [X] Criar rota ao local por meio de aplicativo de mapas

- [X] Compartilhar um local;

---

### Melhorias

- [Rendering-multiple-components](https://codelikethis.com/lessons/react/rendering-multiple-components)

- [Mapbox-map-show-points](https://blog.kevinchisholm.com/react-native/mapbox-map-show-points/)

---

### Problemas Conhecidos

1. Clique duplo em alfinete/local - [mapbox issue](https://github.com/nitaliano/react-native-mapbox-gl/issues/937)

2. Centralizar local do usuario funciona apenas uma vez.

---

### Arvore de Arquivos

```
/src
    /assets
    /components
    /screens
    /styles
```

---

### Componentes do Projeto e Comandos

```
$ npx react-native init TurismoNaNatureza --version 0.64.2
$ cd TurismoNaNatureza
$ yarn android
$ npx react-native run-android --verbose
```

#### Mapbox
`$ yarn add @react-native-mapbox-gl/maps@8.2.1`

#### Navigation
```
$ yarn add react-navigation
$ yarn add react-navigation-stack
```

##### Dependencies
```
$ yarn add react-native-gesture-handler
$ npx react-native link react-native-gesture-handler
$ yarn add react-native-reanimated
$ yarn add react-native-screens
$ yarn add react-native-safe-area-context
```

#### Geolocation

`$ yarn add @react-native-community/geolocation`

#### FAB

```
$ yarn add react-native-action-button
$ yarn add react-native-vector-icons
$ npx react-native link
```

#### Form

`$ yarn add react-native-paper`

##### Combobox
`$ yarn add @react-native-picker/picker`

##### Photos
`$ yarn add @react-native-community/viewpager`

##### Image picker
`$ yarn add react-native-image-picker`

##### Firebase storage + firestore database
```
$ yarn add @react-native-firebase/app
$ yarn add @react-native-firebase/storage
$ yarn add @react-native-firebase/firestore@12.9.2
```

##### Share
`$ yarn add react-native-share`

---

### Deploy

#### Gerar .apk com assinatura

[Gerar uma chave RSA para assinar e gerar .apk](https://stackoverflow.com/questions/35935060/how-can-i-generate-an-apk-that-can-run-without-server-with-react-native)
- Use o comando abaixo para gerar sua chave:

```
$ keytool -genkey -v -keystore my-app-key.keystore -alias my-app-alias -keyalg RSA -keysize 2048 -validity 10000
```

- Com a chave gerada, gerar um build de instalação:
```
$ react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

- Gerar .apk com gradle:
```
$ cd android && ./gradlew assembleRelease
```

- Instalar .apk em emulador ou dispoitivo:
```
$ adb install -r ./app/build/outputs/apk/app-release-unsigned.apk
```

Troubleshooting:
- [JVM heap space is exhausted](https://stackoverflow.com/questions/56075455/expiring-daemon-because-jvm-heap-space-is-exhausted)

---

### Testes Sugeridos

- yarn lint

- jest

- [why-did-you-render](https://github.com/welldone-software/why-did-you-render)

