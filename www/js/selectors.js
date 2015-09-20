(function() {
  "use strict";
  var selectorClass, selectors;

  selectors = React.createClass({displayName: "selectors",
    getInitialState: function() {
      return {
        area: "",
        with_rental: true,
        only_rental: false,
        oppisopimus: false,
        lang: "fi",
        searchText: ""
      };
    },
    cityChanged: function(e) {
      this.setState({
        area: e.target.value
      });
      PubSub.publish("selectionChanged", this.getURL());
    },
    boolToString: function(value) {
      return value ? "true" : "false";
    },
    getURL: function() {
      var oppisopimus, params, rental, rooturl;
      rooturl = "http://www.mol.fi/tyopaikat/tyopaikkatiedotus/haku/tyopaikat.rss?";
      rental = "---";
      if (this.state.only_rental) {
        rental = "true";
      } else if (!this.state.with_rental) {
        rental = "false";
      }
      oppisopimus = this.boolToString(this.state.oppisopimus);
      params = ["hakusanakentta=sanahaku", "ilmoitettuPvm=1", "vuokrapaikka=" + rental, "alueet=" + this.state.area, "oppisopimus=" + oppisopimus, "lang=" + this.state.lang, "hakusana=" + this.state.searchText];
      return "" + rooturl + (params.join('&'));
    },
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement("label", {for: "city"}, "Alue"), 
          React.createElement("input", {type: "text", name: "city", onChange: this.cityChanged})
        )
      );
    }
  });

  React.render(React.createElement(selectors,null), document.getElementById("selectors"));

}).call(this);
