import { FiEye, FiGithub } from 'react-icons/fi';
import styles from './styles.module.scss';

interface IProjectProps {
    img: string;
    title: string,
    techs: IProjectTechs[],
    description: string,
    linkPreview: string,
    linkGithub: string,
}

interface IProjectTechs {
    tech: string;
    linkTo: string;
}
interface IProject {
    project: IProjectProps;
}

const Project = ({ project }: IProject) => {
    // console.log(project)                                                     
    return (
        <div className={styles.project}>
            <div className={styles.imgContainer}>
                <img src={project.img} alt={project.title} draggable={false} />
            </div>
            <h3>{project.title}</h3>
            <div className={styles.techs}>
                {project.techs.map((tech, index) => {
                    return (
                        <a key={index} href={tech.linkTo} target="_blank">{tech.tech}</a>
                    )
                })}
            </div>
            <p className={styles.description}>
                {project.description}
            </p>

            <div className={styles.buttonContainer}>
                <a
                    style={!project.linkPreview ? { display: "none" } : {}}
                    href={project.linkPreview}
                    target="_blank">
                    <FiEye />  Preview
                </a>
                <a
                    style={!project.linkGithub ? { display: "none" } : {}}
                    href={project.linkGithub}
                    target="_blank">
                    <FiGithub /> Github Repo
                </a>
            </div>
        </div>
    );
}

export default Project;