import { greetUser } from './modules/user.mjs';
import { renderSkillTracker } from './components/skillTracker.mjs';
import { renderResumeAnalyzer } from './components/resumeAnalyzer.mjs';

greetUser();
renderSkillTracker("skill-tracker");
renderResumeAnalyzer("resume-analyzer");
