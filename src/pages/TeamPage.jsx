import React from 'react';
import './TeamPage.css';

const teamMembers = [
    {
        name: 'STORYWEAVER SARVJIT',
        role: 'Film Director / Co-Founder',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarvjit',
    },
    {
        name: 'HARRY KHALSA',
        role: 'Producer / Co-Founder',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harry',
    },
    {
        name: 'PUNEET GARG',
        role: 'Creative Head, Ad-Man',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Puneet',
    },
    {
        name: 'SAPNA JAIN',
        role: 'Post Production Head / Editing Services',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sapna',
    },
];

const ceos = [
    {
        name: 'Prince Sagar',
        role: 'CEO & Producer',
        phone: '+91 7982883097',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prince',
    },
    {
        name: 'Manish Pawar',
        role: 'CEO & Producer',
        phone: '+91 9891996799',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manish',
    },
    {
        name: 'Surinder Kumar Goel',
        role: 'CEO & Producer',
        phone: '+91 9310075702',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Surinder',
    },
];

export default function TeamPage() {
    return (
        <div className="team-page">
            <header className="team-header">
                <div className="container">
                    <h1 className="team-title">Meet the Minds Behind the Magic</h1>
                    <p className="team-subtitle">
                        Our team is the heart of our company. Each member brings their unique skills, passion, and creativity to the table, ensuring that every project we undertake is a masterpiece.
                    </p>
                </div>
            </header>

            {/* <section className="team-section container">
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-card">
                            <div className="team-image-wrapper">
                                <img src={member.image} alt={member.name} className="team-image" />
                            </div>
                            <div className="team-info">
                                <h3 className="team-member-name">{member.name}</h3>
                                <p className="team-member-role">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}

            <section className="ceo-section bg-light">
                <div className="container">
                    {/* <h2 className="section-title">Leadership Team</h2> */}
                    <div className="ceo-grid">
                        {ceos.map((ceo, index) => (
                            <div key={index} className="ceo-card">
                                <div className="ceo-image-wrapper">
                                    <img src={ceo.image} alt={ceo.name} className="ceo-image" />
                                </div>
                                <div className="ceo-info">
                                    <h3 className="ceo-name">{ceo.name}</h3>
                                    <p className="ceo-role">{ceo.role}</p>
                                    <a href={`tel:${ceo.phone.replace(/\s/g, '')}`} className="ceo-phone">
                                        {ceo.phone}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
