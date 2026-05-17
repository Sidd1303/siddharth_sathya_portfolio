export const profile = {
  name: 'Siddharth Sathya',
  title: 'Cybersecurity Engineer',
  email: 'siddharthsathya2002@gmail.com',
  phone: '+1 (315) 418-3476',
  linkedin: 'https://www.linkedin.com/in/siddharth-sathya/',
  location: 'Syracuse, NY — Open to Relocation',
  tagline: 'Break it. Understand it. Secure it.',
  summary:
    'M.S. Information Systems, Syracuse University. National level competitor at NCAE Cyber Games. Production impact at Ford and PurpleTalk. AWS certified at professional level.',
}

export const contact = {
  email: profile.email,
  phone: profile.phone,
  linkedin: profile.linkedin,
  location: profile.location,
  openToWork: true,
}

export const skills = [
  {
    category: 'Security Tools',
    items: [
      'Microsoft Sentinel',
      'Wazuh',
      'Splunk',
      'Nmap',
      'Burp Suite',
      'SAST',
      'DAST',
      'Alert Triage',
      'Incident Response',
    ],
    highlighted: [
      'Microsoft Sentinel',
      'Wazuh',
      'Splunk',
      'Burp Suite',
      'Incident Response',
    ],
  },
  {
    category: 'Cloud',
    items: [
      'AWS IAM',
      'EC2',
      'CloudWatch',
      'ECS',
      'CloudTrail',
      'Microsoft Purview',
      'Defender for Cloud Apps',
    ],
    highlighted: ['AWS IAM', 'EC2', 'ECS', 'CloudTrail', 'CloudWatch'],
  },
  {
    category: 'Development',
    items: [
      'Python',
      'Shell Scripting',
      'KQL',
      'SQL',
      'Docker',
      'GitLab CI/CD',
      'Git',
      'PowerShell',
    ],
    highlighted: ['Python', 'KQL', 'Docker', 'GitLab CI/CD', 'Shell Scripting'],
  },
  {
    category: 'Frameworks',
    items: [
      'NIST',
      'MITRE ATT&CK',
      'OWASP Top 10',
      'OWASP LLMs',
      'Zero Trust',
      'ISO 27001',
    ],
    highlighted: ['NIST', 'MITRE ATT&CK', 'OWASP Top 10', 'OWASP LLMs', 'Zero Trust'],
  },
  {
    category: 'Networking',
    items: [
      'BGP',
      'OSI Model',
      'TCP/IP',
      'DNS',
      'DHCP',
      'VLANs',
      'MikroTik',
      'SSH',
      'VPN',
    ],
    highlighted: ['TCP/IP', 'DNS', 'SSH', 'VPN', 'VLANs'],
  },
]

export const competitions = [
  {
    title: 'NCAE Cyber Games National Invitational',
    location: 'Tampa, FL',
    date: 'Apr 2026',
    award: 'National Record',
    badge: 'National Level',
    description:
      'Broke national record solving 4 SOC CTF challenges in under 3 minutes among 12 of 120 teams nationally. Every Blue Team VM pre-compromised at start requiring real-time SSH key generation, dynamic password rotation, and custom hardening scripts. Hardware CTF included building Raspberry Pi circuit from scratch.',
    // e.g. '/images/competitions/ncae-national.jpg'
    images: [],
  },
  {
    title: 'NCAE Cyber Games Midwest Regional',
    location: 'Midwest Regional',
    date: 'Feb 2026',
    award: '1st Place',
    badge: '1st Place',
    description:
      'Led 7-member team to 1st place defending live scored infrastructure (SSH, SMB, WWW, SQL, DNS, Router ICMP) while solving CTF challenges across cryptography, malware analysis, reverse engineering, and SOC analysis.',
    images: [],
  },
  {
    title: 'CNY Hackathon Terminal Stack',
    location: 'Utica, NY',
    date: 'Nov 2025',
    award: '1st Place',
    badge: '1st Place',
    description:
      'Won first-ever cybersecurity competition track defending live critical infrastructure against continuous Red Team attacks over 8 hours.',
    images: [],
  },
]

export const projects = [
  {
    name: 'IAM Governance Tool',
    category: 'Cloud Security',
    tech: ['AWS ECS', 'IAM', 'CloudTrail', 'Docker', 'GitLab CI/CD', 'Python'],
    description:
      'Built IAM governance web application with real-time user access visibility, MFA compliance tracking, and audit trails.',
    github: '',
  },
  {
    name: 'Azure SIEM Microsoft Sentinel',
    category: 'SIEM Engineering',
    tech: ['Microsoft Sentinel', 'Azure', 'KQL', 'Log Analytics', 'PowerShell'],
    description:
      'Deployed full Azure SIEM with 54,000+ IP geolocation records enriched via KQL, live global attack map for real-world RDP brute-force monitoring.',
    github: '',
  },
  {
    name: 'MLSecOps Governance Framework',
    category: 'AI Security',
    tech: ['NIST', 'OWASP LLMs', 'MLSecOps', 'AI Security', 'Risk Assessment'],
    description:
      "Built at Ford. Adopted as backbone framework for Ford's newly formed MLSecOps team.",
    github: '',
  },
  {
    name: 'Centralized Security Dashboard',
    category: 'DevOps Security',
    tech: ['Wazuh', 'SonarQube', 'AWS', 'Shell Scripting', 'Python'],
    description:
      'Monitoring platform across 150+ live client AWS instances cutting 2-week workflows to hours.',
    github: '',
  },
]

export const experience = [
  {
    company: 'Ford Global Technology Business Center',
    role: 'Cybersecurity DevSecOps Intern',
    period: 'May 2025 — Aug 2025',
    location: 'Chennai, India',
    highlights: [
      'Assessed AI systems against NIST and OWASP Top 10 for LLMs.',
      'Built MLSecOps Governance Roadmap adopted by newly formed team.',
      'Delivered security awareness sessions for new employees.',
    ],
  },
  {
    company: 'PurpleTalk India Ltd',
    role: 'DevOps Engineer Intern',
    period: 'Dec 2023 — Jun 2024',
    location: 'Hyderabad, India',
    highlights: [
      'Built centralized monitoring platform across 150+ live AWS instances reducing workflows from 2 weeks to hours.',
    ],
  },
]

export const certifications = [
  {
    issuer: 'CompTIA',
    name: 'Security+',
    status: 'Active',
    credly: '',
  },
  {
    issuer: 'Amazon Web Services',
    name: 'AWS DevOps Engineer Professional',
    status: 'Active',
    credly: '',
  },
  {
    issuer: 'Amazon Web Services',
    name: 'AWS Solutions Architect Associate',
    status: 'Active',
    credly: '',
  },
]

export const education = [
  {
    institution: 'Syracuse University',
    degree: 'M.S. Information Systems',
    graduation: 'May 2026',
    gpa: '3.82',
  },
  {
    institution: 'Vellore Institute of Technology',
    degree: 'B.Tech Electronics and Computer Engineering',
    graduation: 'Jul 2024',
  },
]
