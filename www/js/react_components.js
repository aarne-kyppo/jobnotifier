(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
  "use strict";
  var positionList = React.createClass({displayName: "positionList",
    render: function() {
      var element;
      element = function(position, index) {
        return(React.createElement("tr", null,
                React.createElement("td", null,
                  React.createElement("a", {className: "positionwidget", href: position.link},
                    React.createElement("span", null, position.title)
                  )
                )
              )
              );
      };
      return (
        React.createElement("table", {className: "table table-striped table-bordered"},
          React.createElement("caption", null,
            (() => {
              if(this.props.positions.length > 0)
              {
                return "Löytyi " + this.props.positions.length + " paikkaa";
              }
              return "";
            })()
          ),
          React.createElement("tbody", null, this.props.positions.map(element))
        )
      );
    }
  });

  var positions = React.createClass({displayName: "positions",
    getInitialState: function() {
      return {
        positions: []
      };
    },
    componentDidMount: function() {
      var componentscope = this;
      this.selectionChangedToken = PubSub.subscribe('selectionChanged', this.loadPositions.bind(this));
      this.socket = io.connect('http://aarnekyppo.com:3000/rss2stream');
      this.socket.on('newItem',function(data){
        var positionstmp = [data.item].concat(componentscope.state.positions);
        componentscope.setState({
          positions: positionstmp
        });
      });
    },
    componentWillUnmount: function() {
      PubSub.unsubscribe(this.selectionChangedToken);
    },
    loadPositions: function(a, url) {
      this.setState({
        positions: []
      });
      this.socket.emit('unsubscribe',{});
      this.socket.emit('subscribe',{url: url});
    },
    render: function() {
      return (
        React.createElement("div", null,
          React.createElement(positionList, {positions: this.state.positions})
        )
      );
    }
  });

  React.render(React.createElement(positions,null), document.getElementById("positions"));

})();


},{}]},{},[1])
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  "use strict";
  var selectorClass, selectors;

  selectors = React.createClass({displayName: "selectors",
    searchChanged: function(e) {
      e.preventDefault();
      PubSub.publish("selectionChanged", this.getURL());
    },
    //Getting corresponding string value of boolean variable for URL
    boolToString: function(value) {
      return value ? "true" : "false";
    },
    componentDidMount: function(){
    },
    //Function to give correct URL for given options.
    getURL: function() {
      var params, rental, rooturl, area, searchText;
      //Some default values needed for URL
      var with_rental = true;
      var only_rental = false;
      var oppisopimus = false;
      var lang = "fi";

      rooturl = "http://www.mol.fi/tyopaikat/tyopaikkatiedotus/haku/tyopaikat.rss?";
      rental = "---";
      if (only_rental) {
        rental = "true";
      } else if (!with_rental) {
        rental = "false";
      }
      var oppisopimus_param = this.boolToString(oppisopimus);
      area = $("#area").val();
      searchText = $("#searchText").val();
      params = [
        "hakusanakentta=sanahaku",
        "ilmoitettuPvm=1",
        "vuokrapaikka=" + rental,
        "alueet=" + area,
        "oppisopimus=" + oppisopimus_param,
        "lang=" + lang,
        "hakusana=" + searchText
      ];
      return "" + rooturl + (params.join("&"));
    },
    render: function() {
      return (
        React.createElement("div", null,
          React.createElement("div", {className: "form-horizontal"},
            React.createElement("div", {className: "form-group container-fluid"},
              React.createElement("div", {className: "col-xs-12"},
                React.createElement("input", {type: "text", id: "area", className: "form-control", placeholder: "Alue"})
              )
            ),
            React.createElement("div", {className: "form-group container-fluid"},
              React.createElement("div", {className: "col-xs-12"},
                React.createElement("input", {type: "text", id: "searchText", className: "form-control", placeholder: "Sanahaku"})
              )
            ),
            React.createElement("div", {className: "form-group container-fluid"},
              React.createElement("input", {type: "submit", id: "submit", value: "Hae", className: "btn col-xs-2 col-xs-offset-10", onClick: this.searchChanged})
            )
          )
        )
      );
    }
  });

  React.render(React.createElement(selectors,null), document.getElementById("selectors"));

}).call(this);


},{}]},{},[1])
