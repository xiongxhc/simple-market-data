import { PriceChart } from "./component/PriceChart";
import { MarketPrice } from "./component/MarketPrice";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MarketPrice />
        <PriceChart />
      </header>
    </div>
  );
}

export default App;
