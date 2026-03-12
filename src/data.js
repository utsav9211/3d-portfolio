/* ============================================================
   Sector Data – Every line from the resume mapped here
   ============================================================ */

export const SECTORS = {
  education: {
    title: 'THE ACADEMY BASE',
    position: { x: -30, y: 5, z: -20 },
    cameraOffset: { x: -20, y: 8, z: -10 },
    html: `
      <h2>🎓 THE ACADEMY BASE — Education</h2>

      <h3>Higher Education</h3>
      <p><strong>Galgotias University</strong></p>
      <p>Bachelor of Technology in Computer Science and Engineering (AI)</p>
      <p style="color:#45A29E">Greater Noida, UP &bull; Aug 2023 – July 2027</p>

      <div class="panel-divider"></div>

      <h3>Secondary Education</h3>
      <p><strong>Deoghar College</strong></p>
      <p>Senior Secondary School Certificate</p>
      <p style="color:#45A29E">Deoghar, Jharkhand &bull; Aug 2022 – May 2023</p>
    `,
  },

  experience: {
    title: 'THE EXPERIENCE NEBULA',
    position: { x: 25, y: 10, z: -25 },
    cameraOffset: { x: 15, y: 12, z: -15 },
    html: `
      <h2>🌌 THE EXPERIENCE NEBULA</h2>

      <h3>Data Stream A — AI &amp; Data Analytics Internship</h3>
      <p><strong>Edunet Foundation (IBM &amp; AICTE)</strong></p>
      <p style="color:#45A29E">June 2023 – July 2024 &bull; 4 weeks</p>
      <ul>
        <li>Developed ML models (classification, regression) using Python and Scikit-learn.</li>
        <li>Worked on IBM-guided AI projects and used IBM Watson Studio for model deployment.</li>
        <li>Gained skills in predictive analytics, cloud tools, and AI ethics concepts.</li>
      </ul>

      <div class="panel-divider"></div>

      <h3>Data Stream B — SkillsBuild &amp; IBM Cloud Platform</h3>
      <p><strong>Edunet Foundation — Emerging Technologies (AI &amp; Cloud)</strong></p>
      <ul>
        <li>Learned cloud concepts (IaaS, PaaS, SaaS), virtualization, containers, and serverless workflows.</li>
        <li>Completed IBM SkillsBuild labs on AI, ML basics, and cloud-based model deployment.</li>
        <li>Worked with IBM Cloud, Watson services, and cloud dashboards for real-time applications.</li>
      </ul>
    `,
  },

  projects: {
    title: 'THE PROJECT NODES',
    position: { x: 0, y: -8, z: -35 },
    cameraOffset: { x: 0, y: -3, z: -22 },
    html: `
      <h2>⚙️ THE PROJECT NODES</h2>

      <h3>Node 1 — Transfer Learning Model for Image Classification</h3>
      <p style="color:#45A29E">2024 &bull; 4 weeks</p>
      <ul>
        <li>Developed a multi-class image classification model for 120+ dog breeds using Transfer Learning on a pre-trained Convolutional Neural Network.</li>
        <li>Managed and cleaned a large dataset of 10,000+ labeled images, including handling class imbalance and preparing the data pipeline.</li>
      </ul>

      <div class="panel-divider"></div>

      <h3>Node 2 — AI Resume Shortlisting</h3>
      <p style="color:#45A29E">2024</p>
      <ul>
        <li>Built an AI-powered resume screening system using Flask, Streamlit, and Scikit-learn to automatically shortlist candidates based on job descriptions.</li>
        <li>Implemented resume parsing from PDF (pdfminer.six) and DOCX (python-docx) formats with NLP-based text extraction using NLTK and spaCy.</li>
        <li>Used Sentence-Transformers for semantic similarity scoring between resumes and job descriptions for intelligent candidate ranking.</li>
        <li>Leveraged pandas for data processing, joblib for model serialization, and pytest for test-driven development.</li>
      </ul>
    `,
  },

  certifications: {
    title: 'THE CERTIFICATION HUB',
    position: { x: -20, y: -12, z: -40 },
    cameraOffset: { x: -12, y: -8, z: -28 },
    html: `
      <h2>📜 THE CERTIFICATION HUB</h2>

      <h3>Panel 1 — Programming in Python</h3>
      <p><strong>GUVI</strong></p>
      <p style="color:#45A29E">June 2023 – July 2023</p>
      <ul>
        <li>Completed an intensive Python curriculum covering core concepts, OOP, file handling, and database integration (MySQL).</li>
        <li>Proficiently used Python for data reading/writing from various formats, including JSON and Excel files.</li>
      </ul>

      <div class="panel-divider"></div>

      <h3>Panel 2 — Programming in Java</h3>
      <p><strong>GUVI</strong></p>
      <p style="color:#45A29E">Aug 2023</p>
      <ul>
        <li>Gained experience with Multi-threading and Concurrency concepts to improve application performance and responsiveness.</li>
        <li>Implemented robust error handling using Exception Handling (Checked and Unchecked Exceptions) to ensure program stability and reliability.</li>
      </ul>
    `,
  },

  skills: {
    title: 'THE TECHNOLOGY GRID',
    position: { x: 30, y: -5, z: -45 },
    cameraOffset: { x: 22, y: -2, z: -32 },
    html: `
      <h2>🛠️ THE TECHNOLOGY GRID — Skills</h2>

      <h3>Languages</h3>
      <div class="skill-grid">
        <span class="skill-tag">Java</span>
        <span class="skill-tag">Python</span>
        <span class="skill-tag">C/C++</span>
        <span class="skill-tag">MySQL</span>
        <span class="skill-tag">JavaScript</span>
        <span class="skill-tag">HTML/CSS</span>
      </div>

      <h3>Frameworks</h3>
      <div class="skill-grid">
        <span class="skill-tag">React</span>
        <span class="skill-tag">Node.js</span>
        <span class="skill-tag">Flask</span>
        <span class="skill-tag">WordPress</span>
      </div>

      <h3>Developer Tools</h3>
      <div class="skill-grid">
        <span class="skill-tag">Git</span>
        <span class="skill-tag">VS Code</span>
        <span class="skill-tag">Visual Studio</span>
        <span class="skill-tag">PyCharm</span>
      </div>

      <h3>Libraries</h3>
      <div class="skill-grid">
        <span class="skill-tag">pandas</span>
        <span class="skill-tag">NumPy</span>
        <span class="skill-tag">React</span>
      </div>
    `,
  },
};
