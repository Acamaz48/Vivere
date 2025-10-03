import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './styles.css';

const Calendar = () => {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={prevMonth} className="nav-button">
          &lt;
        </button>
        <div className="header-title">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </div>
        <button onClick={nextMonth} className="nav-button">
          &gt;
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    return (
      <div className="days-of-week">
        {days.map((day) => (
          <div key={day} className="day-of-week-cell">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="days-grid">
        {days.map((day, i) => (
          <div
            key={i}
            className={`day-cell ${
              !isSameMonth(day, monthStart)
                ? 'other-month'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : isSameDay(day, new Date()) 
                ? 'today'
                : ''
            }`}
            onClick={() => handleDateClick(day)}
          >
            <span className="day-number">{format(day, 'd')}</span>
          </div>
        ))}
      </div>
    );
  };
  

  return (
    <div className="calendar-container">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </div>
  );
};

export default Calendar;