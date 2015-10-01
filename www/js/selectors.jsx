(function() {
  "use strict";
  var selectorClass, selectors;

  selectors = React.createClass({
    searchChanged: function(e) {
      e.preventDefault();
      PubSub.publish("selectionChanged", this.getURL());
    },
    //Getting corresponding string value of boolean variable for URL
    boolToString: function(value) {
      return value ? "true" : "false";
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
        <div>
          <div className="form-horizontal">
            <div className="form-group container-fluid">
              <div className="col-xs-12">
                <input type="text" id="area" className="form-control" placeholder="Alue"/>
              </div>
            </div>
            <div className="form-group container-fluid">
              <div className="col-xs-12">
                <input type="text" id="searchText" className="form-control" placeholder="Sanahaku"/>
              </div>
            </div>
            <div className="form-group container-fluid">
              <input type="submit" id="submit" value="Hae" className="btn col-xs-2 col-xs-offset-10" onClick={this.searchChanged}/>
            </div>
          </div>
        </div>
      );
    }
  });

  React.render(React.createElement(selectors,null), document.getElementById("selectors"));

}).call(this);
