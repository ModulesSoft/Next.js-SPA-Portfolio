import { Component } from "react";
import StarRatings from 'react-star-ratings';
// class Star extends Component {
//     changeRating( newRating, name ) {
//       this.setState({
//         rating: newRating
//       });
//     }
 
//     render() {
//       // rating = 2;
//       return (
//         <StarRatings
//           rating={this.state.rating}
//           starRatedColor="blue"
//           changeRating={this.changeRating}
//           numberOfStars={5}
//           name='rating'
//         />
//       );
//     }
// }
 
 
class Bar extends Component { 
  render() {
    return (
      <StarRatings
        rating={this.props.rating}
        starDimension="25px"
        starSpacing="5px"
        starRatedColor="rgba(20, 184, 166, var(--tw-text-opacity))"
      />
    );
  }
}
export default Bar;