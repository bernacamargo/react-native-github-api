import * as React from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Row } from '../styles/styles';
import axios from "axios";

import { TextInput, HelperText, Button, List, Avatar, Divider } from 'react-native-paper';

export default function HomeScreen() {

    const [ repositorios, setRepositorios ] = React.useState([]);
    const [ username, setUsername ] = React.useState('');
    const [ loading, setLoading ] = React.useState(false);
    const [ error, setError ] = React.useState(200);
    const [ user, setUser ] = React.useState(false);
    const [ api_limite_req, setApiLimiteReq ] = React.useState(false)

    /* FUNCTIONS */
    const fetchRepositorios = async () => {
        setLoading(true);
        setError(200);
        setRepositorios([]);
        fetchUser()

        try {
            let result = await axios.get("https://api.github.com/users/" + username + "/repos");
            fetchLimite()
            setRepositorios(result.data);
            fetchUser()
            setLoading(false);
        } catch (error) {
            setError(error.request.status);
            setLoading(false);
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


    const fetchLimite = async () => {
        
        try {
            let result = await axios.get("https://api.github.com/rate_limit");

            setApiLimiteReq(result.data);
        } catch (error) {
            setError(error.request.status);
            console.log(error)
        }
    };

    const fetchUser = async () => {
        setError(200);
        setUser(false);
        
        try {
            let result = await axios.get("https://api.github.com/users/" + username);

            setUser(result.data);
        } catch (error) {
            setError(error.request.status);
            console.log(error)
        }
    };


    /* USE EFFECT */

    React.useEffect(() => {

        fetchLimite()

    }, []);

    return (
        <ScrollView>
            {/* <Row style={{alignItems: "flex-start"}}>
                <Text>Requests limit: {api_limite_req && api_limite_req['rate'].limit}</Text>
                <Text>Requests remaining: {api_limite_req && api_limite_req['rate'].remaining}</Text>
                <Text>Reset limit: {api_limite_req && formatDate(new Date(api_limite_req["rate"].reset * 1000)) + " min"}</Text>
            </Row> */}
            <Row> 
               <TextInput
                    style={{width: 200, height: 50}}
                    mode="outlined"
                    // placeholder='Enter a valid GitHub username'
                    defaultValue={ username }
                    label='GitHub Username'
                    onChangeText={ text => setUsername(text) }
                    selectionColor='#ff0000'
                    underlineColor='#ff0000'
                    clearButtonMode="always"
                />
                <HelperText
                    type="error"
                    visible={error != 200}
                >
                    {(error == 404) ? 'Username not found' : ((error == 403) ? 'You blowed all limits, see "API Requests Limits" tab to more information!' : 'Error failed')}
                </HelperText> 

                <Button 
                    mode="contained" 
                    color=""
                    icon="folder-search-outline"
                    onPress={ () => { fetchRepositorios() } }
                    loading={loading}
                    disabled={loading}
                >{!loading ? "Search repositories" : 'Searching...'}</Button>
            </Row>

            <Divider style={{marginTop: 10, marginBottom: 10}}></Divider>

                {
                    user && (
                            <Row>
                                <Avatar.Image size={100} source={{uri: user.avatar_url}} />
                                <Text style={{fontWeight: "bold"}}>{user.name}</Text>
                                <Text>{user.bio}</Text>
                            </Row>
                    )
                }           
                {
                    repositorios.length > 0 && (
                        repositorios.map((repositorio, key) => {
                            return (
                                <List.Item 
                                        key={key} 
                                        title={repositorio.name} 
                                        description={repositorio.description}
                                        left={props => <List.Icon {...props} icon="folder" />}
                                    />
                            )
                        })
                    )
                }
            
        </ScrollView>
    );
}

