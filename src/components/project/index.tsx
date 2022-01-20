import { FiEye, FiGithub } from 'react-icons/fi';
import photo from './assets/mario.png';

interface IProject {
    img: string;
    title: string,
    techs: string[],
    description: string,
    linkPreview: string,
    linkGithub: string,
}

const Project = (project: IProject) => {
    return (
        <div className="project">
            <div className="img-container">
                <img src={project.img} alt={project.title} draggable={false} />
            </div>
            <h3>{project.title}</h3>
            <div className="techs">
                {project.techs.map(tech => <strong key={tech}>{tech}</strong>)}
            </div>
            <p className='description'>
                
            </p>

            <div className="button-container">
                <button><FiEye />  Preview</button><button><FiGithub /> Github Repo</button>
            </div>
        </div>
    );
}

export default Project;