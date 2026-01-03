export interface PDFDocument {
  id: string
  title: string
  authors: string
  year: string
  url: string
  category: "Leadership" | "Crisis Management" | "Research Methods" | "Organizational Theory"
  content: string
  keyFindings: string[]
}

export const pdfDocuments: PDFDocument[] = [
  {
    id: "leadership-crisis-erbil",
    title: "The Role of Effective Leadership Styles in Crisis Management: A Study of Erbil, Iraq",
    authors: "Ali & Anwar",
    year: "2021",
    url: "https://blob.v0.app/s5Nfu.pdf",
    category: "Leadership",
    content: `Abstract— The current study's major goal is to look into the relationship between leadership styles and crisis management at Erbil's Ministry of Planning. A quantitative methodology was employed. Findings show that charismatic leadership had the highest value of all leadership types. Charismatic leadership has become more rigorous in recent decades.`,
    keyFindings: [
      "Charismatic leadership is most effective in Erbil context",
      "Quantitative methods confirmed leadership impact",
      "Growth strategies require modification during crisis",
    ],
  },
  {
    id: "leadership-under-stress",
    title: "Leadership Under Stress",
    authors: "Naim Kapucu",
    year: "2008",
    url: "https://blob.v0.app/2hiSq.pdf",
    category: "Crisis Management",
    content: `This article examines presidential leadership in emergency and crisis management in the U.S. It rates the quality and breadth of presidential involvement based on three factors: distinguishing disaster management from civil defense, selection of qualified leaders, and quality of implementation.`,
    keyFindings: [
      "FEMA creation by Carter was pivotal",
      "Presidents who prioritized disaster management performed better",
      "Post-9/11 subordination of FEMA to DHS created challenges",
    ],
  },
  {
    id: "quantitative-research-methods",
    title: "An Overview of Quantitative Research Methods",
    authors: "Unknown",
    year: "2020",
    url: "https://blob.v0.app/bS0Es.pdf",
    category: "Research Methods",
    content: `Quantitative research methods focus on objective measurements and the statistical analysis of data collected through polls, questionnaires, and surveys. Key concepts include sampling, reliability, and validity.`,
    keyFindings: [
      "Statistical objectivity is core to quantitative research",
      "Reliability and validity are primary quality metrics",
      "Contrasts with qualitative exploration",
    ],
  },
  {
    id: "leadership-crisis-business",
    title: "Leadership, Crisis Management and Business Sustainability",
    authors: "Various",
    year: "2018",
    url: "https://blob.v0.app/Uheq5.pdf",
    category: "Crisis Management",
    content: `Sustainability in business requires robust crisis management frameworks led by capable leaders. Emphasizes proactive planning and resource allocation.`,
    keyFindings: [
      "Leadership competencies link to sustainability",
      "Proactive planning is essential for resilience",
      "Stakeholder relationships must be maintained during crises",
    ],
  },
  {
    id: "self-managing-leadership",
    title: "Role of Self-managing Leadership in Crisis Situations",
    authors: "Various",
    year: "2019",
    url: "https://blob.v0.app/SvaQy.pdf",
    category: "Leadership",
    content: `Self-managing leadership allows for localized agility and faster response times in crisis situations where top-down hierarchies might be too slow.`,
    keyFindings: [
      "Self-management increases response speed",
      "localized agility is key in sudden crises",
      "Fostering self-leadership culture is preparatory",
    ],
  },
  {
    id: "transformational-leadership",
    title: "Transformational Leadership for Crisis Management",
    authors: "Bass et al.",
    year: "1990",
    url: "https://blob.v0.app/x8ZDx.pdf",
    category: "Leadership",
    content: `Transformational leaders inspire followers to exceed expectations by focusing on a shared vision. Particularly effective at maintaining morale during crisis.`,
    keyFindings: [
      "Shared vision maintains morale",
      "Intellectual stimulation drives innovation",
      "Individual consideration supports subordinates",
    ],
  },
  {
    id: "technological-disasters",
    title: "Technological Disasters, Crisis Management and Leadership",
    authors: "Various",
    year: "2017",
    url: "https://blob.v0.app/alB6q.pdf",
    category: "Crisis Management",
    content: `Technological disasters like cyber-attacks present unique challenges. Requires technical expertise combined with strong leadership.`,
    keyFindings: [
      "Technical expertise is vital for tech crises",
      "Public perception management is critical",
      "Accountability vs blame avoidance is a central theme",
    ],
  },
  {
    id: "culture-leadership-crisis",
    title: "Leveraging Culture and Leadership in Crisis Management",
    authors: "Various",
    year: "2016",
    url: "https://blob.v0.app/s0mUz.pdf",
    category: "Organizational Theory",
    content: `Organizational culture dictates response when plans break. Leadership aligning with resilient culture is more effective.`,
    keyFindings: [
      "Culture dictates behavior when plans fail",
      "Decision-making under stress is culture-dependent",
      "Consistency with values builds resilience",
    ],
  },
  {
    id: "leadership-competencies",
    title: "Linking Crisis Management and Leadership Competencies",
    authors: "Kapucu et al.",
    year: "2006",
    url: "https://blob.v0.app/y56Ck.pdf",
    category: "Crisis Management",
    content: `Identifying specific competencies like sense-making and risk assessment is essential for training effective crisis leaders.`,
    keyFindings: [
      "Sense-making is a core leadership competency",
      "Risk assessment must be rapid",
      "Competencies map to pre, acute, and post-crisis phases",
    ],
  },
  {
    id: "style-response-blame",
    title: "Leadership Style, Crisis Response and Blame Management",
    authors: "Various",
    year: "2015",
    url: "https://blob.v0.app/RqGuR.pdf",
    category: "Leadership",
    content: `Explores strategies leaders use to protect reputation, from denial to full apology and rectification.`,
    keyFindings: [
      "Reputation protection varies by style",
      "Apology and rectification is most effective long-term",
      "Denial carries high risk",
    ],
  },
  {
    id: "increasing-impact-ulmer",
    title: "Increasing the Impact: From Positive to Normative Science in Crisis Communication",
    authors: "Robert R. Ulmer",
    year: "2012",
    url: "https://blob.v0.app/i3uIm.pdf",
    category: "Crisis Management",
    content: `The field of crisis communication must move from a positive to a normative science to improve practice. Current leadership research is not positively contributing to society by producing theories that improve practice. Mention cases like Penn State (2012), Fukushima (2011), and Hurricane Katrina (2005).`,
    keyFindings: [
      "Shift from positive to normative science needed",
      "Existing theories focus too much on image repair",
      "Discourse of renewal is a promising normative approach",
    ],
  },
  {
    id: "crisis-leadership-annual-review",
    title: "Crisis Leadership: An Overview and Research Agenda",
    authors: "Riggio & Newstead",
    year: "2023",
    url: "https://blob.v0.app/TpjKO.pdf",
    category: "Leadership",
    content: `Crisis leadership is a relatively underdeveloped field. Explores what we know and what remains unknown. Crises are unexpected events requiring flexible and adaptable leadership. Distinguishes between critical (command), complicated (management), and novel (leadership) problems.`,
    keyFindings: [
      "Novel problems require leadership, not just management",
      "Interconnectedness increases crisis frequency",
      "Ethics play a vital role in leading through crisis",
    ],
  },
  {
    id: "charisma-leadership-determinant",
    title: "Charisma Leadership an Important Determinant for the Crisis Management",
    authors: "Alkhawlani & AL Haderi",
    year: "2016",
    url: "https://blob.v0.app/QLBtc.pdf",
    category: "Leadership",
    content: `Explores the impact of Charisma leadership on crisis management in Yemen. Survey of 30 public and private institutions. Found that charisma leadership has a significant positive impact on crisis management (p=.004).`,
    keyFindings: [
      "Charismatic leadership has a positive impact on crisis management",
      "Followers look to leaders for direction during crisis",
      "Sensitivity to member requirements is part of the charismatic process",
    ],
  },
  {
    id: "leadership-competencies-turkey",
    title: "Core Leadership Competencies in the Effectiveness of Crisis Management",
    authors: "Kapucu & Van Wart",
    year: "2011",
    url: "https://blob.v0.app/LEtP5.pdf",
    category: "Crisis Management",
    content: `Study of executive public leaders in Turkey. Found core leadership competencies have a positive relationship with crisis management effectiveness. Task-oriented behaviors had the highest level of impact.`,
    keyFindings: [
      "Task-oriented behaviors are most critical",
      "Networking and partnering are essential for collaboration",
      "12 core competencies identified for emergency response",
    ],
  },
  {
    id: "collaborative-crisis-leadership",
    title: "Collaborative Crisis Management and Leadership",
    authors: "Various",
    year: "2014",
    url: "https://blob.v0.app/ALWXW.pdf",
    category: "Crisis Management",
    content: `Managing crisis demands inter-organizational collaboration and collaborative leadership skills. Collaborative leaders guide rather than control. Focus on motivating rather than directing.`,
    keyFindings: [
      "Collaboration is necessary for large-scale disasters",
      "Guiding is more effective than controlling in networks",
      "Building trust across organizations is a primary task",
    ],
  },
  {
    id: "specific-strategies-crisis",
    title: "Determining Specific Strategies for Crisis Management",
    authors: "Various",
    year: "2013",
    url: "https://blob.v0.app/Bh82j.pdf",
    category: "Organizational Theory",
    content: `Discusses scenario planning and scenario-based training (SBT) as important strategies to cope with crisis. Re-evaluating existing strategies before implementing new ones is essential.`,
    keyFindings: [
      "Scenario-based training enhances decision-making",
      "Visionary leadership is essential for educational organizations",
      "Two-way communication style is vital for trust",
    ],
  },
  {
    id: "administrative-crisis-leadership",
    title: "Administrative Crisis: The Role of Effective Leadership Styles",
    authors: "Ali & Anwar",
    year: "2021",
    url: "https://blob.v0.app/YdToC.pdf",
    category: "Leadership",
    content: `Investigates relationship between leadership styles and crisis management at Erbil's Ministry of Planning. Charismatic leadership had the highest value.`,
    keyFindings: [
      "Charismatic leadership is most effective in administrative crises",
      "growth strategies frequently require modification",
      "decision-making logic must shift to creativity",
    ],
  },
  {
    id: "destructive-leadership-crisis",
    title: "Destructive Leadership in Crisis Management",
    authors: "Fors Brandebo et al.",
    year: "2020",
    url: "https://blob.v0.app/2F5VK.pdf",
    category: "Leadership",
    content: `Identified seven different destructive leadership behaviors: four task-related and three relationship-related. Task-related behaviors lead to negative consequences for the crisis task. Relationship-related behaviors hurt well-being.`,
    keyFindings: [
      "Active and passive forms of destructive leadership identified",
      "Laissez-faire is a prevalent destructive behavior",
      "High stress increases prone to passive destructive behaviors",
    ],
  },
  {
    id: "leadership-framework-crisis",
    title: "Leadership in Crisis Management: A General Model",
    authors: "Various",
    year: "2010",
    url: "https://blob.v0.app/Cp1mc.pdf",
    category: "Crisis Management",
    content: `Analyzes steps toward effective crisis management. A crisis can be an unexpected event that threatens or causes an organization to blossom. Focus on transformational visionary leadership.`,
    keyFindings: [
      "Transformational leadership is appropriate for development",
      "Crises can be opportunities for organizational growth",
      "Re-evaluation of strategies is a prerequisite for change",
    ],
  },
  {
    id: "crisis-management-general",
    title: "Crisis Management and the Importance of Lead Executive",
    authors: "Fener & Cevik",
    year: "2015",
    url: "https://blob.v0.app/Qfbve.pdf",
    category: "Organizational Theory",
    content: `Rapid organizational change and economic disruptions cause instability. Leadership and crisis concepts are discussed together. Total Quality Management (TQM) principles applied.`,
    keyFindings: [
      "Leader focuses on creativity and harmony, manager on systems",
      "True leaders show themselves in states of crisis",
      "TQM is a tool for sustainable development, not an end itself",
    ],
  },
  {
    id: "leadership-assessment-framework",
    title: "Leadership in Times of Crisis: A Framework for Assessment",
    authors: "Boin, Kuipers & Overdijk",
    year: "2013",
    url: "https://blobs.vusercontent.net/blob/Leadership%20in%20Times%20of%20Crisis%20%20-11--elwybOo3dpDgQiNpAxdZ151IuBm2ui.pdf",
    category: "Crisis Management",
    content: `This article identifies ten critical 'executive tasks' of crisis management: early recognition, sensemaking, making critical decisions, orchestrating coordination, coupling/decoupling, meaning making, communication, rendering accountability, learning, and enhancing resilience. It offers a comprehensive framework for assessing leadership performance based on these tasks rather than just symbolic actions.`,
    keyFindings: [
      "Identified 10 critical executive tasks of crisis management",
      "Strategic leaders should avoid operational micromanagement",
      "Meaning making is crucial for long-term institutional legitimacy",
      "Accountability is often hampered by blame-game dynamics",
    ],
  },
  {
    id: "leadership-times-crisis-framework",
    title: "Leadership in Times of Crisis: A Framework for Assessment",
    authors: "Arjen Boin, Sanneke Kuipers, Werner Overdijk",
    year: "2013",
    url: "https://blobs.vusercontent.net/blob/Leadership%20in%20Times%20of%20Crisis%20%20-11--elwybOo3dpDgQiNpAxdZ151IuBm2ui.pdf",
    category: "Crisis Management",
    content: `This article reflects on the many tasks that strategic leaders are called to perform and offers a comprehensive framework for leadership performance in times of crisis. Identifies ten executive tasks of crisis management: Early Recognition, Sensemaking, Making Critical Decisions, Orchestrating Vertical and Horizontal Coordination, Coupling and Decoupling, Meaning Making, Communication, Rendering Accountability, Learning, and Enhancing Resilience. Uses examples from September 11, 2001, Hurricane Katrina, and other major crises to illustrate effective and ineffective crisis leadership. The framework trains evaluators on all crisis tasks leaders perform, not just those in the media spotlight.`,
    keyFindings: [
      "Ten executive tasks define effective crisis leadership",
      "Early recognition requires continuous vigilance and organizational culture",
      "Sensemaking machinery must be well-rehearsed to process information under stress",
      "Strategic leaders should focus on strategic decisions, not operational micromanagement",
      "Orchestrating coordination lies between persuasion and command-and-control",
      "Meaning making is crucial for long-term legitimacy of public institutions",
      "Learning during and after crisis requires special culture of inquiry",
      "Resilience is built through preparatory practices like drills and scenario exploration",
      "Crisis assessments often driven by blame games rather than comprehensive evaluation",
      "Framework provides fair assessment accounting for difficult conditions leaders face",
    ],
  },
]

export function searchPDFs(query: string) {
  const lowercaseQuery = query.toLowerCase()

  return pdfDocuments
    .map((doc) => {
      let score = 0
      const contentMatch = doc.content.toLowerCase().includes(lowercaseQuery)
      const titleMatch = doc.title.toLowerCase().includes(lowercaseQuery)
      const findingsMatch = doc.keyFindings.some((f) => f.toLowerCase().includes(lowercaseQuery))

      if (titleMatch) score += 10
      if (findingsMatch) score += 5
      if (contentMatch) score += 2

      return {
        document: doc,
        relevance: score,
        matchedContent: doc.content.slice(0, 500) + "...",
      }
    })
    .filter((result) => result.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5)
}
