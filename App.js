import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  const [input, setInput] = useState('');
  const [problems, setProblems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredProblems, setFilteredProblems] = useState([]);

  const handleInput = (text) => {
    setInput(text);
  };

  const handleButton = () => {
    const trimmedInput = input.trim();
    setProblems((currentProblems) => [trimmedInput, ...currentProblems]);
    setFilteredProblems([trimmedInput, ...problems]); // Update filtered problems as well
    setInput('');
  };

  const handleEnter = () => {
    handleButton();
  };

  const handleDelete = (index) => {
    const updatedProblems = problems.filter((_, i) => i !== index);
    setProblems(updatedProblems);
    setFilteredProblems(updatedProblems);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = problems.filter((problem) =>
      problem.toLowerCase().includes(text.toLowerCase().replace(/\s{2,}/g, ' '))
    );
    setFilteredProblems(filtered);
  };

  return (
    <View style={styles.appContainer}>
      {/* Hamburger Menu Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="menu" size={30} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {!menuOpen ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Write all problems here"
            value={input}
            onChangeText={handleInput}
            onSubmitEditing={handleEnter}
          />
          <Button title="Add problem" color="#007BFF" onPress={handleButton} />
        </View>
      ) : (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search problems"
            value={search}
            onChangeText={handleSearch}
          />
          <TouchableOpacity onPress={() => handleSearch(search)}>
            <Icon name="search" size={25} color="#007BFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Problems List */}
      <View style={styles.problemsContainer}>
        <Text style={styles.problemsTitle}>List of problems</Text>
        <ScrollView>
          {(search ? filteredProblems : problems).length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>ENTER PROBLEMS</Text>
            </View>
          ) : (
            (search ? filteredProblems : problems).map((problem, index) => (
              <View key={index} style={styles.problemItem}>
                <Text style={styles.problemText}>{problem}</Text>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Icon name="delete" size={20} color="#FF0000" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '70%',
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  problemsContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  problemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  problemItem: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  problemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyContainer: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '85%',
    padding: 10,
    backgroundColor: '#fff',
  },
});
