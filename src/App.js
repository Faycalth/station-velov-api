import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://download.data.grandlyon.com/ws/rdata/sit_sitra.sittourisme/all.json?maxfeatures=100&start=1")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result['values'])
          this.setState({
            isLoaded: true,
            items: result['values']
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Veuillez attendre la fin du chargement (ça ne sera pas long, promis!)…</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.commune}>
              {item.commune} : {item.nom} ({item.adresse})  
            </li>
          ))}
        </ul>
      );
    }
}}

export default App;
