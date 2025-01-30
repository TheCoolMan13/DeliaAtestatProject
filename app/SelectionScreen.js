import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SelectionScreen = ({ route, navigation }) => {
    const { bookId } = route.params;
    const [bookTitle, setBookTitle] = useState('');

    useEffect(() => {
        fetch('../assets/books.json')
            .then((response) => response.json())
            .then((data) => {
                const selectedBook = data.books.find((b) => b.id === bookId);
                setBookTitle(selectedBook?.title || 'Unknown Book');
            })
            .catch((error) => console.error('Error fetching book title:', error));
    }, [bookId]);

    return (
        <LinearGradient colors={['#3E1E68', '#4A148C', '#7B1FA2']} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.bookTitle}>{bookTitle}</Text>

                <Text style={styles.title}>Alege un mod</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('FlashcardScreen', { bookId })}
                >
                    <Text style={styles.buttonText}>📖 Flashcards</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('TrueOrFalseScreen', { bookId })}
                >
                    <Text style={styles.buttonText}>✅ Adevărat sau Fals</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>⬅ Înapoi</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    bookTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFD700', // Gold color for contrast
        textAlign: 'center',
        marginBottom: 25,
        marginTop: 30, // Spacing from top
        paddingHorizontal: 10,

    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 25,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    backButton: {
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    backButtonText: {
        color: '#FFC107',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default SelectionScreen;
