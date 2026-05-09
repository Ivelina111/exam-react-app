import { useEffect } from "react";

function About() {

    useEffect(() => {
        document.body.style.backgroundImage =
            "url('/src/assets/food2.png')";
    }, []);

    return (
        <div className="page about-page">
            <h1>About <span>Fork Around & Find Out</span></h1>

            <p className="about-intro">
                Fork Around & Find Out is a recipe space for people who like food,
                experiments and the occasional kitchen chaos. Here you can discover
                recipes, get inspired and, when you are logged in, start building
                your own cooking collection.
            </p>

            <div className="about-cards">
                <div className="about-card">
                    <h2>Discover</h2>
                    <p>
                        Browse different recipes and find ideas for your next meal,
                        whether you want something quick, cozy or completely new.
                    </p>
                </div>

                <div className="about-card">
                    <h2>Create</h2>
                    <p>
                        Registered users can create and save their own recipes,
                        turning the app into a personal cooking notebook.
                    </p>
                </div>

                <div className="about-card">
                    <h2>Experiment</h2>
                    <p>
                        The idea is simple: try things, mix flavors and have fun.
                        Good recipes often start with a little curiosity.
                    </p>
                </div>
            </div>

            <div className="about-section">
                <h2>Why this app?</h2>
                <p>
                    Cooking does not have to be perfect to be enjoyable. Fork Around
                    & Find Out is built around the idea that discovering recipes should
                    feel simple, friendly and a little playful.
                </p>
            </div>
        </div>
    );
}

export default About;