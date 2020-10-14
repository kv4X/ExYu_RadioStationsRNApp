import { MainStackNavigator, BaStackNavigator, RsStackNavigator, MeStackNavigator, HrStackNavigator, SiStackNavigator, MkStackNavigator, FaStackNavigator } from './StackNavigator';
const DrawerItems = [
  { id: 0, label: 'Sve radio stanice', icon: 'radio', iconType: 'MaterialIcons', routeName: 'Sve radio stanice', routeComponent:  MainStackNavigator },
  { id: 1, label: 'Vaše omiljene radio stanice', icon: 'favorite-outline', iconType: 'MaterialIcons', routeName: 'Bosna i Hercegovina', routeComponent: FaStackNavigator },
  { id: 2, label: 'Bosna i Hercegovina', icon: require('../../assets/flags/ba.png'), iconType: 'flag', routeName: 'Bosna i Hercegovina', routeComponent: BaStackNavigator  },
  { id: 3, label: 'Srbija', icon: require('../../assets/flags/rs.png'), iconType: 'flag', routeName: 'Srbija', routeComponent: RsStackNavigator },
  { id: 4, label: 'Hrvatska', icon: require('../../assets/flags/hr.png'), iconType: 'flag', routeName: 'Hrvatska', routeComponent: HrStackNavigator },
  { id: 5, label: 'Slovenija', icon: require('../../assets/flags/si.png'), iconType: 'flag', routeName: 'Slovenija', routeComponent: SiStackNavigator },
  { id: 6, label: 'Crna Gora', icon: require('../../assets/flags/me.png'), iconType: 'flag', routeName: 'Crna Gora', routeComponent: MeStackNavigator },
  { id: 7, label: 'Makedonija', icon: require('../../assets/flags/mk.png'), iconType: 'flag', routeName: 'Makedonija', routeComponent: MkStackNavigator },
];

//icons from https://www.flaticon.com/packs/countrys-flags
export default DrawerItems;