import Home from './home';
import About from './about';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const mainNavigation = createAppContainer( 
    createSwitchNavigator({
        Home,
        About,
    })
);

export default mainNavigation;