import { Component } from 'react';

export default class Navbar extends Component {

    render(){
  
      return(
  
        <nav>
            <div class="nav-wrapper">

                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul>
            </div>
        </nav>
  
      );
  
    }
  
  }