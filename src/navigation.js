import { createStackNavigator } from 'react-navigation'

import routes, { Pages } from './routes'
import ModalComponentsSelector from './pages/ModalComponentsSelector'

const MainStack = createStackNavigator(
  {
    ...routes,
  },
  {
    initialRouteName: Object.keys(Pages)[0],
  }
)

const RootNavigator = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    ModalComponentsSelector: {
      screen: ModalComponentsSelector,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 1,
    },
  }
)

export default RootNavigator
