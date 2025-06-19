"use client";
import { motion } from 'framer-motion';

const features = [
  { title: 'Premium Quality', text: 'Made with the finest ingredients.' },
  { title: 'Family Recipes', text: 'Generations of taste and care.' },
  { title: '18+ Countries', text: 'Loved across Europe.' },
];

export default function Features() {
  return (
    <section id="features" style={{ padding:'4rem 2rem', background:'#fff' }}>
      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',
        gap:'2rem', maxWidth:'1200px', margin:'0 auto'
      }}>
        {features.map((f, i) => (
          <motion.div key={i}
            initial={{ opacity:0, y:30 }} 
            whileInView={{ opacity:1, y:0 }} 
            viewport={{ once:true }} 
            transition={{ delay: i * 0.2 }}
            style={{
              background:'#FBEDEE', padding:'2rem', borderRadius:'12px',
              boxShadow:'0 4px 6px rgba(0,0,0,0.1)'
            }}>
            <h3 style={{ color:'#E85C26' }}>{f.title}</h3>
            <p style={{ color:'#333' }}>{f.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
