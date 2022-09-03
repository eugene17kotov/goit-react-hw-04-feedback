import { useState } from 'react';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Statistics } from 'components/Statistics/Statistics';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';
import { Box } from 'utils/Box';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const changeFeedbackCount = buttonTitle => {
    switch (buttonTitle) {
      case 'good':
        setGood(good => good + 1);
        break;

      case 'neutral':
        setNeutral(neutral => neutral + 1);
        break;

      case 'bad':
        setBad(bad => bad + 1);
        break;

      default:
        throw new Error('Not supported type');
    }
  };

  const resetFeedbackCount = () => {
    setGood(0);
    setNeutral(0);
    setBad(0);
  };

  const total = good + neutral + bad;
  const positivePercentage = (good / total) * 100;
  const options = Object.keys({ good, neutral, bad });

  return (
    <Box p={4}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={changeFeedbackCount}
          onResetFeedback={resetFeedbackCount}
        ></FeedbackOptions>
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Box>
  );
};
