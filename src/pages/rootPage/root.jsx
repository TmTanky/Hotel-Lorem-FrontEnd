import React from 'react'

// CSS
import './root-styles.css'

const RootPage = () => {

    return (
        <main>

            <section className="sec1">
                <div className="intro1">
                    <h1> Pick a place that you need </h1>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat officiis eum hic. Labore id architecto iure adipisci, iste cupiditate delectus debitis vitae laborum inventore iusto modi expedita illum at mollitia quos officia corrupti eius. Debitis magnam suscipit aspernatur. Quasi assumenda nemo adipisci corporis dolores ex quisquam quae rerum commodi debitis! </p>
                    <button className="getstartedbtn"> Get Started </button>
                </div>

                <div className="intro2">
                    <img src="https://image.freepik.com/free-photo/luxury-bedroom-suite-resort-high-rise-hotel-with-working-table_105762-1783.jpg" alt=""/>
                </div>
            </section>

            <hr style={{width: "95%", margin: '1rem auto'}} />

            <section className="sec2">
                <div>
                    <h1> Lorem Ipsum </h1>
                    <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptate unde quas, ex porro, rem quidem obcaecati necessitatibus veritatis nulla incidunt deleniti quam, a distinctio magnam non iste dolorem voluptatem. </p>
                </div>

                <div>
                    <h1> Lorem Ipsum </h1>
                    <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptate unde quas, ex porro, rem quidem obcaecati necessitatibus veritatis nulla incidunt deleniti quam, a distinctio magnam non iste dolorem voluptatem. </p>
                </div>

                <div>
                    <h1> Lorem Ipsum </h1>
                    <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptate unde quas, ex porro, rem quidem obcaecati necessitatibus veritatis nulla incidunt deleniti quam, a distinctio magnam non iste dolorem voluptatem. </p>
                </div>
            </section>

            <hr style={{width: "95%", margin: '1rem auto'}} />

            <section className="sec3">

                <div className="footerlogo">
                    <h1> Hotel-Lorem </h1>
                </div>

                <div className="sociallinks">
                    <img src="https://img.icons8.com/material-sharp/30/000000/facebook.png" alt="facebook logo" />
                    <img src="https://img.icons8.com/material-sharp/30/000000/twitter.png" alt="twitter logo" />
                    <img src="https://img.icons8.com/material-sharp/30/000000/instagram-new.png" alt="instagram logo" />
                    <img src="https://img.icons8.com/material-sharp/30/000000/github.png" alt="github logo" />
                </div>

            </section>

        </main>
    )
}

export default RootPage