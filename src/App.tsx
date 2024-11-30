import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { JoinPage } from './components/JoinPage';
import { DisputePage } from './components/DisputePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join/:invitationLink" element={<JoinPage />} />
        <Route path="/dispute/:disputeId" element={<DisputePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
