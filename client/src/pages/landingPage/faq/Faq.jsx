import React, {useEffect, useState} from 'react'
import './Faq.css'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import FaqData from './FaqData.json';

const DelayedIcon = ({ isVisible, delay }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, delay]);

  return shouldRender ? (isVisible ? <BsChevronDown className="faq_questionIcon" /> : <BsChevronRight className="faq_questionIcon" />) : null;
};

const Faq = () => {
  //const [showRightIcon, setShowRightIcon] = useState(true);
  const [visibleAnswers, setVisibleAnswers] = useState([]);

  //show the selected answer
  const toggleAnswer = (id) => {
    setVisibleAnswers((prevVisibleAnswers) => {
      const updatedVisibleAnswers = [...prevVisibleAnswers];
      const index = updatedVisibleAnswers.indexOf(id);
      if (index === -1) {
        updatedVisibleAnswers.push(id);
      } else {
        updatedVisibleAnswers.splice(index, 1);
      }
      return updatedVisibleAnswers;
    });
  };

  //change icon of selectd question
  // const toggleIcons = () => {
  //   setShowRightIcon(!showRightIcon);
  // };
  return (
    <div className='faq'>
        <div className='faq_mainBox'
          data-aos='fade-right' 
          data-aos-delay="100"
          data-aos-anchor-placement="top-bottom"
        >
            <h1>Frequently Asked Question</h1>
            {FaqData.map((item) => (
                <div key={item.id} className='faq_questionAnswer'>
                    <div className='faq_questions' onClick={() => toggleAnswer(item.id)}>
                      <p>{`${item.id}. ${item.question}`}</p>
                      <div
                          className='faq_questionIconBox'
                          
                          >
                          {visibleAnswers.includes(item.id) ? (
                              <BsChevronDown className='faq_questionIcon'/>
                          ) : (
                              <BsChevronRight className='faq_questionIcon '/>
                          )}
                      </div>
                    </div>
                
                    <div className={`faq_answers ${visibleAnswers.includes(item.id) ? 'faq_answersFull' : ''}`}>
                        <p>{item.answer}</p>
                    </div>
                </div>
             ))}
        </div>
    </div>
  )
}

export default Faq