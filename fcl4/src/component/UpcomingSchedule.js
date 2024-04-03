import React, { useState, useEffect } from 'react';
import Schedule from './Schedule';

const UpcomingSchedule = () => {
    const [filteredScheduleList, setFilteredScheduleList] = useState([]); // 필터링된 일정 목록 상태

    useEffect(() => {
        const today = new Date();
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const filteredList = JSON.parse(localStorage.getItem('scheduleList')) || [];
        const filtered = filteredList.filter((schedule) => {
            const scheduleDate = new Date(schedule.date);
            return scheduleDate >= today && scheduleDate <= nextMonth;
        });
        setFilteredScheduleList(filtered);
    }, [filteredScheduleList]);

    return (
        <>
            <div>
                <h2>다가오는 일정</h2>
                {/* Schedule 컴포넌트에 필터링된 일정 목록 전달 */}
                <ul>
                    {filteredScheduleList.map((schedule, index) => (
                        <li key={index}>
                            <span>{schedule.date}</span>: <span>{schedule.content}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default UpcomingSchedule;
