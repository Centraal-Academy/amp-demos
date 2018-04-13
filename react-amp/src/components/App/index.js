import React from 'react'
import Amp from '../Amp'

class App extends React.Component {
  render () {
    return (
      <section>
        <h1>Página hecha con React</h1>
        <h2>Pero carga una página con AMP ;)</h2>
        <Amp url='content/index.amp.html' />
      </section>
    )
  }
}

export default App
