import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background
import axios from 'axios';

const defaultImage = require('../assets/default.png');

const MainScreen = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    // useEffect(() => {
    //     fetch('../assets/books.json')  // Fetching the JSON file from the assets folder
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setBooks(data.books); // Storing books data in state
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching books:', error);
    //         });
    // }, []); // Runs once when the component mounts
    // useEffect(() => {
    //     axios.get('http://localhost:3000/books')  // API-ul backend-ului tău
    //         .then((response) => {
    //             setBooks(response.data);  // Stocăm datele cărților în state
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching books:', error);
    //         });
    // }, []);

    useEffect(() => {
        // Cerere GET pentru a obține lista de cărți
        axios.get('http://localhost:3000/books')
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    }, []);





    return (
        <LinearGradient
            colors={['#6A1B9A', '#8E24AA']} // Gradient background with purple tones
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Alege o operă</Text>
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('SelectionScreen', { bookId: item.id })} // Passing bookId
                        >
                            <Image source={item.image ? { uri: item.image } : defaultImage} style={styles.bookImage} />
                            <Text style={styles.bookTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    numColumns={2}
                    contentContainerStyle={styles.bookList}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        padding: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    bookList: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#3C1053', // Dark purple for the card background
        margin: 10,
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        transform: [{ translateY: -10 }],
        alignItems: 'center',
        flex: 1,
        maxWidth: 150,
        justifyContent: 'center',
    },
    bookImage: {
        width: 100,
        height: 150,
        borderRadius: 8,

    },
    bookTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
});

export default MainScreen;
