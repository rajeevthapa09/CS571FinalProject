import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  root: {
    flex: 1,
    backgroundColor: "#008000",
    paddingTop: 20,
  },
  addReview: {
    fontSize: 25,
    color: "#008000",
    textAlign: "center",
    margin: 20,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 3,
  },
  infoHeader: {
    padding: 20
  },
  info: {
    marginTop: 20,
  },
  errorMsg: {
    fontSize: 24,
    color: 'red'
  },
  name: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  faculty: {
    color: 'grey',
    marginBottom: 5,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  submitButtonText: {
    fontSize: 16,
    color: "#ffff",
    textAlign: "center"
  },
  row: {
    flex: .5,
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  edges: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    minWidth: 25,
  },
  button: {
    borderWidth: 1,
    borderColor: '#0066CC',
    borderRadius: 14,
    width: 80,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#0066CC',
    fontSize: 12,
    textAlign: 'center',
  },
  info: {
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  title: {
    padding: 30,
    fontSize: 30,
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: '300',
  },
  notes: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  buttonNotes: {
    borderWidth: 1,
    borderColor: '#0066cc',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#fff',
    marginTop: 10,
    width: 90,
    marginLeft: "75%"
  },
  buttonTextNotes: {
    color: '#0066CC',
    fontSize: 12,
    textAlign: 'center',
  },
  edgesNotes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    minWidth: 50,
  },
  buttonTextNotes: {
    color: '#0066CC',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default styles;