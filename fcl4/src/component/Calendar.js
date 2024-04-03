// src/Calendar.js

import React, { useState } from 'react';
import '../css/Calendar.css';
import Schedule from './Schedule';

const Calendar = () => {
    // 달력의 현재 연도와 월을 상태로 관리합니다.
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1); // 월은 0부터 시작하므로 +1 해줍니다.
    const [selectedDate, setSelectedDate] = useState(null);

    // 이전 달로 이동하는 함수
    const goToPreviousMonth = () => {
        if (month === 1) {
            setYear(year - 1);
            setMonth(12);
        } else {
            setMonth(month - 1);
        }
    };

    // 다음 달로 이동하는 함수
    const goToNextMonth = () => {
        if (month === 12) {
            setYear(year + 1);
            setMonth(1);
        } else {
            setMonth(month + 1);
        }
    };

    // 현재 달의 일수를 가져오는 함수
    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    // 현재 달의 시작 요일을 가져오는 함수 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const getStartDayOfMonth = (year, month) => {
        return new Date(year, month - 1, 1).getDay();
    };

    // 달력 그리기
    const renderCalendar = () => {
        const totalDays = getDaysInMonth(year, month);
        const startDay = getStartDayOfMonth(year, month);
        const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

        const calendarDays = [];

        for (let i = 0; i < 7; i++) {
            calendarDays.push(
                <div key={`label-${i}`} className="calendar-day label">
                    {dayLabels[i]}
                </div>
            );
        }

        // 이전 달의 일자들을 채웁니다.
        for (let i = startDay; i > 0; i--) {
            calendarDays.push(
                <div key={`prev-${i}`} className="calendar-day prev-month-day">
                    {getDaysInMonth(year, month - 1) - i + 1}
                </div>
            );
        }

        // 현재 달의 일자들을 채웁니다.
        for (let i = 1; i <= totalDays; i++) {
            const currentDay = new Date(year, month - 1, i);
            const className = currentDay.getDay() === 0 ? 'red' : currentDay.getDay() === 6 ? 'blue' : '';

            calendarDays.push(
                <div
                    key={`curr-${i}`}
                    className={`calendar-day ${className}`}
                    onClick={() => setSelectedDate(`${year}-${month}-${i}`)}
                >
                    {i}
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <>
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={goToPreviousMonth}>&lt;</button>
                    <div>{`${year}년 ${month}월`}</div>
                    <button onClick={goToNextMonth}>&gt;</button>
                </div>
                <div className="calendar-body">{renderCalendar()}</div>
            </div>
            {selectedDate && <Schedule selectedDate={selectedDate} />}
        </>
    );
};

export default Calendar;
