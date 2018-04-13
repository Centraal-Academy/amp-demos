/* global XMLHttpRequest */
import React from 'react'

class Amp extends React.Component {
  constructor (props) {
    super(props)
    this.shadowRoot = null
    this.shadowAmp = null
    this.refRoot = React.createRef()
    this.ampIsLoaded = new Promise(resolve => {
      (window.AMP = window.AMP || []).push(resolve)
    })
  }

  attachAMPDocument (url) {
    this.fetchDocument(url)
      .then((document) => {
        this.addAMPDocumentToRef(document)
      })
  }

  componentDidMount () {
    this.attachAMPDocument(this.props.url)
  }

  componentWillReceiveProps (nextProps) {
    this.attachAMPDocument(this.props.url)
  }

  componentWillUnmount () {
    this.shadowAmp.close()
  }

  fetchDocument (url) {
    var xhr = new XMLHttpRequest()

    return new Promise(function (resolve, reject) {
      xhr.open('GET', url, true)
      xhr.responseType = 'document'
      xhr.setRequestHeader('Accept', 'text/html')
      xhr.onload = function () {
        resolve(xhr.responseXML)
      }
      xhr.send()
    })
  }

  render () {
    return (
      (<div ref={this.refRoot} />)
    )
  }

  addAMPDocumentToRef (document) {
    this.ampIsLoaded.then(amp => {
      const previousElement = this.shadowRoot
      this.shadowRoot = window.document.createElement('div')
      const refElement = this.refRoot.current
      if (previousElement) {
        refElement.replaceChild(this.shadowRoot, previousElement)
      } else {
        refElement.appendChild(this.shadowRoot)
      }
      this.shadowAmp = amp.attachShadowDoc(this.shadowRoot, document, this.props.url)
    }).catch(console.error)
  }
}

export default Amp
