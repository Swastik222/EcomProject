import React from 'react';

const About = () => {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-gradient" style={{ fontSize: '42px', marginBottom: '20px' }}>
          About SwastikTech
        </h1>
        <div style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '20px' }}>
            Welcome to SwastikTech, the premier destination for high-end, cutting-edge technology. 
            We believe that premium technology should be matched with an equally premium shopping experience.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Our mission is to curate the finest selection of gadgets, computing devices, and smart electronics.
            Every product in our catalog goes through a rigorous selection process to ensure it meets our standards
            of excellence and innovation.
          </p>
          <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '20px', flex: 1, textAlign: 'center' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Premium Quality</h3>
              <p style={{ fontSize: '14px' }}>Curated tech from top brands worldwide.</p>
            </div>
            <div className="glass-panel" style={{ padding: '20px', flex: 1, textAlign: 'center' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Fast Shipping</h3>
              <p style={{ fontSize: '14px' }}>Express delivery globally within 48 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
