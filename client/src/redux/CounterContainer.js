import { connect } from 'react-redux';
import Counter from './Counter';


const mapStateToProps = (state) => ({
    number1: state.counter.number1,
    number: state.counter.number
});


const CounterContainer = connect(mapStateToProps)(Counter);

export default CounterContainer;