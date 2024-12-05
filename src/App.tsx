import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import USFileProcessingPage from './pages/USFileProcessingPage';
import FileProcessing from './pages/FileProcessing';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/us-files"
          element={
            <Layout>
              <USFileProcessingPage />
            </Layout>
          }
        />
        <Route
          path="/file-processing"
          element={
            <Layout>
              <FileProcessing />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;