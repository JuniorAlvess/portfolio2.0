import photo from './assets/mario.png';
import projects from './assets/projects.json';
import Project from './components/project';

import { AiOutlineHome } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { IoMdCodeWorking } from 'react-icons/io';
import { CgUser } from 'react-icons/cg'


function App() {
  console.log(projects);
  return (
    <div className="container">
      <nav className='side-menu'>
        <ul>
          <li> <a href="#work"> <span>Work</span> <IoMdCodeWorking className='icon-menu' /> </a> </li>
          <li> <a href="#resume"> <span>Resume</span> <CgUser className='icon-menu' /> </a> </li>
          <li> <a href="#contact"> <span>Contact</span> <BiMessageSquareDetail className='icon-menu' /> </a> </li>
        </ul>
      </nav>

      <header>
        <nav>
          <ul>
            <li> <a href="#work">Work</a> </li>
            <li> <a href="#work">Resume</a> </li>
            <li> <a href="#work"> Contact</a> </li>
          </ul>
        </nav>

        <section>
          <img src={photo} alt="Junior Alves" title="Junior Alves" width={450} height={500} />
          <article>
            <h1>Hi, I'm Junior and I'm a <strong>FullStack Developer</strong>.</h1>
            <p>
              Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris
              se pirulitá.Interagi no mé, cursus quis, vehicula ac nisi.Delegadis gente finis,
              bibendum egestas augue arcu ut est.Paisis, filhis, espiritis santis.
            </p>
            <button
              title='Contact me'
              role="Contact me">Contact me</button>
            <button
              title='Check my work'
              role='Check my work'
              onClick={() => { window.location.href = '#work' }}
            >Check my work</button>
          </article>
        </section>
      </header>

      <main>
        <section className="work">
          <h2 id="work">Work</h2>
          <p>
            Check my commercial and non commercial projects.
            <br />
            if you have any questions feel free to ask me for more information.
          </p>

          <div className="filter-projects">
            <button>All (5)</button>
            <button>Front-end (5)</button>
            <button>Back-end (0)</button>
          </div>
          <div className="project-container">
            {projects.map((project, index) => <Project key={index} project={project} />)}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
