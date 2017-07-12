import React from 'react'
import ReactDOM from 'react-dom'

class Nested extends React.Component {
 
   constructor(props) {

     super(props)
     this.counter = 0
   }

   componentDidUpdate() {
     this.counter++
   
   }

   render () {
     return (
       <div>
         <p>Counter: {this.counter} </p>
      
       </div>
     )
   }
 }

 export default Nested