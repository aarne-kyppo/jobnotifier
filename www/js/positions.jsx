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
          React.createElement("positionList", {positions: this.state.positions})
        )
      );
    }
  });

  React.render(React.createElement(positions,null), document.getElementById("positions"));

})();
