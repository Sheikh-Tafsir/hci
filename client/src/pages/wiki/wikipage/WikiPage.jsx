import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import PageLoading from '@/mycomponenrs/loading/PageLoading';
import './WikiPage.css'

const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;

const WikiPage = ({ page, onLinkClick }) => {
    const [parsedResponse, setParsedResponse] = useState([]);
    const [contents, setContents] = useState([]);

    const [chatHistory, setChatHistory] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [pageContent, setPageContent] = useState({
        extract: '',
        sections: [],
        images: [],
        references: [],
    });
    const[webmVideos, setWebmVideos] = useState([]) 
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const handleRadioChange = (event) => {
        setSelectedImageIndex(Number(event.target.value));
    };



    const fetchPageContent = async () => {
        try {
            const response = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    prop: 'revisions',
                    rvprop: 'content',
                    pageids: page.pageid,
                    format: 'json',
                    origin: '*',
                },
            });

            const pageData = response.data.query.pages[page.pageid];
            const wikitext = pageData.revisions[0]['*'];

            // Use a regex to extract references
            const references = wikitext.match(/<ref[^>]*>[\s\S]*?<\/ref>/g) || [];
            setPageContent(prevContent => ({
                ...prevContent,
                references: references,
            }));

            const sectionsResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'parse',
                    pageid: page.pageid,
                    prop: 'text|sections|images|extlinks', // Include 'extlinks' to fetch citations
                    format: 'json',
                    origin: '*',
                },
            });

            const sectionsPageData = sectionsResponse.data.parse;
            const sections = sectionsPageData.sections.map((section) => ({
                index: section.index,
                line: section.line,
                level: section.level,
            }));

            setPageContent(prevContent => ({
                ...prevContent,
                extract: sectionsPageData.text['*'], // raw HTML
                sections: sections,
                images: sectionsPageData.images || [],
            }));

            const videos = sectionsPageData.images.filter(image => image.endsWith('.webm'));
            setWebmVideos(videos);
        } catch (error) {
            console.error('Error fetching page content:', error);
        }
    };  


    const handleSendMessage = async () => {
        setPageLoading(true);
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: chatHistory.map(message => ({
                role: message.role,
                parts: [{ text: message.text }] // Ensure each message has 'parts' property with an array of parts
            })),
            generationConfig: {
                maxOutputTokens: 100000,
            },
        });

        const msg = "write about " + page.title + " like wikipedia does. first give introduction , then other paras. make atleast 9 paras, also name the para. Dont use points. don't right anything unrelated";

        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const responseText = await response.text();
        console.log(responseText)
        parseResponseText(responseText);

    };

    const parseResponseText = (text) => {
        const lines = text.split('\n');
        let parsedText = '';
        let headers = [];

        // Iterate through each line
        lines.forEach(line => {
            // Check if the line starts and ends with "**" indicating a heading
            if (line.startsWith('**') && line.endsWith('**')) {
                // Extract the heading text
                const headingText = line.substring(2, line.length - 2);
                // Wrap the heading text in <h2> tags
                parsedText += `<h2 id="${headingText}">${headingText}</h2>`;
                headers.push(headingText);
            } else if (line.startsWith('*')) {
                // Check if the line starts with a single "*" indicating a bullet point
                const bulletPointText = line.substring(1).trim();
                // Wrap the bullet point text in <li> tags
                parsedText += `<li>${bulletPointText}</li>`;
            } else {
                // Wrap the paragraph text in <p> tags
                parsedText += `<p>${line}</p>`;
            }
        });
        console.log(headers);
        setContents(headers);
        setParsedResponse(parsedText);
        setPageLoading(false);
    };
    

    useEffect(() => {
        fetchPageContent()
        handleSendMessage();
    }, [page]);

    document.addEventListener('DOMContentLoaded', function () {
        const images = document.querySelectorAll('.wiki-imageBoxImages');
        const buttons = document.querySelectorAll('.image-button');
    
        function showImage(index) {
            images.forEach((img, i) => {
                if (i === index) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
        }
    
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                showImage(index);
            });
        });
    
        // Show the first image initially
        showImage(0);
    });
    


    if (pageLoading) {
        return (
            <div>
                <PageLoading />
            </div>
        );
    }

    return (
        <div className='wikiMain'>
            
            <h1>{page.title}</h1>
            <div className='wiki-page'>
                <div className='wiki-content'>
                    <h2 >Contents</h2>
                    {contents.map(content => (
                        <p key={content}><a href={`#${content}`}>{content}</a></p>
                    ))}
                </div>
                <div className='wiki-textBox'>
                    <div className='wiki-imageBox'>
                        <img
                            src={`https://en.wikipedia.org/wiki/Special:Redirect/file/${pageContent.images[selectedImageIndex]}`}
                            alt={pageContent.images[selectedImageIndex]}
                            className='wiki-imageBoxImages'
                        />
                    </div>
                    
                    <div className="button-container">
                        <label>
                            <input
                                type="radio"
                                name="image"
                                value="0"
                                checked={selectedImageIndex === 0}
                                onChange={handleRadioChange}
                            />
                        
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="image"
                                value="1"
                                checked={selectedImageIndex === 1}
                                onChange={handleRadioChange}
                            />
                        
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="image"
                                value="2"
                                checked={selectedImageIndex === 2}
                                onChange={handleRadioChange}
                            />
                        
                        </label>
                    </div>
                    <div className='wiki-data-container'>
                        <div dangerouslySetInnerHTML={{ __html: parsedResponse }} className='wiki-data'/>
                        <div className='wiki-videos'>
                            {webmVideos.map((video, index) => (
                                <video key={index} controls>
                                    <source src={`https://en.wikipedia.org/wiki/Special:Redirect/file/${video}`} type="video/webm" />
                                    Your browser does not support the video tag.
                                </video>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WikiPage;