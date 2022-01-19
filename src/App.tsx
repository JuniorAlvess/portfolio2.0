import photo from './assets/mario.png';

function App() {
  return (
    <div className="container">
      <header>
        <nav>
          <ul>
            <li>Work</li>
            <li>Resume</li>
            <li>Contact</li>
          </ul>
        </nav>

        <section>
          <img src={photo} alt="Junior" width={450} height={500} />
          <article>
            <h1>Hi, I'm Junior and I'm a FullStack Developer.</h1>
            <p>
              Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris
              se pirulitá.Interagi no mé, cursus quis, vehicula ac nisi.Delegadis gente finis,
              bibendum egestas augue arcu ut est.Paisis, filhis, espiritis santis.
            </p>
            <button>Contact me</button><button>Check my work</button>
          </article>
        </section>
      </header>
    </div>
  );
}

export default App;
