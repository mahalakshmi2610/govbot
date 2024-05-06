import React, { useState } from 'react';
import axios from 'axios';

const Menubot = () => {
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState(["Education", "Skills and Employment","Social Welfare"]); 
  const [msg,setMsg]=useState('');
  const [scheme,setScheme]=useState('');
  const [eligibility,setEligibility]=useState('');
  const [benefits,setBenefits]=useState('');
  const [flag,setFlag]=useState(false);
  const [flag1,setFlag1]=useState(false);
  const [thank,setThank]=useState('');
  
  const handleOptionSelect = (option) => {
    
    if (currentQuestionIndex === 0) {
      handleSubmit(currentQuestionIndex, option);
    } else if (currentQuestionIndex === 1) {
      setScheme(option); // Set the selected scheme here
      handleSubmit(currentQuestionIndex, option);
    } else{
      if(option==="yes")
      {
        setCurrentQuestionIndex(0);
        setMessages([]);
        setThank('');
        setFlag(false);
        setFlag1(false);
        setScheme('');
        setMsg('');
        setEligibility('');
        setBenefits('');
      }
      if(option==="no"){
        setThank("Thank you!");
        setFlag1(true);
      }
      else{
      handleSubmit(currentQuestionIndex, option);
      }
      
    }
  };

 
  const handleSubmit = async (curr, option) => {
    if (curr === 0 && (option === "Education" || option === "Skills and Employment"|| option === "Social Welfare")) {
      try {
        const res = await axios.post('http://localhost:5000/get_response', { message: option });
        const r = res.data.response.split("\n");
        setMessages(r);
      } catch (error) {
        console.error(error);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (curr === 1) {
      try {
        const res = await axios.post('http://localhost:5000/get_response', { message: option });
        setMsg(res.data.response);
        setFlag(true);
      } catch (error) {
        console.error(error);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (curr === 2) {
      try {
        const res = await axios.post('http://localhost:5000/get_response', { message: option });
        setEligibility(res.data.response);
      } catch (error) {
        console.error(error);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    else if (curr === 3) {
        try {
          const res = await axios.post('http://localhost:5000/get_response', { message: option });
          setBenefits(res.data.response);
        } catch (error) {
          console.error(error);
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
  };

  return (
    <div>
      <h1>Menu Based Chatbot</h1>
      {}
      <div>
        {options.map((option, index) => (
          <button key={index} onClick={() => handleOptionSelect(option)}>{option}</button>
        ))}
      </div>
      {}
      <div>
        
          <div className={messages.type}>
            {messages.map((m, index) => (
          <button key={index} onClick={() => handleOptionSelect(m)}>{m}</button>
        ))}
          </div>
        
      </div>
      {}
    
      <div>
        {currentQuestionIndex === 1 && (
            <div>
                <div>
                    {msg}
                </div>
        </div>
            
        )}
      </div>
        <div>
        {currentQuestionIndex>= 2  && (
        <div>
            <div>
                {msg}
            </div>
            {flag && (<div>
                <button onClick={() => handleOptionSelect("Eligibility of " + scheme)}>Eligibility</button>
                
            </div>)}
      </div>
        
      )}
        </div>
      
      
      <div>
      {currentQuestionIndex >= 3 && (
        <div>
            <div>
                {eligibility}
            </div>
            <div>
                <button onClick={() => handleOptionSelect("Benefits of " + scheme)}>Benefits</button>
            </div>
      </div>
        
      )}
      </div>

      <div>
      {currentQuestionIndex >= 4 && (
        <div>
            <div>
                {benefits}
            </div>
            <div>
              <p>Do you want to know about other schemes?</p>
                <button onClick={() => handleOptionSelect("yes")}>Yes</button>
                <button onClick={() => handleOptionSelect("no")}>No</button>
            </div>
      </div>
      )}
      </div>
      <div>
        {flag1 && (
          <div>
            {thank}
            </div>
        )}
      </div>
    </div>
  );
}

export default Menubot;