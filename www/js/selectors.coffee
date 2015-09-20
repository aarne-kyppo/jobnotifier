selectors =
  getInitialState: ->
    options =
      area: "",
      with_rental: true,
      only_rental: false,
      oppisopimus: false,
      lang: "fi",
      searchText: "",
  cityChanged: (e) ->
    this.setState {area: e.target.value}
    PubSub.publish("selectionChanged",this.getURL())
  boolToString: (value) ->
    boolstr = if value then "true" else "false"
  getURL: ->
    rooturl = "http://www.mol.fi/tyopaikat/tyopaikkatiedotus/haku/tyopaikat.rss?"
    #Preparing settings for url.
    rental = "---"
    if this.state.only_rental
      rental = "true"
    else if not this.state.with_rental
      rental = "false"

    oppisopimus = this.boolToString this.state.oppisopimus
    params = [
      "hakusanakentta=sanahaku",
      "ilmoitettuPvm=1",
      "vuokrapaikka=#{rental}",
      "alueet=#{this.state.area}",
      "oppisopimus=#{oppisopimus}",
      "lang=#{this.state.lang}",
      "hakusana=#{this.state.searchText}",
    ]
    "#{rooturl}#{params.join('&')}"
    #this.url = "?vuokrapaikka=---&hakusanakentta=sanahaku&alueet=" + this.state.city + "&oppisopimus=false&lang=fi&ilmoitettuPvm=1&hakusana="
  render: ->
    React.DOM.div null,
      React.DOM.label({"for": "area"}, "Alue"),
      React.DOM.input({type: 'text', name: "area", onChange: this.cityChanged}, null),

      React.DOM.p(null, this.getURL())

selectorClass = React.createClass selectors

React.render React.createElement(selectorClass, null), document.getElementById "selectors"
