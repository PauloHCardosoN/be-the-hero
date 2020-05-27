import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { Fontisto } from '@expo/vector-icons';


import style from './style';
import logo from '../../assets/logo.png';


export default function Details(){
    const navigation = useNavigation();
    const route = useRoute();

    const {
        city,
        uf,
        description,
        email,
        name,
        title,
        value,
        whatsapp
    } = route.params.incident;


    const message = `Olá, ${name}\n`+
                    `Estou entrando em contato pois gostaria de ajudar`+
                    `no caso "${title}" com o valor de R$ ${value}.`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Héroi do caso: ${title}`,
            recipients: [email],
            body: message
        });
    }

    function sendMessage(){
        Linking.openURL(`whatsapp://send?phone=${whatsapp}&text=${message}`);
    }

    
    return (
        <View style={style.container}>

            <View style={style.header}>
                <Image source={logo}></Image>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={navigateBack}
                >
                    <Fontisto name="arrow-return-left" size={15} style={style.primaryColor} >
                        <Text> Voltar</Text>
                    </Fontisto>
                </TouchableOpacity>
                
            </View>

            <View style={style.incident}>

                <View style={style.incidentDoubleText}>
                    <View>
                        <Text style={style.incidentProperty}>ONG</Text>
                        <Text style={style.incidentValue}>{name}</Text>
                    </View>
                    
                    <View>
                        <Text style={style.incidentProperty}>CASO</Text>
                        <Text style={[style.incidentValue, { width: 100 }]}>{title}</Text>
                    </View>
                </View>
                
                <View style={style.incidentDoubleText}>
                    <View>
                        <Text style={style.incidentProperty}>CIDADE</Text>
                        <Text style={style.incidentValue}>{city}</Text>
                    </View>
                    
                    <View>
                        <Text style={style.incidentProperty}>UF</Text>
                        <Text style={[style.incidentValue, { width: 100 }]}>{uf}</Text>
                    </View>
                </View>

                <Text style={style.incidentProperty}>DESCRIÇÃO</Text>
                <Text style={style.incidentValue}>{description}</Text>

                <Text style={style.incidentProperty}>VALOR</Text>
                <Text style={style.incidentValue}>R$ {value},00</Text>

            </View>

            
            <View style={style.contactContainer}>
                <Text style={style.bolderText}>Salve o dia!</Text>
                <Text style={style.bolderText}>Seja o héroi desse caso.</Text>

                <Text style={style.smallText}>Entre em contato</Text>

                <View style={style.actions}>
                    <TouchableOpacity
                        style={style.button}
                        activeOpacity={0.8}
                        onPress={sendMessage}
                    >
                        <Text style={style.buttonText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={style.button}
                        activeOpacity={0.8}
                        onPress={sendMail}
                    >
                        <Text style={style.buttonText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}