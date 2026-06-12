import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {

  const T = {
  bg:         "#F5E6C8",   
  bgCard:     "#FDF3DC",   
  bgDeep:     "#EDD9A3",   
  accent:     "#E07B2A",   
  accentDark: "#B85C10",   
  accentLight:"#F4A44A",   
  yellow:     "#F5C518",   
  yellowLight:"#FDE882",   
  yellowDeep: "#C9970A",   
  text:       "#7A2E00",   
  textMid:    "#B05010",  
  textLight:  "#C4832A",   
  border:     "#E8C87A",   
  borderDark: "#D4A43A",   
  white:      "#FFFBF0",   
};


  return (
    <footer style={{
      background: "#EDD9A3",
      borderTop: `1px solid ${T.border}`,
      padding: "4rem 2rem 2rem",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      display : "flex",
      flexDirection : "row"
    }}>

   
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "2.5rem",
        marginBottom: "3rem",
      }}>

     
        <div>
          <div style={{ display: "flex",  alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: T.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, color: "#fff", fontWeight: 700,
            }}>N</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: T.text, fontFamily: "'Playfair Display', Georgia, serif" }}>
              NoteLover
            </span>
          </div>
          <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.7, maxWidth: 200 }}>
            Your second brain. Capture, organize, and act on your ideas with AI.
          </p>
        
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>

         
         <a href="https://github.com/backend-glitch" target="_blank" >
         
            <FaGithub  className="text-4xl "></FaGithub>
         </a>

           
<a href="https://www.linkedin.com/in/arjun-verma-100a26393" target="_blank" >

  <FaLinkedin className="text-4xl" ></FaLinkedin>
</a>
           
          </div>
        </div>

    </div>

    </footer>
  );
};

export default Footer;