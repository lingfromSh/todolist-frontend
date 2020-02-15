import React from 'react'
import { addPrefetchExcludes } from 'react-static'
// css
import './css/login.css'
import './css/util.css'
import './css/app.css'
import './css/component.css'
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './fonts/iconic/css/material-design-iconic-font.min.css'
// js
import Scene from "scenejs";
import { star } from "shape-svg";
import { request } from './utils/request';
import LoginBox from './components/loginBox'
import ToDoList from './components/todoList';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

export default class App extends React.Component {
  constructor() {
    super()
    this.state = { isLogin: false }
  }

  componentDidMount = () => {
    this.loadCartoon();
  }

  loadCartoon = () => {
    const glittersElement = document.querySelector(".glitters");

    glittersElement.appendChild(star({ className: "star s1", side: 5, strokeWidth: 10, stroke: "#ffa", fill: "#ffa", width: 100, strokeLinejoin: "round" }));

    glittersElement.appendChild(star({ className: "star s2", side: 5, strokeWidth: 10, stroke: "#ffc", fill: "#ffc", width: 100, strokeLinejoin: "round" }));

    glittersElement.appendChild(star({ className: "star s3", side: 5, strokeWidth: 10, stroke: "#ffd", fill: "#ffd", width: 100, strokeLinejoin: "round" }));

    const crewsElement = document.querySelector(".crews");
    const crewHTML = `
  <div class="crew">
    <div class="helmet"></div>
    <div class="head">
      <div class="ear"></div>
      <div class="face-container">
        <div class="eye left"></div>
        <div class="eye right"></div>
        <div class="mouth"></div>
      </div>
    </div>
    <div class="body">
      <div class="controller"></div>
      <div class="bag"></div>
      <div class="arm left"></div>
      <div class="arm right"></div>
      <div class="leg left"></div>
      <div class="leg right"></div>
    </div>
  </div>`;
    const crews = [];
    for (let i = 0; i < 12; ++i) {
      crews[i] = crewHTML;
    }
    crewsElement.innerHTML = crews.join("");

    const crewBodyScene = new Scene({
      ".crew .arm.right": {
        0.1: {
          transform: "translate(0px) rotate(0deg)"
        },

        0.9: {
          transform: "translate(-35px) rotate(180deg)"
        },

        1: {}
      },

      ".crew .arm.left": {
        0.1: {
          transform: "translate(0px) rotate(180deg)"
        },

        0.9: {
          transform: "translate(35px) rotate(0deg)"
        },

        1: {}
      },

      ".crew .leg.right": {
        0.1: {
          transform: "translate(0px) rotate(-80deg)"
        },

        0.9: {
          transform: "translate(-23px) rotate(30deg)"
        },

        1: {}
      },

      ".crew .leg.left": {
        0.1: {
          transform: "translate(0px) rotate(30deg)"
        },

        0.9: {
          transform: "translate(23px) rotate(-80deg)"
        },

        1: {}
      }
    },
      {
        duration: 1,
        iterationCount: "infinite",
        direction: "alternate",
        selector: true,
        easing: "ease-in-out"
      });
    const crewKeyframes = {
      0: {
        transform: {
          translate: "-50%, 20px",
          rotate: "-35deg",
          translateY: "-1000px",
          scale: 0.5,
          rotate2: "-8deg",
          translateY2: "0px"
        }
      }
    };
    for (let i = 1; i <= 24; ++i) {
      crewKeyframes[i] = {
        transform: {
          rotate: `${-35 + i * 2.35}deg`
        }
      };
    }
    for (let i = 20; i <= 24; ++i) {
      crewKeyframes[i].transform.translateY2 = `${25 * (20 - i)}px`;
    }
    for (let i = 22; i <= 24; ++i) {
      crewKeyframes[i].opacity = 1 - (i - 22) / 2;
    }
    const scene = new Scene({
      ".crew": i => {
        return {
          keyframes: crewKeyframes,
          options: {
            delay: i * 2,
            iterationCount: "infinite"
          }
        };
      },
      "crewbody": crewBodyScene
    },
      {
        selector: true,
        easing: "ease-in-out",
        playSpeed: 2
      });
    scene.playCSS();
  }

  login = value => {
    request("http://localhost:5000/api/wy/login/", "post", value).then(response => {
      if (response.data.code != 200) {
        alert("用户名或密码错误!");
      } else {
        this.setState({
          isLogin: true,
        })
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {
    const { isLogin } = this.state;
    return (
      <React.Fragment>
        <div className="glitters">
          <div className="glitter g1"></div>
          <div className="glitter g2"></div>
          <div className="glitter g3"></div>
          <div className="glitter g4"></div>
          <div className="glitter g5"></div>
          <div className="glitter g6"></div>
          <div className="glitter g7"></div>
          <div className="glitter g8"></div>
        </div>
        {
          !isLogin ? (
            <LoginBox onLogin={(value) => this.login(value)} />
          ) : (
              <ToDoList/>
            )
        }
        <div className="wrapper">
          <div className="container">
            <div className="planet">
              <div className="spaceship">
                <div className="body">
                  <div className="partial left"></div>
                  <div className="partial right"></div>
                  <div className="wing left"></div>
                  <div className="wing right"></div>
                  <div className="wing center"></div>
                </div>
              </div>
              <div className="crews"></div>
              <div className="door back">
                <div className="entrance"></div>
              </div>
              <div className="bridge"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
