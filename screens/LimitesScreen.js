import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Avatar, Title } from 'react-native-paper';
import axios from "axios";

import { Container, Row } from '../styles/styles'

export default function LimitesScreen() {

    const [ api_limite_req, setApiLimiteReq ] = React.useState(false)

    const fetchLimite = async () => {
        
        try {
            let result = await axios.get("https://api.github.com/rate_limit");

            setApiLimiteReq(result.data);
        } catch (error) {
            setError(true);
            console.log(error)
        }
    };
    
    function formatDate(date){
        let time, remaining_minutes;

        time = date.getTime()

        remaining_minutes = time - (new Date().getTime());

        remaining_minutes /= (1000*60)

        return parseInt(remaining_minutes)
    }


    // React.useEffect(() => {

    //     fetchLimite()

    // }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchLimite()
        }, [])
    );

    
    return (
        <ScrollView>
            <Row style={{alignItems: "center"}}>
                
                <Text style={{fontSize: 15, marginTop: 20}}>For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.</Text>

                <Text style={{fontSize: 25, marginTop: 30}}>Requests limit: {api_limite_req && api_limite_req['rate'].limit}</Text>
                <Text style={{fontSize: 25}}>Requests remaining: {api_limite_req && api_limite_req['rate'].remaining}</Text>
                <Text style={{fontSize: 25}}>Reset limit in {api_limite_req && formatDate(new Date(api_limite_req["rate"].reset * 1000)) + " min"}</Text>
            </Row>
        </ScrollView>
    );
}; 
