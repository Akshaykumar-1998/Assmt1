import React, { useEffect, useState } from 'react';
import { auth, provider } from './Config';
import { signInWithPopup } from 'firebase/auth';
import './Login.css';
import './Button.css';

function Login() {
  const [value, setValue] = useState('');
  const [workTime, setWorkTime] = useState(1500); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(300); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalID;

    if (isRunning) {
      intervalID = setInterval(() => {
        if (workTime > 0) {
          setWorkTime((prevTime) => prevTime - 1);
        } else if (breakTime > 0) {
          setBreakTime((prevTime) => prevTime - 1);
        } else {
          clearInterval(intervalID);
          setIsRunning(false);
          setWorkTime(1500); // Reset work time to 25 minutes
          setBreakTime(300); // Reset break time to 5 minutes
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning, workTime, breakTime]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setWorkTime(1500); // Reset work time to 25 minutes
    setBreakTime(300); // Reset break time to 5 minutes
  };

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem('email', data.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);

  return (
    <div>
      <div className="welcome-page">
        <header>
          <h1>Welcome to MTechZilla Software Company</h1>
          <p>Your trusted partner in innovative solutions</p>
        </header>
        {value}
        

        <div> 
        <div style={{ marginTop: '20px' }}>
          <h1>SignIn To MTechZilla</h1>
          <button className="custom-button" onClick={handleClick}>
            <h3 style={{ color: 'white' }}>Sign With Google</h3>
          </button>
        </div>
        
        <div className="pomodoro-timer">
        <h1>WorkTimer</h1>
        <div className="timer">
          <p>
          {Math.floor(workTime / 60)}:{(workTime % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}
          </p>
        </div>
        <div className="controls">
          <button onClick={handleStart}>Start</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className="break-timer">
          <p>
            Break Timer: {Math.floor(breakTime / 60)}:{(breakTime % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}
          </p>
        </div>
      </div>
      </div>

        <section className="features">
          <div className="feature">
            <h2>Expert Development Team</h2>
            <p>We have a team of highly skilled developers ready to bring your ideas to life.</p>
          </div>
          <div className="feature">
            <h2>Cutting-Edge Technology</h2>
            <p>We stay up-to-date with the latest technologies to deliver top-notch solutions.</p>
          </div>
          <div className="feature">
            <h2>Customer-Centric Approach</h2>
            <p>Your satisfaction is our priority, and we work closely with you to achieve your goals.</p>
          </div>
        </section>
      </div>

  
    </div>
  );
}

export default Login;
