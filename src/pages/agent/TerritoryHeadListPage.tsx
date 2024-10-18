import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';

const agentsData = [
  { id: '1', joining_date: '2024-09-01', name: 'User A', total_sale: 10, total_profit: 450, num_of_customers: 15, total_agents: 50 },
  { id: '2', joining_date: '2024-09-05', name: 'User B', total_sale: 20, total_profit: 200, num_of_customers: 5, total_agents: 30 },
  { id: '3', joining_date: '2024-09-10', name: 'User C', total_sale: 15, total_profit: 200, num_of_customers: 20, total_agents: 45 },
  { id: '4', joining_date: '2024-09-12', name: 'User D', total_sale: 12, total_profit: 550, num_of_customers: 18, total_agents: 25 },
  { id: '5', joining_date: '2024-09-15', name: 'User E', total_sale: 18, total_profit: 500, num_of_customers: 25, total_agents: 60 },
  { id: '6', joining_date: '2024-09-20', name: 'User F', total_sale: 12, total_profit: 250, num_of_customers: 10, total_agents: 20 },
];

const PAGE_SIZE = 4; // Number of agents to show per page

const TerritoryHeadListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // Filtered agents based on the search query
  const filteredAgents = agentsData.filter(agent => agent.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Calculate pagination
  const paginatedAgents = filteredAgents.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAgents.length / PAGE_SIZE);

  // Handlers for pagination
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Find best performers
  const bestSaleAgent = filteredAgents.reduce((prev, current) => {
    return (prev.total_sale > current.total_sale) ? prev : current;
  }, filteredAgents[0]);

  const bestProfitAgent = filteredAgents.reduce((prev, current) => {
    return (prev.total_profit > current.total_profit) ? prev : current;
  }, filteredAgents[0]);

  // Find the agent with the highest number of customers
  const bestCustomerAgent = filteredAgents.reduce((prev, current) => {
    return (prev.num_of_customers > current.num_of_customers) ? prev : current;
  }, filteredAgents[0]);

  // Find the agent with the highest total agents
  const bestAgentCountAgent = filteredAgents.reduce((prev, current) => {
    return (prev.total_agents > current.total_agents) ? prev : current;
  }, filteredAgents[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TerritoryHead List</Text>
      {/* Search Input */}
      <TextInput style={styles.searchInput} placeholder="Search by name" value={searchQuery} onChangeText={setSearchQuery} />
      {/* Highlight Best Performers */}
      <View style={styles.bestPerformerContainer}>
        <Text style={styles.bestPerformerTitle}>Best Performers</Text>
        <View style={styles.bestPerformerDetails}>
          <Text style={styles.bestPerformerText}>🏆 Top Seller: {bestSaleAgent.name} - {bestSaleAgent.total_sale} Sales</Text>
          <Text style={styles.bestPerformerText}>💰 Top Profit: {bestProfitAgent.name} - ${bestProfitAgent.total_profit} Profit</Text>
          <Text style={styles.bestPerformerText}>👥 Most Customers: {bestCustomerAgent.name} - {bestCustomerAgent.num_of_customers} Customers</Text>
          <Text style={styles.bestPerformerText}>👥 Most Agents: {bestAgentCountAgent.name} - {bestAgentCountAgent.total_agents} Total Agents</Text>
        </View>
      </View>
      {/* FlatList to render agents */}
      <FlatList 
        data={paginatedAgents} 
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Name: {item.name}</Text>
            <Text style={styles.itemText}>Joining Date: {item.joining_date}</Text>
            <Text style={styles.itemText}>Total Sales: {item.total_sale}</Text>
            <Text style={styles.itemText}>Total Profit: ${item.total_profit}</Text>
            <Text style={styles.itemText}>Number of Customers: {item.num_of_customers}</Text>
            <Text style={styles.itemText}>Total Agents: {item.total_agents}</Text>
            {/* Highlight agent with the most customers */}
            {/* {item.id === bestAgentCountAgent.id && <Text style={styles.highlight}>🌟 Highest Agent Count!</Text>} */}
          </View>
        )} 
      />
      {/* Pagination Buttons */}
      <View style={styles.paginationContainer}>
        <Button title="Previous" onPress={previousPage} disabled={currentPage === 0} />
        <Text style={styles.pageInfo}>Page {currentPage + 1} of {totalPages}</Text>
        <Button title="Next" onPress={nextPage} disabled={currentPage === totalPages - 1} />
      </View>
    </View>
  );
};

export default TerritoryHeadListPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 20, },
  bestPerformerContainer: { backgroundColor: '#d1e7dd', padding: 15, borderRadius: 5, marginBottom: 20, },
  bestPerformerTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, },
  bestPerformerDetails: { marginTop: 10, },
  bestPerformerText: { fontSize: 16, marginVertical: 5, },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#ffffff', borderRadius: 5, marginBottom: 10, },
  itemText: { fontSize: 16 },
  highlight: { fontSize: 16, color: 'green', fontWeight: 'bold' },
  paginationContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, },
  pageInfo: { fontSize: 16, },
});
