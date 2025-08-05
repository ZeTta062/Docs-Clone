export const templates = [
    { 
        id: "blank", 
        label: "빈 문서", 
        imageUrl: "/blank-document.svg",
        initialContent: "",
    },
    { 
        id: "software-proposal", 
        label: "소프트웨어 개발 제안서", 
        imageUrl: "/software-proposal.svg",
        initialContent: `
            <h1>Software Development Proposal</h1>
            <h2>Project Overview</h2>
            <p>Brief description of the proposed software development project.</p>

            <h2>Scope of Work</h2>
            <p>Detailed breakdown of project deliverables and requirements.</p>

            <h2>Timeline</h2>
            <p>Project milestones and delivery schedule.</p>

            <h2>Budget</h2>
            <p>Cost breakdown and payment terms.</p>
        `,
    },
    { 
        id: "project-proposal", 
        label: "프로젝트 제안서", 
        imageUrl: "/project-proposal.svg",
        initialContent: "",
    },
    { 
        id: "business-letter", 
        label: "비즈니스 서신", 
        imageUrl: "/business-letter.svg",
        initialContent: `
            <h1>비즈니스 서신</h1>
            <p>This is a business letter template.</p>
        `,
    },
    { 
        id: "resume", 
        label: "이력서", 
        imageUrl: "/resume.svg",
        initialContent: `
            <h1>[Your Name]</h1>
            <p>[Contact Information]</p>

            <h2>Professional Summary</h2>
            <p>Brief overview of your professional background and key strengths.</p>

            <h2>Work Experience</h2>
            <p>[Company Name] - [Position]<br>
            [Date Range]</p>

            <h2>Education</h2>
            <p>[Degree] - [Institution]<br>
            [Graduation Year]</p>

            <h2>Skills</h2>
            <p>List of relevant skills and competencies.</p>
        `
    },
    { 
        id: "letter", 
        label: "편지", 
        imageUrl: "/letter.svg",
        initialContent: `
            <p>[Your Name]<br>
            [Your Address]<br>
            [City, State ZIP]</p>

            <p>[Date}</p>

            <p>[Recipient's Name]<br>
            [Company Name]<br>
            [Company Address]</p>

            <p>Dear [Recipient's Name],</p>

            <p>I am writing to express my interest in [position] at [company name].</p>

            <p>Sincerely,<br>
            [Your Name]</p>
        `
    },
]