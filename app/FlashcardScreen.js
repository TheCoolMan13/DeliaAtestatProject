import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const FlashcardScreen = ({ route, navigation }) => {
    const { bookId } = route.params;
    const [book, setBook] = useState(null);
    const [flashcards, setFlashcards] = useState([]);  // Flashcards state
    const [showAnswers, setShowAnswers] = useState({});  // State for showing answers
    const [modalVisible, setModalVisible] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    useEffect(() => {
        fetchBookData();
        fetchFlashcards(bookId);
    }, [bookId]);

    // Fetch book details
    const fetchBookData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/books/${bookId}`);
            setBook(response.data);
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
    };

    // Fetch flashcards for the selected book
    const fetchFlashcards = async (bookId) => {
        try {
            const response = await axios.get(`http://localhost:3000/books/${bookId}/flashcards`);
            setFlashcards(response.data);
        } catch (error) {
            console.error('Error fetching flashcards:', error);
        }
    };

    // Toggle visibility of answers
    const toggleAnswer = (index) => {
        setShowAnswers(prevState => ({
            ...prevState,
            [index]: !prevState[index],  // Toggle only for selected question
        }));
    };

    // Handle adding a new flashcard
    const handleAddFlashcard = () => {
        if (newQuestion.trim() && newAnswer.trim()) {
            const updatedFlashcards = [...flashcards, { question: newQuestion, answer: newAnswer }];
            setFlashcards(updatedFlashcards);
            setModalVisible(false);
            setNewQuestion('');
            setNewAnswer('');
        }
    };

    if (!book) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>{book.title}</Text>

            {/* Flashcards List */}
            <FlatList
                data={flashcards}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.card}>
                        <Text style={styles.question}>{item.question}</Text>
                        {showAnswers[index] && <Text style={styles.answer}>{item.answer}</Text>}
                        <TouchableOpacity style={styles.button} onPress={() => toggleAnswer(index)}>
                            <Text style={styles.buttonText}>
                                {showAnswers[index] ? 'Ascunde răspunsul' : 'Arată răspunsul'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />

            {/* Add Flashcard Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>

            {/* Modal for Adding Flashcards */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Adaugă un Flashcard</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Scrie întrebarea"
                            placeholderTextColor="#bbb"
                            value={newQuestion}
                            onChangeText={setNewQuestion}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Scrie răspunsul"
                            placeholderTextColor="#bbb"
                            value={newAnswer}
                            onChangeText={setNewAnswer}
                        />

                        {/* Buttons Row */}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Înapoi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addFlashcardButton} onPress={handleAddFlashcard}>
                                <Text style={styles.buttonText}>Adaugă</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E1A47',
        padding: 20,
        paddingTop: 50,
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#512D6D',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    question: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    },
    answer: {
        fontSize: 16,
        color: '#FFD700',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#8257E5',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#8257E5',
        padding: 15,
        borderRadius: 50,
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#3D2352',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        backgroundColor: '#4A2D69',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        color: '#fff',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#E63946',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    addFlashcardButton: {
        backgroundColor: '#06D6A0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
});

export default FlashcardScreen;
