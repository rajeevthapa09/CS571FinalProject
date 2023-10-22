import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  android: {
    padding: 30,
    fontSize: 30,
    textAlign: 'center',
    alignItems: 'center',
    color: '#90ee90',
    fontWeight: '300',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: '300',
    marginTop: 20,
  },
  ios: {
    paddingTop: 30,
    fontSize: 26,
    textAlign: 'center',
    color: '#90ee90',
    fontWeight: '200',
  },
});
