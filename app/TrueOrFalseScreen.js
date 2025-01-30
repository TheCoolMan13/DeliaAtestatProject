import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const TrueOrFalseScreen = ({ route, navigation }) => {
    const { bookId } = route.params;
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('true'); // Default answer is True

    useEffect(() => {
        // Fetch questions for the selected book
        fetchQuestions();
    }, [bookId]);

    // Function to fetch true/false questions
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/books/${bookId}/truefalsequestions`);
            const questionsWithBooleanAnswers = response.data.map(question => ({
                ...question,
                answer: question.is_true === 1, // Convertim 1 la true și 0 la false
            }));
            console.log('Questions fetched:', questionsWithBooleanAnswers);
            setQuestions(questionsWithBooleanAnswers);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };



    const handleAnswer = (questionIndex, selectedAnswer) => {
        if (!questions[questionIndex]) return;

        const correctAnswer = questions[questionIndex].answer; // aceasta este acum un boolean
        const normalizedSelected = selectedAnswer === true; // 'true' înseamnă corect

        const isCorrect = normalizedSelected === correctAnswer;
        const updatedAnswers = [...userAnswers];
        updatedAnswers[questionIndex] = { answer: normalizedSelected, isCorrect };
        setUserAnswers(updatedAnswers);
    };




    // Function to add a new question
    const handleAddQuestion = () => {
        if (newQuestion.trim()) {
            const updatedQuestions = [
                ...questions,
                { question: newQuestion, answer: newAnswer === 'true' ? 1 : 0 } // Convertim true/false în 1/0
            ];
            setQuestions(updatedQuestions);
            setModalVisible(false);
            setNewQuestion('');
            setNewAnswer('true');
        }
    };


    return (
        <LinearGradient colors={['#3E1E68', '#4A148C', '#7B1FA2']} style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>⬅ Înapoi</Text>
                </TouchableOpacity>

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>Adevărat sau Fals</Text>

                    {questions.map((q, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.question}>{q.question}</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.trueButton,
                                        userAnswers[index]?.answer === true && styles.selectedButton
                                    ]}
                                    onPress={() => handleAnswer(index, true)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.buttonText}>Adevărat</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.falseButton,
                                        userAnswers[index]?.answer === false && styles.selectedButton
                                    ]}
                                    onPress={() => handleAnswer(index, false)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.buttonText}>Fals</Text>
                                </TouchableOpacity>
                            </View>

                            {userAnswers[index] && (
                                <Text
                                    style={[
                                        styles.feedback,
                                        userAnswers[index]?.isCorrect ? styles.correct : styles.incorrect
                                    ]}
                                >
                                    {userAnswers[index]?.isCorrect
                                        ? '✅ Corect!'
                                        : '❌ Incorect, încearcă din nou.'}
                                </Text>
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Add Question Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>

            {/* Modal for Adding Questions */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Adaugă o întrebare</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Scrie întrebarea"
                            placeholderTextColor="#bbb"
                            value={newQuestion}
                            onChangeText={setNewQuestion}
                        />

                        {/* True / False Buttons */}
                        <View style={styles.answerButtons}>
                            <TouchableOpacity
                                style={[styles.answerButton, newAnswer === 'true' && styles.selected]}
                                onPress={() => setNewAnswer('true')}
                            >
                                <Text style={styles.buttonText}>✅ Adevărat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.answerButton, newAnswer === 'false' && styles.selected]}
                                onPress={() => setNewAnswer('false')}
                            >
                                <Text style={styles.buttonText}>❌ Fals</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Buttons Row */}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Înapoi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addQuestionButton} onPress={handleAddQuestion}>
                                <Text style={styles.buttonText}>Adaugă întrebare</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    backText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    card: {
        backgroundColor: '#4A235A',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#7B1FA2',
    },
    question: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    trueButton: {
        backgroundColor: '#28A745',
        padding: 12,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
        elevation: 5,
        shadowColor: 'rgba(0, 255, 0, 0.3)',
    },
    falseButton: {
        backgroundColor: '#DC3545',
        padding: 12,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
        elevation: 5,
        shadowColor: 'rgba(255, 0, 0, 0.3)',
    },
    selectedButton: {
        opacity: 0.6,
        transform: [{ scale: 0.95 }],
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    feedback: {
        marginTop: 12,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingVertical: 5,
        borderRadius: 5,
    },
    correct: {
        color: '#28A745',
    },
    incorrect: {
        color: '#DC3545',
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
    answerButtons: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15,
    },
    answerButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: '#6A359C',
    },
    selected: {
        backgroundColor: '#06D6A0',
    },
    modalButtons: {
        flexDirection: 'row',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#E63946',
        flex: 1,
        paddingVertical: 10,
        marginRight: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    addQuestionButton: {
        backgroundColor: '#06D6A0',
        flex: 1,
        paddingVertical: 10,
        marginLeft: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default TrueOrFalseScreen;
