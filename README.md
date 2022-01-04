# Projeto

## Arvore de Arquivos

/src
    /assets
    /components
    /screens
    /styles

---

## Componentes/Comandos

$ npx react-native init TurismoNaNatureza --version 0.64.2
$ cd TurismoNaNatureza

$ yarn android ($ npx react-native run-android --verbose)

### Mapbox
$ yarn add @react-native-mapbox-gl/maps@8.2.1

### Navigation
$ yarn add react-navigation
$ yarn add react-navigation-stack

dependencies
$ yarn add react-native-gesture-handler
$ npx react-native link react-native-gesture-handler
$ yarn add react-native-reanimated
$ yarn add react-native-screens
$ yarn add react-native-safe-area-context

### Geolocation

$ yarn add @react-native-community/geolocation

### FAB

$ yarn add react-native-action-button
$ yarn add react-native-vector-icons
$ npx react-native link

### Form

$ yarn add react-native-paper

#### combobox
$ yarn add @react-native-picker/picker

#### photos
INITIALLY
$ yarn add @react-native-community/viewpager

#### image picker + firebase
$ yarn add react-native-image-picker

#### firebase storage + database
$ yarn add @react-native-firebase/app
$ yarn add @react-native-firebase/storage

#### share
$ yarn add react-native-share

> Firebase Console 
https://console.firebase.google.com/u/1/project/turismonanatureza-90f1d/storage/turismonanatureza-90f1d.appspot.com/files

$ yarn add @react-native-firebase/firestore@12.9.2

##### firestore render handling
https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native

---

## Use Cases

[X] Visualizar no mapa os locais para turismo na natureza;
[X] Adicionar um novo registro na localização atual do usuário pelo GPS;
[X] Criar rota ao local por meio de aplicativo de mapas
[] Compartilhar um local;
[REMOVED] Avaliar um local;

---

## Utils

[Rendering-multiple-components](https://codelikethis.com/lessons/react/rendering-multiple-components)
https://blog.kevinchisholm.com/react-native/mapbox-map-show-points/

---

# Possible Bugs

1. https://github.com/nitaliano/react-native-mapbox-gl/issues/937
2. currentLongitude and currentLatitude bug navigation params into AddLocation (get from database if needed)
3. re-center map in user location only work once - need to re-render map zoom in user location

---

# TODO

!!! Create remote repository gitlab/github

!!! POPULATE locations
  // locations hard-coded
  //     coord_x: -26.90078,
  //     coord_y: -49.00401,
  //     type: "IFSC",
  //     title/desc: "IFSC - Campus Gaspar"

  //     coord_x: -26.90564,
  //     coord_y: -49.00478,
  //     type: "paisagens",
  //     title/desc: "Mirante no Bela Vista"

[ ] #0 Check Firebase rules to access database, currently vulnerable (will need to add auth to deploy app)

[ ] #0.1 Add support to popup instead of alert? https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
https://mariestarck.com/how-to-display-popups-on-a-mapbox-map-mapbox-react-tutorial-part-3/
https://visgl.github.io/react-map-gl/docs/api-reference/map-controller

[X] #1 use react-native-paper
https://callstack.github.io/react-native-paper/

[ ] #2 use another FAB component
https://callstack.github.io/react-native-paper/fab.html
- make fab color match navigation - green

[ ] #3 Location timeout bug 
https://stackoverflow.com/questions/41129088/react-native-android-location-request-timed-out

[ ] #4 Improve image handling in form (add zoom feature)
- DEPRECATED @react-native-community/viewpager
-> https://github.com/DylanVann/react-native-fast-image 2021 <-
-> https://github.com/DylanVann/react-native-fast-image/blob/main/ReactNativeFastImageExample/src/PriorityExample.tsx
-> https://github.com/DylanVann/react-native-fast-image/blob/main/ReactNativeFastImageExample/src/SectionFlex.tsx
$ yarn add react-native-fast-image
? https://github.com/intellidev1991/react-native-image-slider-box 2021

[ ] #5 Improve navigation
- mandatory Class usage? then separate w/ folder: src/navigation
some RN navigation pattern
- https://www.digitalocean.com/community/tutorials/react-react-native-navigation-pt
navigation 4.x docs
- https://reactnavigation.org/docs/hello-react-navigation 
- https://reactnavigation.org/docs/4.x/navigating-without-navigation-prop

[ ] #6 Use cache mechanism to store firebase fetched data

[ ] #7 Improve form w/ submit/validation
- https://medium.com/@gabrielkabral/criando-formul%C3%A1rios-em-react-native-utilizando-react-hook-form-e-yup-5ff76625f78c
- https://www.notion.so/Criando-formul-rios-em-React-Native-utilizando-React-Hook-Form-e-Yup-cde6757402fb4c9f9d30833a86b25f12
- scrollview, flatlist, sectionview
- https://reactnative.dev/docs/flexbox

[ ] #8 Improve star rating with react-native-star-review or react-native-star-view

[ ] #9 Add support to Label/Text locales EN/PT-BR

[ ] #?

# DEPLOY

$ yarn lint
$ jest
? generate apk

* https://github.com/welldone-software/why-did-you-render