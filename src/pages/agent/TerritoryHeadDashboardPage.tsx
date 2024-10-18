import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DashboardCard from '../../components/DashboardCard';
import { DataTable } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

const customers = [
  { id: '1', name: 'John Doe', sales: '$500' },
  { id: '2', name: 'Jane Smith', sales: '$300' },
  { id: '3', name: 'Alice Johnson', sales: '$450' },
  { id: '4', name: 'Bob Brown', sales: '$700' },
  { id: '5', name: 'Charlie Green', sales: '$600' },
  { id: '6', name: 'Emily White', sales: '$250' },
];
const agents = [
  { id: '1', name: 'Agent A', territory: 'Territory 1' },
  { id: '2', name: 'Agent B', territory: 'Territory 2' },
  { id: '3', name: 'Agent C', territory: 'Territory 1' },
  { id: '4', name: 'Agent D', territory: 'Territory 3' },
  { id: '5', name: 'Agent E', territory: 'Territory 2' },
  { id: '6', name: 'Agent F', territory: 'Territory 1' },
];
const transactions = [
  { id: '1', date: '2024-09-01', amount: '$2000', description: 'Sale 1', territory: 200, agent: 20,},
  { id: '2', date: '2024-09-05', amount: '$3000', description: 'Sale 2', territory: 300, agent: 30,},
  { id: '3', date: '2024-09-10', amount: '$1500', description: 'Sale 3', territory: 150, agent: 15,},
  { id: '4', date: '2024-09-12', amount: '$4000', description: 'Sale 4', territory: 400, agent: 40,},
  { id: '5', date: '2024-09-15', amount: '$2500', description: 'Sale 5', territory: 250, agent: 25,},
  { id: '6', date: '2024-09-20', amount: '$1000', description: 'Sale 6', territory: 100, agent: 10,},
];

const TerritoryHeadDashboardPage: React.FC = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentCustomerPage, setCurrentCustomerPage] = useState(0);
  const [currentTransactionPage, setCurrentTransactionPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQueryCustomer, setSearchQueryCustomer] = useState('');
  const [searchQueryTransaction, setSearchQueryTransaction] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [searchQueryAgent, setSearchQueryAgent] = useState('');
  const [filteredAgents, setFilteredAgents] = useState(agents);
  const [currentAgentPage, setCurrentAgentPage] = useState(0);
  const [totalTerritoryAmount, setTotalTerritoryAmount] = useState(0);
  const [totalAgentAmount, setTotalAgentAmount] = useState(0);
  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchQueryCustomer.toLowerCase())
    );
    setFilteredCustomers(filtered);
    setCurrentCustomerPage(0);
  }, [searchQueryCustomer]);
  useEffect(() => {
    const filtered = agents.filter(agent =>
      agent.name.toLowerCase().includes(searchQueryAgent.toLowerCase())
    );
    setFilteredAgents(filtered);
    setCurrentAgentPage(0);
  }, [searchQueryAgent]);
  useEffect(() => {
    const filtered = transactions.filter(transaction =>
      transaction.description.toLowerCase().includes(searchQueryTransaction.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setCurrentTransactionPage(0);
  }, [searchQueryTransaction]);

  const handleEmailRequest = () => {
    setShowEmailForm(true);
  };
  const handleAgentPageChange = (newPage) => {
    setCurrentAgentPage(newPage);
  };
  const handleCustomerPageChange = (newPage) => {
    setCurrentCustomerPage(newPage);
  };
  const handleTransactionPageChange = (newPage) => {
    setCurrentTransactionPage(newPage);
  };
  const handleSubmit = () => {
    if (!email) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    console.log(`Submitting: ${email}, Start Date: ${startDate}, End Date: ${endDate}`);
    setErrorMessage('');
    setShowEmailForm(false);
    setEmail('');
  };

  useEffect(() => {
    // Calculate total territory amount whenever transactions change
    const total = transactions.reduce((total, transaction) => total + transaction.territory, 0);
    setTotalTerritoryAmount(total);
  }, []);

  useEffect(() => {
    // Calculate total territory amount whenever transactions change
    const total = transactions.reduce((total, transaction) => total + transaction.agent, 0);
    setTotalAgentAmount(total);
  }, []);
  return (
    <View style={styles.container}>
      <Header title="Territory Head Dashboard" />
      <ScrollView>
        <Text style={styles.sectionTitle}>Territory Head QR Code</Text>
        <View style={styles.qrCodeContainer}>
          <QRCode value="TerritoryHeadID:XYZ123" size={100} />
        </View>

        <Text style={styles.sectionTitle}>Referral ID</Text>
        <Text style={styles.referralID}>Territory Head Referral ID: XYZ123</Text>
        <Text style={styles.pageTitle}>Territory Overview</Text>

        <View style={styles.dashboardRow}>
          <View style={styles.dashboardColumn}>
            <DashboardCard title="Total Number of Agents" value={agents.length.toString()} />
          </View>
          <View style={styles.dashboardColumn}>
            <DashboardCard title="Total Commission" value={`$${totalTerritoryAmount}`} />
          </View>
        </View>

        <View style={styles.dashboardRow}>
          
          <View style={styles.dashboardColumn}>
            <DashboardCard title="Total Number of transaction" value={transactions.length.toString()} />
          </View>
        </View>

        <View style={styles.dashboardRow}>
        <View style={styles.dashboardColumn}>
            <DashboardCard title="Total Number of Customers" value={customers.length.toString()} />
          </View>
          <View style={styles.dashboardColumn}>
            <DashboardCard title="Total commision to agent" value={`$${totalAgentAmount}`} />
          </View>
          
        </View>
        <Text style={styles.sectionTitle}>Agent List</Text>
          <TextInput
            placeholder="Search Agents"
            value={searchQueryAgent}
            onChangeText={setSearchQueryAgent}
            style={styles.searchInput}
          />
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Territory</DataTable.Title>
            </DataTable.Header>
            {filteredAgents.slice(currentAgentPage * rowsPerPage, (currentAgentPage + 1) * rowsPerPage).map((agent) => (
              <DataTable.Row key={agent.id}>
                <DataTable.Cell>{agent.name}</DataTable.Cell>
                <DataTable.Cell>{agent.territory}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          <View style={styles.pagination}>
            <Button
              title="Previous"
              onPress={() => handleAgentPageChange(Math.max(currentAgentPage - 1, 0))}
              disabled={currentAgentPage === 0}
            />
            <Text>{`Page ${currentAgentPage + 1} of ${Math.ceil(filteredAgents.length / rowsPerPage)}`}</Text>
            <Button
              title="Next"
              onPress={() => handleAgentPageChange(Math.min(currentAgentPage + 1, Math.ceil(filteredAgents.length / rowsPerPage) - 1))}
              disabled={(currentAgentPage + 1) * rowsPerPage >= filteredAgents.length}
            />
          </View>
        <Text style={styles.sectionTitle}>Customer List</Text>
        <TextInput
          placeholder="Search Customers"
          value={searchQueryCustomer}
          onChangeText={setSearchQueryCustomer}
          style={styles.searchInput}
        />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Sales</DataTable.Title>
          </DataTable.Header>
          {filteredCustomers.slice(currentCustomerPage * rowsPerPage, (currentCustomerPage + 1) * rowsPerPage).map((customer) => (
            <DataTable.Row key={customer.id}>
              <DataTable.Cell>{customer.name}</DataTable.Cell>
              <DataTable.Cell numeric>{customer.sales}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <View style={styles.pagination}>
          <Button
            title="Previous"
            onPress={() => handleCustomerPageChange(Math.max(currentCustomerPage - 1, 0))}
            disabled={currentCustomerPage === 0}
          />
          <Text>{`Page ${currentCustomerPage + 1} of ${Math.ceil(filteredCustomers.length / rowsPerPage)}`}</Text>
          <Button
            title="Next"
            onPress={() => handleCustomerPageChange(Math.min(currentCustomerPage + 1, Math.ceil(filteredCustomers.length / rowsPerPage) - 1))}
            disabled={(currentCustomerPage + 1) * rowsPerPage >= filteredCustomers.length}
          />
        </View>

        <Text style={styles.sectionTitle}>Transaction History (Last Month)</Text>
        <TextInput
          placeholder="Search Transactions"
          value={searchQueryTransaction}
          onChangeText={setSearchQueryTransaction}
          style={styles.searchInput}
        />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
            <DataTable.Title>Description</DataTable.Title>
          </DataTable.Header>
          {filteredTransactions.slice(currentTransactionPage * rowsPerPage, (currentTransactionPage + 1) * rowsPerPage).map((transaction) => (
            <DataTable.Row key={transaction.id}>
              <DataTable.Cell>{transaction.date}</DataTable.Cell>
              <DataTable.Cell numeric>{transaction.amount}</DataTable.Cell>
              <DataTable.Cell>{transaction.description}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <View style={styles.pagination}>
          <Button
            title="Previous"
            onPress={() => handleTransactionPageChange(Math.max(currentTransactionPage - 1, 0))}
            disabled={currentTransactionPage === 0}
          />
          <Text>{`Page ${currentTransactionPage + 1} of ${Math.ceil(filteredTransactions.length / rowsPerPage)}`}</Text>
          <Button
            title="Next"
            onPress={() => handleTransactionPageChange(Math.min(currentTransactionPage + 1, Math.ceil(filteredTransactions.length / rowsPerPage) - 1))}
            disabled={(currentTransactionPage + 1) * rowsPerPage >= filteredTransactions.length}
          />
        </View>

        <View style={styles.emailRequest}>
          <Button title="Request Email" onPress={handleEmailRequest} />
          {showEmailForm && (
            <View style={styles.emailForm}>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
              <Text style={styles.label}>Select Start Date:</Text>
              <DatePicker
                date={startDate}
                onDateChange={setStartDate}
                mode="date"
              />
              <Text style={styles.label}>Select End Date:</Text>
              <DatePicker
                date={endDate}
                onDateChange={setEndDate}
                mode="date"
              />
              <Button title="Submit" onPress={handleSubmit} />
              {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            </View>
          )}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9', // Light background for a clean look
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  dashboardCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  qrCodeContainer: {
    alignItems: 'center',
    margin: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
referralID: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#007BFF',
  padding: 12,
  borderWidth: 1,
  borderColor: '#007BFF',
  borderRadius: 5,
  backgroundColor: '#E6F0FF',
  textAlign: 'center',
  marginVertical: 15,
  marginHorizontal: 20,
},
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  searchInput: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  emailRequest: {
    margin: 10,
  },
  emailForm: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
  dashboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
    
  },
  dashboardColumn: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'gold',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dashboardCard: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  dashboardCardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default TerritoryHeadDashboardPage;
