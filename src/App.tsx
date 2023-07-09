import { useEffect, useState, useRef, FormEvent } from 'react';
import axios from 'axios';
import { useScroll } from './hooks/getScroll'
import { useLoading } from './hooks/getLoad'
import emailjs from '@emailjs/browser';
import { init } from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

import { FiPlusCircle } from 'react-icons/fi';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { IoMdCodeWorking } from 'react-icons/io';
import { CgUser } from 'react-icons/cg';
import { FiSend, FiGithub } from 'react-icons/fi';
import { HiOutlineArrowCircleUp } from 'react-icons/hi';
import { RiLinkedinLine } from 'react-icons/ri';
import { AiOutlineWhatsApp } from 'react-icons/ai';

import photo from './assets/eu.png';

import projects from './assets/projects.json';
import Project from './components/project';
import Role from './components/role';


init("user_vyUWjXUA5AnP9Cqfmn2x7");

function App() {
  const [user_email, setUser_email] = useState<string>('');
  const [user_name, setUser_name] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [filteredProjects, setFilteredProjects] = useState<string>('all');
  const [filterProjects, setFilterProjects] = useState<any>();
  const [activeMenuMobile, setActiveMenuMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { scroll } = useScroll();
  const { loading } = useLoading();

  const techs = projects.map(project => project.techs).flat().map(tech => tech.tech);
  let techsFiltered = techs.filter((tech, i) => techs.indexOf(tech) === i);

  const form = useRef<any>();
  const followingCursor = useRef<any>(null);
  const container = useRef<any>(null);

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (user_email === '' || user_name === '' || message === '') {
      toast.error('Please fill all fields!');
      return;
    }
    setIsLoading(true);
    try {
      const sendEmail = await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
        service_id: 'service_g75ti5e',
        template_id: 'template_qpdqtud',
        user_id: 'user_vyUWjXUA5AnP9Cqfmn2x7',
        template_params: {
          to_name: "Junior Alves",
          user_email: user_email,
          user_name: user_name,
          message: message,
          reply_to: user_email
        }
      })
      if (sendEmail.status === 200) {
        setIsLoading(false);
        toast.success("Email sent successfully!");
        setUser_email('');
        setUser_name('');
        setMessage('');
      }
    } catch (err) {
      toast.error('Error sending email!');
    }
  };

  document.addEventListener('mousemove', (e) => {
    let y = e.clientY;
    let x = e.clientX;
    if (followingCursor.current) {
      followingCursor.current.style.top = `${y}px`;
      followingCursor.current.style.left = `${x}px`;
    }
  });

  // continuar
  // useEffect(() => {
  //   projects.forEach(project => project.techs.filter(tech => setFilterProjects(tech.tech.toLocaleLowerCase() === filteredProjects.toLocaleLowerCase())));
  // }, [filteredProjects])
  return (
    <div ref={container} className="container">
      <nav className={activeMenuMobile ? 'side-menu active' : 'side-menu'}>
        <ul>
          <li> <a href="#work"> <span>Work</span> <IoMdCodeWorking className='icon-menu' /> </a> </li>
          <li> <a href="#resume"> <span>Resume</span> <CgUser className='icon-menu' /> </a> </li>
          <li> <a href="#contact"> <span>Contact</span> <BiMessageSquareDetail className='icon-menu' /> </a> </li>
          <li> <a href="https://www.linkedin.com/in/ejalves/" target="_blank" rel="noreferrer"> <span>Linkedin</span> <RiLinkedinLine className='icon-menu' /> </a> </li>
          <li> <a href="https://github.com/JuniorAlvess" target="_blank" rel="noreferrer"> <span>GitHub</span> <FiGithub className='icon-menu' /> </a> </li>
          <li> <a href="https://web.whatsapp.com/send?phone=5511930197938" target="_blank" rel="noreferrer"> <span>WhatsApp</span> <AiOutlineWhatsApp className='icon-menu' /> </a> </li>
          <li onClick={() => setActiveMenuMobile(!activeMenuMobile)}> <FiPlusCircle className={activeMenuMobile ? 'icon-menu active' : 'icon-menu'} /></li>
        </ul>
      </nav>

      <header id="home">
        <nav>
          <ul style={window.matchMedia('(max-width: 790px)').matches && scroll > 10 ? { filter: 'drop-shadow(1rem 0 0.75rem var(--third-color))', zIndex: 2 } : undefined}>
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
              I am a developer with startup experience. My main stack is HTML, CSS, JavaScript, TypeScript, React.js, Node.js, Sass.
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
            <button disabled={filteredProjects === 'all'} onClick={() => setFilteredProjects('all')}>All ({projects.length})</button>
            {techsFiltered.map(tech => (
              <button onClick={() => setFilteredProjects(tech)}>{techs.filter((e, i) => techs.indexOf(tech) === i) && tech} ({techs.filter(t => t === tech).length})</button>
            ))}
          </div>
          <div className="project-container">
            {
              projects.map((project, index) =>
                filteredProjects === 'all' ? <Project key={index} project={project} /> :
                  project.techs.map(tech => tech.tech.toLocaleLowerCase() === filteredProjects.toLocaleLowerCase() && (
                    <Project key={index} project={project} />
                  ))
              )
            }
          </div>
        </section>

        <section className='resume'>
          <h2 id="resume">Resume</h2>
          <p>
            I entered the job market in 2015 and have been honing my soft skills ever since.
            I started studying programming in 2019 when I started a course in Systems Analysis and Development
            at Universidade Nove de Julho (Uninove) where I graduated in July 2021.
          </p>

          <section>
            <h3>Education</h3>
            <h4> Analysis and Systems Development </h4>
            <p> University Nove de Julho (Uninove) </p>
            <span> Feb 2019 - Jun 2021 </span>
          </section>

          <section>
            <h3>Work Experience</h3>
            <Role
              jobTitle="Full Stack Developer"
              company="CoreBiz"
              linkTo="https://www.corebiz.ag/pt/"
              description="Maintenance in legacy ecommerce using HTML, CSS, JQuery, JavaScript ES6+. 
              Creation and maintenance of templates on the VTEX platform (CMS). Development of pages and integrations with native and third-party APIs. 
              Creation of pages and components using React.js. Development/maintenance of components and pages using VTEX IO"
              duration="Jun 2022 - Present"
            />
            <Role
              jobTitle="Full Stack Developer"
              company="BizSys"
              linkTo="https://www.bizsys.com.br/"
              description="Development of web applications and special projects with React.js and Unity. Development and Maintenance of Rest APIs with PHP (Laravel)"
              duration="Sep 2021 - Jun 2022"
            />
          </section>

          <section>
            <h3> Skills and Tools </h3>
            <ol>
              <ul>
                <li><a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML" rel="noreferrer" target="_blank">HTML</a></li>
                <li><a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS" rel="noreferrer" target="_blank">CSS</a></li>
                <li><a href="https://www.javascript.com/" rel="noreferrer" target="_blank">JavaScript</a></li>
                <li><a href="https://www.typescriptlang.org/" rel="noreferrer" target="_blank">TypeScript</a></li>
                <li><a href="https://www.php.net/" rel="noreferrer" target="_blank">PHP</a></li>
              </ul>
              <ul>
                <li><a href="https://pt-br.reactjs.org/" rel="noreferrer" target="_blank">React.js</a></li>
                <li><a href="https://nodejs.org/en/" rel="noreferrer" target="_blank">Node.js</a></li>
                <li><a href="https://laravel.com/" rel="noreferrer" target="_blank">Laravel</a></li>
                <li><a href="https://www.sass-lang.com/" rel="noreferrer" target="_blank">Sass</a></li>
                <li><a href="https://styled-components.com/" rel="noreferrer" target="_blank">Styled-components</a></li>
              </ul>
              <ul>
                <li><a href="https://www.redhat.com/pt-br/topics/api/what-is-a-rest-api" rel="noreferrer" target="_blank">API RESTful</a></li>
                <li><a href="https://insomnia.rest/" rel="noreferrer" target="_blank">Insomnia</a></li>
                <li><a href="https://git-scm.com/" rel="noreferrer" target="_blank">Git</a></li>
                <li><a href="https://github.com/" rel="noreferrer" target="_blank">GitHub</a></li>
                <li><a href="https://about.gitlab.com/" rel="noreferrer" target="_blank">GitLab</a></li>
              </ul>
            </ol>
          </section>

          <a href="/assets/Ednaldo_Alves_Resume.pdf" download>Download CV (PDF)</a>
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
            <button type="submit"> <FiSend style={isLoading ? { animation: 'iconAnim 1s infinite alternate' } : {}} /> {!isLoading ? 'Send' : ''} </button>
          </form>
        </section>
        <HiOutlineArrowCircleUp
          className={scroll > 500 ? 'arrow-up enable' : 'arrow-up'}
          onClick={() => { window.location.href = '#home' }}
        />
      </main>
      <div className="cursor" ref={followingCursor}>

      </div>
      <Toaster
        position='bottom-left'
      />
    </div>
  );
}

export default App;
