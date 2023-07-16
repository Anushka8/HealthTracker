import React from 'react';
import './BMIIndicator.css';

const BMIIndicator = ({ bmi }) => {
  const getBmiCategory = () => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'Healthy Weight';
    } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  };

  return (
    <div>
      <div className="bmi-indicator">
        <div className="bmi-bar"></div>
      </div>
      <div className="bmi-range">
      </div>
      <div className="bmi-category">{getBmiCategory()}</div>
    </div>
  );
};

export default BMIIndicator;
