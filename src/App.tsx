import { useEffect, useState } from 'react';
import { useScroll } from './hooks/getScroll'
import { useLoading } from './hooks/getLoad'

import { AiOutlineHome } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { IoMdCodeWorking } from 'react-icons/io';
import { CgUser } from 'react-icons/cg'

import photo from './assets/me2.png';
import projects from './assets/projects.json';
import Project from './components/project';

function App() {
  const { scroll } = useScroll();
  const { loading } = useLoading();
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
          <ul style={window.matchMedia('(max-width: 790px)').matches && scroll > 10 ? {filter: 'drop-shadow(1rem 0 0.75rem var(--third-color))'} : undefined}>
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
            {/* <button>All (5)</button>
            <button>Front-end (5)</button>
            <button>Back-end (0)</button> */}
          </div>
          <div className="project-container">
            {projects.map((project, index) => <Project key={index} project={project} />)}
          </div>
        </section>

        <section className='resume'>
          <h2 id="resume">Resume</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, laudantium modi.
            Possimus quam distinctio ratione eaque quis hic molestias enim aperiam.
            Fuga repellat nam in placeat cum voluptate maxime laborum!
          </p>

          <section>
            <h3>Education</h3>
            <strong>Análise e Desenvolvimento de Sistemas</strong>
            <p>Universidade Nove de Julho (Uninove)</p>
            <span>Feb 2019 - Jun 2021</span>
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
