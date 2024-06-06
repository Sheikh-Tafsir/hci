
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import './WikipediaSearch.css';
import WikiPage from './wikipage/WikiPage';
import { Link } from 'react-router-dom';
import { MdKeyboardVoice } from "react-icons/md";


function WikipediaSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm.trim() || !searchTerm || searchTerm === '' || searchTerm === ' ') setSearchResults([]);
      else{      
        try {
          const response = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
              action: 'query',
              list: 'search',
              srsearch: searchTerm,
              format: 'json',
              origin: '*',
              prop: 'pageimages', // Request images for each page
              piprop: 'thumbnail', // Get thumbnails
              pithumbsize: 100, // Thumbnail size
            },
          });

          setSearchResults(response.data.query.search);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  useEffect(() => {
    setRecognition(new window.webkitSpeechRecognition() || new window.SpeechRecognition());
  }, []);

  useEffect(() => {
    if (recognition) {
      recognition.continuous = true;
      recognition.lang = 'en-US';
      recognition.onresult = handleVoiceResult;
    }
  }, [recognition]);

  const handleVoiceResult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    setSearchTerm(transcript);
    recognition.stop();
    setIsListening(false);
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = (page) => {
    setSelectedPage(page);
    setSearchTerm('')
    setSearchResults([]);
  };

  const handleLinkClick = async (title) => {
    const temp = {
      title:title
    }
    setSelectedPage(temp)
  }

  return (
    <>
      <div className='wikipedia'>
        
        <div className='wiki-navbar'>
          <img src ='/wiki/logo.png' />
          <div className='wiki-navbar-inputbar my-auto'>
            <div className='flex'>
              <MdKeyboardVoice onClick={isListening ? stopListening : startListening} className="microphone-button my-auto"/>
              <Input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Wikipedia"
                className=''
              />
            </div>
            <ul>
              {searchResults.slice(0, 5).map((result) => (
                <li key={result.pageid} onClick={() => handleResultClick(result)}>
                  <h3>
                    {result.title}
                  </h3>
                  {result.thumbnail && <img src={result.thumbnail.source} alt={result.title} />}
                  {/* <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p> */}
                </li>
            
              ))}
            </ul>
          </div>
          <div className='wiki-navbar-buttons my-auto'>
            <Link to="/auth/login" className="my-auto ">
                <button className='mx-auto mr-[1vw] text-blue-600'>change to Bangla</button>
            </Link>
            {/* <Link to="/auth/login" className="my-auto  text-blue-600">
                <button className='mx-auto'>Sign In</button>
            </Link> */}
          </div>
        </div>
      </div>
      
      <div className='wiki-article-top-bar'>
        <div className='wiki-article-top-subbar my-auto'>
          <p><b>Main Page</b></p>
          <p className='text-blue-600'>Talk</p>
        </div>
        <div className='wiki-article-top-subbar my-auto'>
          <p><b>Read</b></p>
          <p>View Source</p>
          <p>View History</p>
          <p className='text-blue-600'>Tools</p>
        </div>
      </div>

      <div className='wiki-article-bar'>
        <div className='wiki-article-subbar my-auto'>
          <p><u><b>Article</b></u></p>
          <p>Talk</p>
        </div>
        <div className='wiki-article-subbar my-auto'>
          <p><u><b>Read</b></u></p>
          <p>View Souce</p>
          <p>View history</p>
          <p>Tools</p>
        </div>
      </div>
      
      {selectedPage && <WikiPage page={selectedPage} onLinkClick={handleLinkClick}/>}
    </>
  );
}

export default WikipediaSearch;
