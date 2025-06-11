'use client';

export default function SelfCare() {
  const resources = [
    {
      category: 'Mental Health',
      emoji: '🧠',
      color: 'accent-purple',
      organizations: [
        {
          name: 'National Suicide Prevention Lifeline',
          description: '24/7 support for people in suicidal Crisis or emotional distress',
          phone: '988',
          website: 'https://988lifeline.org',
          emoji: '🆘'
        },
        {
          name: 'Crisis Text Line',
          description: '24/7 text support for any type of crisis',
          text: 'Text HOME to 741741',
          website: 'https://www.crisistextline.org',
          emoji: '💬'
        },
        {
          name: 'SAMHSA\'s National Helpline',
          description: 'Treatment referral and information service for individuals facing mental health or substance use disorders',
          phone: '1-800-662-4357',
          website: 'https://www.samhsa.gov/find-help/national-helpline',
          emoji: '🏥'
        }
      ]
    },
    {
      category: 'Domestic Violence',
      emoji: '🛡️',
      color: 'accent-blue',
      organizations: [
        {
          name: 'National Domestic Violence Hotline',
          description: '24/7 support for victims of domestic violence',
          phone: '1-800-799-7233',
          website: 'https://www.thehotline.org',
          emoji: '🆘'
        }
      ]
    },
    {
      category: 'LGBTQ+ Support',
      emoji: '🏳️‍🌈',
      color: 'accent-pink',
      organizations: [
        {
          name: 'The Trevor Project',
          description: '24/7 crisis intervention and suicide prevention for LGBTQ+ youth',
          phone: '1-866-488-7386',
          text: 'Text START to 678-678',
          website: 'https://www.thetrevorproject.org',
          emoji: '🌈'
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-16">
        <div className="text-6xl mb-6 animate-bounce-slow">💚</div>
        <h1 className="text-4xl md:text-5xl font-bold gradient-text-animated mb-6">
          Self-Care Resources
        </h1>
        <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed">
          You're not alone. These resources are here to help you through difficult times.
        </p>
      </div>
      
      <div className="card p-8 mb-12">
        <div className="text-center">
          <div className="text-4xl mb-4">🤗</div>
          <h2 className="text-2xl font-semibold gradient-text mb-6">Remember</h2>
          <div className="space-y-4 text-lg">
            <p className="text-text-primary">
              It's okay to not be okay. Reaching out for help is a sign of <strong className="text-accent-purple">strength</strong>, not weakness.
            </p>
            <p className="text-text-primary">
              These resources are available <strong className="text-accent-blue">24/7</strong> and are completely <strong className="text-accent-pink">confidential</strong>.
            </p>
            <div className="glass rounded-xl p-6 mt-6">
              <p className="text-accent-purple font-semibold text-xl">
                🚨 If you're in immediate danger, please call emergency services (911) right away.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {resources.map((section, index) => (
          <div 
            key={section.category} 
            className="card p-8 animate-slide-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="flex items-center mb-8">
              <div className="text-4xl mr-4">{section.emoji}</div>
              <h2 className="text-3xl font-bold gradient-text">{section.category}</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              {section.organizations.map((org, orgIndex) => (
                <div 
                  key={org.name} 
                  className="resource-card animate-fade-in"
                  style={{ animationDelay: `${(index * 200) + (orgIndex * 100)}ms` }}
                >
                  <div className="flex items-start mb-4">
                    <div className="text-3xl mr-4">{org.emoji}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-accent-blue mb-2">{org.name}</h3>
                      <p className="text-text-primary leading-relaxed">{org.description}</p>
                    </div>
                  </div>
                  <div className="space-y-3 mt-6">
                    {org.phone && (
                      <div className="glass rounded-lg p-4">
                        <p className="text-text-primary">
                          <span className="font-semibold text-accent-purple">📞 Phone:</span>{' '}
                          <a 
                            href={`tel:${org.phone}`} 
                            className="text-accent-blue hover:text-accent-purple transition-colors duration-300 font-semibold text-lg"
                          >
                            {org.phone}
                          </a>
                        </p>
                      </div>
                    )}
                    {org.text && (
                      <div className="glass rounded-lg p-4">
                        <p className="text-text-primary">
                          <span className="font-semibold text-accent-purple">💬 Text:</span> 
                          <span className="text-accent-blue font-semibold">{org.text}</span>
                        </p>
                      </div>
                    )}
                    <div className="glass rounded-lg p-4">
                      <p className="text-text-primary">
                        <span className="font-semibold text-accent-purple">🌐 Website:</span>{' '}
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-blue hover:text-accent-purple transition-colors duration-300 font-semibold hover:underline"
                        >
                          Visit Website →
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card p-8 mt-12 text-center">
        <div className="text-4xl mb-4">🌟</div>
        <h3 className="text-2xl font-semibold gradient-text mb-4">
          Additional Self-Care Tips
        </h3>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="glass rounded-xl p-6">
            <div className="text-3xl mb-3">🧘‍♀️</div>
            <h4 className="font-semibold text-accent-purple mb-2">Mindfulness</h4>
            <p className="text-text-secondary text-sm">Take a few minutes to breathe and center yourself</p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl mb-3">🚶‍♂️</div>
            <h4 className="font-semibold text-accent-blue mb-2">Movement</h4>
            <p className="text-text-secondary text-sm">Even a short walk can improve your mood</p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl mb-3">💤</div>
            <h4 className="font-semibold text-accent-pink mb-2">Rest</h4>
            <p className="text-text-secondary text-sm">Prioritize sleep and relaxation</p>
          </div>
        </div>
      </div>
    </div>
  );
}