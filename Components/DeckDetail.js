import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Spinner, Container, Header, Left, Body, Button, Icon, Title, Content, Grid, Col, Row, H1, H3, Text } from 'native-base'
import * as Colors from '../utils/Colors'
import * as API from  '../utils/Api'

class DeckDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            id: this.props.navigation.state.params.id,
            deck: {}
        }
    }

    componentWillMount() {
        API.getDeck(this.state.id).then(deck => {
            console.log(JSON.parse(deck))
            this.setState({
                isReady: true,
                deck: JSON.parse(deck)
            })
        })
    }

    render() {

        const {deck} = this.state
        const { navigate, goBack  } = this.props.navigation

        return (
            <Container>
                <Header style={{ backgroundColor: Colors.primary }}>
                    <Left>
                        <Button transparent>
                            <Icon onPress={() => goBack()} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{deck.title}</Title>
                    </Body>
                </Header>
                {!this.state.isReady ? (
                    <Content style={{padding: 16}}>
                        <Spinner />
                    </Content>
                ) : (
                    <Grid style={{padding: 16}}>
                        <Col>
                            <Row style={styles.deckInfo}>
                                <H1 style={styles.marginBottom8}>{deck.title}</H1>
                                <H3>{deck.cards.length} Cards</H3>
                            </Row>
                            <Row style={styles.buttons}>
                                <Button large rounded success style={styles.marginBottom16}>
                                    <Text>Start Quiz</Text>
                                </Button>
                                <Button rounded warning>
                                    <Text>Add New Card</Text>
                                </Button>
                            </Row>
                            <Row  style={styles.buttons}>
                                <Button rounded danger>
                                    <Text>Delete Deck</Text>
                                </Button>
                            </Row>
                        </Col>
                    </Grid>
                )}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    deckInfo: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    marginBottom8: {
        marginBottom: 8
    },
    marginBottom16: {
        marginBottom: 16
    }
})

export default DeckDetail