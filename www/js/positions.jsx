(function(){
  "use strict";
  var positionList = React.createClass({
    render: function() {
      var element;
      element = function(position, index) {
        return <p>{position.title}</p>;
      };
      return <div>{this.props.positions.map(element)}</div>;
    }
  });

  var positions = React.createClass({
    getInitialState: function() {
      return {
        positions: []
      };
    },
    componentDidMount: function() {
      var componentscope = this;
      this.selectionChangedToken = PubSub.subscribe("selectionChanged", this.loadPositions.bind(this));
      this.socket = io.connect('http://aarnekyppo.com:3000/rss2stream');
      this.socket.on('newItem',function(data){
        var positionstmp = [data.item].concat(componentscope.state.positions);
        console.log("sdgsdg");
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
      console.log("aaa");
    },
    render: function() {
      return (
        <div>
          <positionList positions={this.state.positions}/>
        </div>
      );
    }
  });

  React.render(React.createElement(positions,null), document.getElementById("positions"));

})();
