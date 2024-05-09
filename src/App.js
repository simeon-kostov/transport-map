import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainView from './components/MainView';
import LineView from './components/LineView';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/lines/:lineId" element={<LineView />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
