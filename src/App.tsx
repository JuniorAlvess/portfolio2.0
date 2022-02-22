import { useEffect, useState, useRef, FormEvent } from 'react';
import axios from 'axios';
import { useScroll } from './hooks/getScroll'
import { useLoading } from './hooks/getLoad'
import emailjs from '@emailjs/browser';
import { init } from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

import { AiOutlineHome } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { IoMdCodeWorking } from 'react-icons/io';
import { CgUser } from 'react-icons/cg'
import { FiSend } from 'react-icons/fi';
import { HiOutlineArrowCircleUp } from 'react-icons/hi'

import photo from './assets/me2.png';
import projects from './assets/projects.json';
import Project from './components/project';

init("user_vyUWjXUA5AnP9Cqfmn2x7");
function App() {
  const [user_email, setUser_email] = useState<string>('');
  const [user_name, setUser_name] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const { scroll } = useScroll();
  const { loading } = useLoading();
  const techs = projects.map(project => project.techs).flat().map(tech => tech.tech);
  var techsFiltered = techs.filter((tech, i) => techs.indexOf(tech) === i);
  const form = useRef<any>();
  
  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (user_email === '' || user_name === '' || message === '') {
      toast.error('Please fill all fields!');
      return;
    }
    try {
      const sendEmail = await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
        service_id: 'service_g75ti5e',
        template_id: 'template_qpdqtud',
        user_id: 'user_vyUWjXUA5AnP9Cqfmn2x7',
        template_params: {
          user_email: user_email,
          user_name: user_name,
          message: message
        }
      })
      if (sendEmail.status === 200) {
        toast.success("Email sent successfully!");
        setUser_email('');
        setUser_name('');
        setMessage('');
      }
    } catch (err) {
      toast.error('Error sending email!');
    }
  };

  return (
    <div className="container">
      <nav className='side-menu'>
        <ul>
          <li> <a href="#work"> <span>Work</span> <IoMdCodeWorking className='icon-menu' /> </a> </li>
          <li> <a href="#resume"> <span>Resume</span> <CgUser className='icon-menu' /> </a> </li>
          <li> <a href="#contact"> <span>Contact</span> <BiMessageSquareDetail className='icon-menu' /> </a> </li>
        </ul>
      </nav>

      <header id="home">
        <nav>
          <ul style={window.matchMedia('(max-width: 790px)').matches && scroll > 10 ? { filter: 'drop-shadow(1rem 0 0.75rem var(--third-color))' } : undefined}>
            <li> <a href="#work">Work</a> </li>
            <li> <a href="#resume">Resume</a> </li>
            <li> <a href="#contact"> Contact</a> </li>
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
              role="Contact me"
              onClick={() => { window.location.href = '#contact' }}
            >Contact me</button>
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
            <button>All ({techs.length})</button>
            {techsFiltered.map(tech => (
              <button>{techs.filter((e, i) => techs.indexOf(tech) === i) && tech} ({techs.filter(t => t === tech).length})</button>
            ))}
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
            <strong> Análise e Desenvolvimento de Sistemas </strong>
            <p> University Nove de Julho (Uninove) </p>
            <span> Feb 2019 - Jun 2021 </span>
          </section>

          <section>
            <h3>Work Experience</h3>
            <strong> FullStack Developer </strong>
            <p> BizSys </p>
            <span> Sep 2021 - Present </span>
          </section>

          <section>
            <h3> Skills and Tools </h3>
            <ol>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>TypeScript</li>
              </ul>
              <ul>
                <li>React.js</li>
                <li>Node.js</li>
                <li>Sass</li>
                <li>Rest API</li>
              </ul>
              <ul>
                <li>Git</li>
                <li>GitHub</li>
                <li>GitLab</li>
                <li>Insomnia</li>
              </ul>
            </ol>
          </section>

          <a href="./assets/" download="mario.png">Download CV (PDF)</a>
        </section>
        <section>
          <h2 id="contact">Contact</h2>
          <p>
            Let me know if you are interested in my services or collaboration.
            <br />
            I will reply as soon as possible.
          </p>

          <form ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              name="user_name"
              placeholder='Enter your full name'
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder='Enter your email address'
              value={user_email}
              onChange={(e) => setUser_email(e.target.value)}
              required
            />
            <textarea
              rows={7}
              name="message"
              placeholder='Tell me'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit"> <FiSend className='icon' /> Send </button>
          </form>
        </section>
        <HiOutlineArrowCircleUp
          className={scroll > 500 ? 'arrow-up enable' : 'arrow-up'}
          onClick={() => { window.location.href = '#home' }}
        />
      </main>
      <Toaster
        position='bottom-left'
      />
    </div>
  );
}

export default App;
