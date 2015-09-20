positionList = React.createClass({
  render: ->
    element = (position,index) ->
      React.DOM.p null, position.title
    React.DOM.div( null, this.props.positions.map(element))
})

positions = React.createClass({
  getInitialState: ->
    {positions: ["123"]}
  componentWillMount: ->
    this.selectionChangedToken = PubSub.subscribe("selectionChanged",this.reportURL.bind(this))
    this.socket = io.connect "http://aarnekyppo.com:3000/molreader"
    this.socket.on "newItem" this.newPosition
  newPosition: (data) ->
    this.setState({
      positions: positions.unshift(data.item)
    })
  componentWillUnmount: ->
    PubSub.unsubscribe(this.selectionChangedToken)
  reportURL: (a,url) ->
    this.socket.emit('newChannel')
  render: ->
    React.DOM.div null,
      React.createElement(positionList,{positions: this.state.positions}),
})
React.render React.createElement(positions, null), document.getElementById "positions"
