import photo from './assets/mario.png';
import imageProject from './assets/project.png';

import { FiGithub, FiEye } from 'react-icons/fi';
import projects from './assets/projects.json';

function App() {
  console.log(projects);
  return (
    <div className="container">
      <header>
        <nav>
          <ul>
            <li><a href="#work">Work</a></li>
            <li>Resume</li>
            <li>Contact</li>
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
              role='Check my work'>Check my work</button>
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
            <button>All (2)</button>
            <button>Front-end (5)</button>
            <button>Back-end (0)</button>
          </div>
          <div className="project-container">
            <div className="project">
              <div className="img-container">
                <img src={imageProject} alt="" draggable={false} />
              </div>
              <h3>Title</h3>
              <div className="techs">
                <strong>React.js</strong>
                <strong>Node.js</strong>
                <strong>Sass</strong>
                <strong>+3</strong>
              </div>
              <p className='description'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas saepe sed! Nemo sunt dolore quos numquam ducimus exercitationem accusamus nesciunt consequatur rem? Esse sed quam soluta laudantium ipsam dolor.
              </p>

              <div className="button-container">
                <button><FiEye />  Preview</button><button><FiGithub /> Github Repo</button>
              </div>
            </div>
            <div className="project">
              <div className="img-container">
                <img src={imageProject} alt="" draggable={false} />
              </div>
              <h3>Title</h3>
              <div className="techs">
                <strong>React.js</strong>
                <strong>Node.js</strong>
                <strong>Sass</strong>
                <strong>+3</strong>
              </div>
              <p className='description'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas saepe sed! Nemo sunt dolore quos numquam ducimus exercitationem accusamus nesciunt consequatur rem? Esse sed quam soluta laudantium ipsam dolor.
              </p>

              <div className="button-container">
                <button><FiEye />  Preview</button><button><FiGithub /> Github Repo</button>
              </div>
            </div>
            <div className="project">
              <div className="img-container">
                <img src={imageProject} alt="" draggable={false} />
              </div>
              <h3>Title</h3>
              <div className="techs">
                <strong>React.js</strong>
                <strong>Node.js</strong>
                <strong>Sass</strong>
                <strong>+3</strong>
              </div>
              <p className='description'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas saepe sed! Nemo sunt dolore quos numquam ducimus exercitationem accusamus nesciunt consequatur rem? Esse sed quam soluta laudantium ipsam dolor.
              </p>

              <div className="button-container">
                <button><FiEye />  Preview</button><button><FiGithub /> Github Repo</button>
              </div>
            </div>
            <div className="project">
              <div className="img-container">
                <img src={imageProject} alt="" draggable={false} />
              </div>
              <h3>Title</h3>
              <div className="techs">
                <strong>React.js</strong>
                <strong>Node.js</strong>
                <strong>Sass</strong>
                <strong>+3</strong>
              </div>
              <p className='description'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas saepe sed! Nemo sunt dolore quos numquam ducimus exercitationem accusamus nesciunt consequatur rem? Esse sed quam soluta laudantium ipsam dolor.
              </p>

              <div className="button-container">
                <button><FiEye />  Preview</button><button><FiGithub /> Github Repo</button>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
