import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import { Spinner, Container, Header, Left, Button, Body, Title, Content, Card, CardItem, H2, Text } from 'native-base'
import * as Colors from '../utils/Colors'
import * as API from  '../utils/Api'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            decks: [{}]
        }
    }

    componentWillMount() {
        API.getDecks().then(decks => {
            this.setState({
                isReady: true,
                decks: JSON.parse(decks)
            })
        })
    }

    render() {

        const {decks} = this.state
        const { goBack, navigate } = this.props.navigation

        return (
            <Container>
                <Header style={{ backgroundColor: Colors.primary }}>
                    <Left>
                        <Button transparent>
                            <Image source={require('../assets/icon-header.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Decks</Title>
                    </Body>
                </Header>
                <Content style={{padding: 16}}>
                    {!this.state.isReady ? (
                        <Spinner />
                    ) : (
                    decks.map((d, i) => 
                        <Card key={i}>
                            <CardItem button onPress={() => navigate('Deck', { id: d.id })} style={styles.card}>
                                <H2 style={styles.marginBottom}>{d.title}</H2>
                                <Text>{d.cards.length} Cards</Text>
                            </CardItem>
                        </Card>
                    )
                    )}
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    marginBottom: {
        paddingBottom: 8
    }
})

export default Home