import './Avioes.css';

export default function Avioes() {
    return (
        <div className="center-trail">
            <div className="trail-left">
                <span className="plane plane-1">✈</span>
            </div>
            <div className='trail-left-bottom'>
                <span className="plane plane-3">✈</span>
            </div>

            <div className="trail-right">
                <span className="plane plane-2">✈</span>
            </div>
            <div className='trail-right-top'>
                <span className="plane plane-4">✈</span>
            </div>
        </div>
    );
}
