import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
  map: {
    // position: 'absolute',
    // width: '60%',
    // height: '60%',
    // marginLeft: '700px',
    // marginBottom: '0px',
    // marginTop: '65px',
    // justifyContent: 'center',
    position: 'absolute',
    left: '970px',
    width: '30%',
    height: '90%',
    marginBottom: '30px',
    marginTop: '40px',
    borderRadius: '0px',
    color: 'black',
    webkitBoxShadow: "1px 3px 1px #9E9E9E",
    mozBoxShadow: "1px 3px 1px #9E9E9E",
    boxShadow: "1px 3px 1px #9E9E9E"
   }
};

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  };

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: this.props.trail.latitude,
              lng: this.props.trail.longitude
            }
          });
        });
      }
    } else {
      this.setState({
      currentLocation: {
        lat: this.props.trail.latitude,
        lng: this.props.trail.longitude
      }
      })
    }
    this.loadMap();
  };

 loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  };

  renderChildren() {
     const { children } = this.props;
     if (!children) return;
     return React.Children.map(children, c => {
       if (!c) return;
       return React.cloneElement(c, {
         map: this.map,
         google: this.props.google,
         mapCenter: this.state.currentLocation
       });
     });
  };

   render() {
     let latitude = this.props.trail.latitude
     let longitude = this.props.trail.longitude
     const style = Object.assign({}, mapStyles.map);
        return (
          <div>
            <div style={style} ref="map">
              Loading map...
            </div>
            {this.renderChildren()}
          </div>
        );
    }; 
};

export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 38.999983,
    lng: -105.549558
  },
  centerAroundCurrentLocation: false,
  visible: true
};
