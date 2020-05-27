import React, { useState,useEffect, } from 'react';
import { View,Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';


import style from './style';
import logo from '../../assets/logo.png';

import api from '../../services/api';

export default function Incidents(){
    const [incidents,setIncidents] = useState([]);
    const [total,setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    
    const navigation = useNavigation();
    

    function navigateToDetails(incident){
        navigation.navigate('Detalhes',{ incident });
    }

    async function loadIncidents(){
        if(total > 0 && total === incidents.length || loading)
            return;
        
            
        setLoading(true);
        const response = await api.get('incidents',{
            params: {
                page
            }
        });
        setLoading(false);

        setIncidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
    }

    useEffect(()=>{
        loadIncidents();
    },[]);
    
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logo}></Image>

                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={style.title}>Bem-vindo!</Text>

            <Text style={style.description}>Escolha um dos casos abaixo e salve o dia</Text>


            <FlatList
                data={incidents}
                //showsVerticalScrollIndicator={false}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident })=>(
                    <View style={style.incidentSingle}>
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>

                        <Text style={style.incidentProperty}>CASO:</Text>
                        <Text style={style.incidentValue}>{incident.title}</Text>

                        <Text style={style.incidentProperty}>VALOR:</Text>
                        <Text style={style.incidentValue}>R$ {incident.value},00</Text>


                        <TouchableOpacity 
                            style={style.incidentButton} 
                            onPress={()=>{navigateToDetails(incident)}} 
                            activeOpacity={0.7}
                        >
                            <Text style={style.incidentButtonLink}>Ver mais detalhes</Text>
                            <FontAwesome5 name="arrow-right" style={style.incidentButtonLink} size={12}/>
                        </TouchableOpacity>
                    </View>
                )}
            ></FlatList>

        </View>
    )
}