import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
const primaryColor = "#e03641";

export default StyleSheet.create({
    primaryColor: {
        color: primaryColor
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 24,
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    header: {
        paddingBottom: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    incident: {
        backgroundColor: '#fff',
        paddingVertical: 40,
        paddingHorizontal: 30,
        paddingBottom: 15,
        marginTop: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    incidentDoubleText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    incidentProperty: {
        fontWeight: 'bold'
    },
    incidentValue: {
        color: '#999999',
        paddingBottom: 35,
        textAlign: 'left'
    },
    contactContainer: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderTopWidth: .5,
        borderColor: "#e9e9e9",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    bolderText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    smallText: {
        fontSize: 14,
        color: '#d2d2d2',
        marginTop: 2.5,
        marginBottom: 20
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '47%',
        backgroundColor: primaryColor,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff'
    }
})