import React, { useState, useEffect } from 'react';

const Schedule = ({ selectedDate }) => {
    const [scheduleList, setScheduleList] = useState([]); // 일정 목록 상태
    const [newSchedule, setNewSchedule] = useState(''); // 새로운 일정 입력 상태

    useEffect(() => {
        const savedScheduleList = JSON.parse(localStorage.getItem('scheduleList')) || [];
        setScheduleList(savedScheduleList);
    }, []);

    const addSchedule = () => {
        const updatedScheduleList = [...scheduleList, { date: selectedDate, content: newSchedule }];
        // 새로운 일정 추가
        setScheduleList(updatedScheduleList);
        localStorage.setItem('scheduleList', JSON.stringify(updatedScheduleList));
        setNewSchedule(''); // 입력 필드 초기화
    };

    const deleteSchedule = (index) => {
        const updatedScheduleList = [...scheduleList];
        updatedScheduleList.splice(index, 1);
        setScheduleList(updatedScheduleList);
        localStorage.setItem('scheduleList', JSON.stringify(updatedScheduleList));
    };

    return (
        <>
            <div className="schedule">
                <h2>일정</h2>
                <div>
                    <input
                        type="text"
                        value={newSchedule}
                        onChange={(e) => setNewSchedule(e.target.value)}
                        placeholder="일정을 입력하세요"
                    />
                    <button onClick={addSchedule}>일정 추가</button>
                </div>
                {/* 일정 목록 표시 */}
                <ul>
                    {scheduleList.map((schedule, index) => (
                        <li key={index}>
                            <span>{schedule.date}</span>: <span>{schedule.content}</span>
                            <button onClick={() => deleteSchedule(index)}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Schedule;
