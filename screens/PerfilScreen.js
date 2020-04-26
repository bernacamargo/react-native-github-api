import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Avatar, Title } from 'react-native-paper';

import { Container, Row } from '../styles/styles'

export default function PerfilScreen() {
    return (
        <ScrollView>
            <Row>
                <Title>Bernardo Pinheiro Camargo</Title>
            </Row>

            <Row>
                {/* <Avatar></Avatar> */}
            </Row>
        </ScrollView>
    );
}; 
