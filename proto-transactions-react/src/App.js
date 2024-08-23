import logo from './logo.svg';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  return (
    <div className="App">
      <h1>Transaction Form</h1>
      <TransactionForm />
      <TransactionList />
    </div>
  );
}

export default App;
