import { greetUser } from '../modules/user.mjs';
import { renderSkillTracker } from '../components/skillTracker.mjs';
import { renderResumeAnalyzer } from '../components/resumeAnalyzer.mjs';
import loadHeaderFooter from "./utilities.mjs";



loadHeaderFooter("#header", "#footer");
//document.querySelector('#hamburger').addEventListener('click', () => {
   //document.querySelector('#mobile-nav').classList.toggle('show');
//});

greetUser();
renderSkillTracker("skill-tracker");
renderResumeAnalyzer("resume-analyzer");
