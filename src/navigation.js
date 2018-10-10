import { createStackNavigator } from 'react-navigation'

import routes, { Pages } from './routes'

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
