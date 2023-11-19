/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Services () {
    return (
    <section class="section-background">
        <div class="container">
            <div class="head">
                <div class="col-md-12 text-center">
                    <h2 class="section-title">The Team Behind <i>Jaring</i></h2>
                </div> 
            </div>
            <div class="profiles">
                <div class="team-item">
                    <img src="src/assets/Cesco.jpg" class="team-img" alt="Marvel" />                   
                    <h3>FRANCESCO MICHAEL KUSUMA</h3>            
                    <div class="team-identity"><p>IF'22 - Institut Teknologi Bandung<br></br><i>13522038</i></p></div>
                    <ul class="team-icon">
                        <li><a href="https://github.com/FrancescoMichael" class="github"><img src="src/assets/github.png"></img></a></li>
                    </ul>
                </div> 

                <div class="team-item">
                    <img src="src/assets/Marvel.jpg" class="team-img" alt="Francesco" />
                    <h3>MARVEL PANGONDIAN</h3>
                    <div class="team-identity"><p>IF'22 - Institut Teknologi Bandung<br></br><i>13522075</i></p></div>
                    <ul class="team-icon">
                        <li><a href="https://github.com/MarvelPangondian" class="github"><img src="src/assets/github.png"></img></a></li>
                    </ul>
                </div>
                <div class="team-item">
                    <img src="src/assets/julian.jpg" class="team-img" alt="Julian" />
                    <h3>JULIAN CHANDRA SUTADI</h3>
                    <div class="team-identity"><p>IF'22 - Institut Teknologi Bandung<br></br><i>13522080</i></p></div>
                    <ul class="team-icon">
                        <li><a href="https://github.com/julianchandras" class="github"><img src="src/assets/github.png" alt=""></img></a></li>
                    </ul>
                </div>
            </div>
        </div> 
    </section>
    )
}

export default Services;