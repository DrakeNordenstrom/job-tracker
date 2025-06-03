import JobForm from './components/JobForm';
import JobList from './components/JobList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Job Tracker</h1>
      <JobForm />
      <hr />
      <JobList />
    </div>
  );
}

export default App;
