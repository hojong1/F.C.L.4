import './App.css';
import Calendar from './component/Calendar';
import Header from './component/Header';
import UpcomingSchedule from './component/UpcomingSchedule';
import './css/basic.css';

function App() {
    return (
        <div className="App">
            <Header />
            <UpcomingSchedule />
        </div>
    );
}

export default App;
