import React, { useState, useEffect } from 'react';

export const Main = () => {
  const [states, setStates] = useState([]);
  const [r, setr] = useState(0);

  const getData = async () => {
    const res = await fetch(
      'https://api.covidtracking.com/v1/states/daily.json'
    );
    const data = await res.json();
    setStates(data.slice(0, 56));
    console.log(states);
    if (r === 0) {
      setr(1);
    }
  };

  useEffect(() => {
    getData();
  }, [r]);

  const showData = e => {
    document.querySelector('.state-selected').style.display = 'block';
    document.querySelector(
      '.state-selected'
    ).innerText = `${e.target.innerText}`;
    document.querySelector('.data-container').style.display = 'grid';
    states.map(i => {
      if (i.state === e.target.innerText) {
        console.log(i.positive);
        console.log(i.positiveIncrease);
        console.log(i.death);
        console.log(i.deathIncrease);
        document.querySelector('.cases-increase-data').innerText =
          i.positiveIncrease;
        document.querySelector('.death-increase-data').innerText =
          i.deathIncrease;
        document.querySelector('.cases-data').innerText = i.positive;
        document.querySelector('.deaths-data').innerText = i.death;
      }
    });
  };

  return (
    <div className='main-container'>
      <h1 className='header'>US States Covid-19 Data</h1>
      <h2 className='how'>
        Select State to show Data (data is withheld from certain states)
      </h2>
      <div className='from'>
        From{' '}
        <a
          target='_blank'
          href='https://covidtracking.com/data/api'
          className='link'
        >
          Covid Tracking Data API
        </a>
      </div>
      <div className='states'>
        {states.map((i, index) => (
          <button onClick={showData} className='state-btn' key={index}>
            {i.state}
          </button>
        ))}
      </div>
      <h2 className='state-selected'>OR</h2>
      <div className='data-container'>
        <div className='cases-increase'>Case increase(from yesterday)</div>
        <div className='cases-increase-data data-num'></div>
        <div className='death-increase'>Death increase(from yesterday)</div>
        <div className='death-increase-data data-num'></div>
        <div className='cases'>Total Cases</div>
        <div className='cases-data data-num'></div>
        <div className='deaths'>Total Deaths</div>
        <div className='deaths-data data-num'></div>
      </div>
    </div>
  );
};

export default Main;
// HOW TO FETCH DATA ONCE
// DISPLAY ALL STATES - DEFAULT TOTAL US
// DISPLAY DATA
// DEATH, CASE INCREASE FROM YESTERDAY
// TOTAL DEATHS, POSITIVES, NEGATIVES
