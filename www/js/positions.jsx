(function(){
  "use strict";
  var positionList = React.createClass({
    render: function() {
      var element;
      element = function(position, index) {
        return(<tr>
                <td>
                  <a className="positionwidget" href={position.link}>
                    <span>{position.title}</span>
                  </a>
                </td>
              </tr>
              );
      };
      return (
        <table className="table table-striped table-bordered">
          <caption>
            {(() => {
              if(this.props.positions.length > 0)
              {
                return "Löytyi " + this.props.positions.length + " paikkaa";
              }
              return "";
            })()}
          </caption>
          <tbody>{this.props.positions.map(element)}</tbody>
        </table>
      );
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
        <div>
          <positionList positions={this.state.positions}/>
        </div>
      );
    }
  });

  React.render(React.createElement(positions,null), document.getElementById("positions"));

})();
