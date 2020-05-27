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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30
    },
    headerText: {
        fontSize: 15,
        color: '#707080'
    },
    headerTextBold: {
        fontWeight: 'bold'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    description: {
        color: '#606070',
        marginTop: 5,
        marginBottom: 20,
        maxWidth: 150
    },
    incidentSingle: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 20,
        marginVertical: 5
    },
    incidentProperty: {
        fontWeight: 'bold',
        paddingTop: 20
    },
    incidentValue: {
        color: '#999999'
    },
    incidentButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 20
    },
    incidentButtonLink: {
        color: primaryColor,
        fontWeight: 'bold'
    }
})