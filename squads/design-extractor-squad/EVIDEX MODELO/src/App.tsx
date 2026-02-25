import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sales } from "./pages/Sales";
import { LP } from "./pages/LP";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LP" element={<LP />} />
        <Route path="*" element={<Sales />} />
      </Routes>
    </Router>
  );
}

export default App;
