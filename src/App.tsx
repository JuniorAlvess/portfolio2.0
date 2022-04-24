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
import { CgUser } from 'react-icons/cg';
import { FiSend } from 'react-icons/fi';
import { HiOutlineArrowCircleUp } from 'react-icons/hi';
import { RiLinkedinLine } from 'react-icons/ri';
import { SiWhatsapp } from 'react-icons/si';

import photo from './assets/me2.png';
import projects from './assets/projects.json';
import Project from './components/project';


init("user_vyUWjXUA5AnP9Cqfmn2x7");

/**
 * TODO:
 * Filter technologies (Done!)
 * Add my social network (Done!)
 * Create a animation button loading (Done!) 
 * Insert my resume (Done!)
 * make a text resume (Done!)
 * make a description projects in english (Done!)
 */

/**
 * FIXME:
 * resolve a bug of width on filter projects (Done!)
 * resolve a bug on email.js
 */

function App() {
  const [user_email, setUser_email] = useState<string>('');
  const [user_name, setUser_name] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [filteredProjects, setFilteredProjects] = useState<string>('all');
  const [filterProjects, setFilterProjects] = useState<any>();
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
          user_email: user_email,
          user_name: user_name,
          message: message
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

  const bubble = () => {
    for (let i = 0; i < 200; i++) {
      let bubble = document.createElement('i');
      let x = Math.floor((Math.random() * window.innerWidth));
      let y = Math.floor(Math.random() * window.innerHeight);
      let size = Math.random() * 8;

      bubble.classList.add('bubble');
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      container.current?.appendChild(bubble);
    }
  }
  useEffect(() => {
    bubble();
  }, [])

  // continuar
  // useEffect(() => {
  //   projects.forEach(project => project.techs.filter(tech => setFilterProjects(tech.tech.toLocaleLowerCase() === filteredProjects.toLocaleLowerCase())));
  // }, [filteredProjects])
  return (
    <div ref={container} className="container">
      <nav className='side-menu'>
        <ul>
          <li> <a href="#work"> <span>Work</span> <IoMdCodeWorking className='icon-menu' /> </a> </li>
          <li> <a href="#resume"> <span>Resume</span> <CgUser className='icon-menu' /> </a> </li>
          <li> <a href="#contact"> <span>Contact</span> <BiMessageSquareDetail className='icon-menu' /> </a> </li>
          <li> <a href="https://www.linkedin.com/in/ejalves/" target="_blank"> <span>Linkedin</span> <RiLinkedinLine className='icon-menu' /> </a> </li>
          <li> <a href="https://web.whatsapp.com/send?phone=5511930197938" target="_blank"> <span>WhatsApp</span> <SiWhatsapp className='icon-menu' /> </a> </li>
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
            at Universidade Nove de Julho (Uninove) where I will graduate in July 2021.
          </p>

          <section>
            <h3>Education</h3>
            <strong> Analysis and Systems Development </strong>
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

          <a href="/assets/junior-alves.pdf" download>Download CV (PDF)</a>
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
            <button type="submit"> <FiSend style={isLoading ? { animation: 'iconAnim 1s infinite alternate' } : { animation: '' }} /> {!isLoading ? 'Send' : ''} </button>
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
