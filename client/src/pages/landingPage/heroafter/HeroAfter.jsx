import React from 'react'
import './HeroAfter.css'
const HeroAfter = () => {
  return (
    <div className='homepage_heroafter' id="features">
        <div className='homepage_heroafter_mainBox'>
            <div className='homepage_heroafter_cards'>
                <img src="/landingPage/heroafter/1-min-1.png"/>
                <div className='homapage_heroafter_cards_textBox'>
                    <h2>Join the Movement</h2>
                    <p>Partner with us to create a cleaner and greener future. Be part of the solution with our waste management initiatives.</p>
                </div>
            </div>
            <div className='homepage_heroafter_cards'>
                <img src="/landingPage/heroafter/2-min-1.png"/>
                <div className='homapage_heroafter_cards_textBox'>
                    <h2>Spread Awareness</h2>
                    <p>Help raise awareness about sustainable waste practices. Share our resources and tips to inspire positive change.</p>
                </div>
            </div>
            <div className='homepage_heroafter_cards'>
                <img src="/landingPage/heroafter/3-min-1.png"/>
                <div className='homapage_heroafter_cards_textBox'>
                    <h2>Make a Difference</h2>
                    <p>Contribute to a better environment while earning rewards. Join our affiliate program and advocate for responsible waste management.</p>
                </div>
            </div>
        </div>        
    </div>
  )
}

export default HeroAfter