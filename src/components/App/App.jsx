import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import { useState } from 'react';
import { useEffect } from "react";
export default function App() {
    const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem('feedback');
        return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
    });
    const updateFeedback = feedbackType => {
        setFeedback(prevFeedback => ({
            ...prevFeedback,
            [feedbackType]: prevFeedback[feedbackType] + 1
        }));
    };
    const resetFeedback = () => {
        setFeedback({
            good: 0,
            neutral: 0,
            bad: 0
        });
    };
    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positiveFeedback = totalFeedback ? Math.round((feedback.good / totalFeedback) * 100) : 0;

    useEffect(() => {
        localStorage.setItem('feedback', JSON.stringify(feedback));
    }, [feedback]);
    return (
        <>
            <Description />
            <Options updateFeedback={updateFeedback} resetFeedback={resetFeedback} totalFeedback={totalFeedback}/>
            {totalFeedback > 0 ? (
                <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback = {positiveFeedback} />
            ) : (
                <Notification />
            )}
        </>
    );
}