(function() {
  "use strict";
  var selectorClass, selectors;

  selectors = React.createClass({
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
    searchChanged: function(e) {
      e.preventDefault();
      alert($("#area").val());
      this.setState({
        area: $("#area").val()
      });
      PubSub.publish("selectionChanged", this.getURL());
    },
    boolToString: function(value) {
      return value ? "true" : "false";
    },
    getURL: function() {
      var oppisopimus, params, rental, rooturl, area;
      rooturl = "http://www.mol.fi/tyopaikat/tyopaikkatiedotus/haku/tyopaikat.rss?";
      rental = "---";
      if (this.state.only_rental) {
        rental = "true";
      } else if (!this.state.with_rental) {
        rental = "false";
      }
      oppisopimus = this.boolToString(this.state.oppisopimus);
      area = $("#area").val();
      params = ["hakusanakentta=sanahaku", "ilmoitettuPvm=1", "vuokrapaikka=" + rental, "alueet=" + area, "oppisopimus=" + oppisopimus, "lang=" + this.state.lang, "hakusana=" + this.state.searchText];
      return "" + rooturl + (params.join('&'));
    },
    render: function() {
      return (
        <div>
          <label for="city">Alue</label>
          <input type="text" id="area"/>
          <input type="submit" value="Hae" onClick={this.searchChanged}/>
        </div>
      );
    }
  });

  React.render(React.createElement(selectors,null), document.getElementById("selectors"));

}).call(this);
